// POST /api/checkout  { fullName, phone, tickets: { early, normal, wave2, gate, vip } }
//
// Prices, sale windows and VVIP capacity all come from ticket-config.js
// and are decided here on the server — never trusted from the browser.
// An order can mix ticket types. Each ticket gets its own QR ID later.

const admin = require("./_firebaseAdmin");
const CFG = require("../ticket-config");

const db = admin.firestore();

function generateReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SHIK-${stamp}-${rand}`;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, phone, tickets } = req.body || {};
  if (!fullName || !phone) {
    return res.status(400).json({ error: "Missing or invalid order details." });
  }

  const now = new Date();
  const qtys = {};
  let totalQty = 0;
  let totalEtb = 0;

  for (const type of CFG.types) {
    const q = Number(tickets && tickets[type.key]) || 0;
    if (!Number.isInteger(q) || q < 0) {
      return res.status(400).json({ error: "Missing or invalid order details." });
    }
    if (q > 0 && !CFG.isOpen(type, now)) {
      return res.status(400).json({
        error: `${type.en} tickets are not on sale right now. Please choose another ticket type.`,
        unavailable: type.key,
      });
    }
    qtys[type.key] = q;
    totalQty += q;
    totalEtb += q * type.price;
  }

  if (totalQty < 1 || totalQty > 500) {
    return res.status(400).json({ error: "Choose at least 1 ticket." });
  }

  const reference = generateReference();
  const orderData = {
    reference,
    fullName: String(fullName).slice(0, 120),
    phone: String(phone).slice(0, 30),
    tickets: qtys,
    totalEtb,
    status: "pending_payment",
    screenshotUrl: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const vipType = CFG.types.find((t) => t.key === "vip");
  const vipQty = qtys.vip || 0;

  try {
    if (vipQty > 0 && vipType && vipType.capacity) {
      // Transaction so two people checking out together can't both take
      // the last VVIP seats. Rejected orders free their seats.
      await db.runTransaction(async (tx) => {
        const existing = await tx.get(
          db.collection("orders").where("tickets.vip", ">", 0)
        );
        let vipSold = 0;
        existing.forEach((doc) => {
          if (doc.data().status !== "rejected") {
            vipSold += doc.data().tickets?.vip || 0;
          }
        });
        const vipLeft = vipType.capacity - vipSold;
        if (vipQty > vipLeft) {
          const err = new Error("VIP_SOLD_OUT");
          err.vipLeft = Math.max(0, vipLeft);
          throw err;
        }
        tx.set(db.collection("orders").doc(reference), orderData);
      });
    } else {
      await db.collection("orders").doc(reference).set(orderData);
    }

    return res.status(200).json({ reference, totalEtb });
  } catch (err) {
    if (err.message === "VIP_SOLD_OUT") {
      return res.status(409).json({
        error:
          err.vipLeft === 0
            ? "VVIP tickets are sold out."
            : `Only ${err.vipLeft} VVIP seat(s) left. Please lower your quantity.`,
        vipLeft: err.vipLeft,
      });
    }
    console.error("checkout failed:", err);
    return res
      .status(500)
      .json({ error: "Could not save your order. Please try again." });
  }
};
