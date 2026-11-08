// GET /api/health — open it in the browser to see what is missing.
// Shows only yes/no values, never the secrets themselves.
module.exports = async (req, res) => {
  const out = {
    ok: true,
    env: {
      FIREBASE_SERVICE_ACCOUNT_KEY: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
      ADMIN_SESSION_SECRET: !!process.env.ADMIN_SESSION_SECRET,
    },
  };
  try {
    const admin = require("./_firebaseAdmin");
    await admin.firestore().collection("orders").limit(1).get();
    out.firestore = "connected";
  } catch (e) {
    out.ok = false;
    out.firestore = e.setup
      ? e.message
      : "Firestore error: " + String(e.message || e).slice(0, 200) +
        " (Check that a Firestore Database was created in your Firebase project.)";
  }
  if (!out.env.ADMIN_PASSWORD || !out.env.ADMIN_SESSION_SECRET) out.ok = false;
  return res.status(200).json(out);
};
