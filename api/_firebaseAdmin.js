// Shared Firebase Admin SDK init.
//
// Credentials come from ONE of these Netlify environment variables
// (Site configuration → Environment variables):
//   FIREBASE_SERVICE_ACCOUNT_BASE64  the key file, base64-encoded (easiest, no paste problems)
//   FIREBASE_SERVICE_ACCOUNT_KEY     the key file's JSON text
// Never commit the key file to the repo.

const admin = require("firebase-admin");

function setupError(message) {
  const e = new Error(message);
  e.setup = true; // safe to show to the site owner
  return e;
}

// If the value is base64 text (no "{" in it), decode it. Lets the key work
// whether it was pasted into ..._KEY or ..._BASE64.
function decodeIfBase64(raw) {
  const t = String(raw || "").trim();
  if (t && !t.includes("{") && /^[A-Za-z0-9+/=\s]+$/.test(t)) {
    try {
      const d = Buffer.from(t.replace(/\s+/g, ""), "base64").toString("utf8");
      if (d.includes("private_key")) return d;
    } catch (e) {}
  }
  return t;
}
// Accepts the key as valid JSON, or — if it was pasted in a way that broke
// the JSON (line breaks, wrapping quotes) — pulls the three needed fields out.
function parseServiceAccount(raw) {
  let text = String(raw).trim();
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1);
    if (text.includes('\\"')) text = text.replace(/\\"/g, '"');
  }
  try {
    const obj = JSON.parse(text);
    if (obj && obj.private_key) return obj;
  } catch (e) {
    /* fall through to field extraction */
  }
  const pick = (name) => {
    const m = text.match(new RegExp('"' + name + '"\\s*:\\s*"([\\s\\S]*?)"\\s*[,}]'));
    return m ? m[1] : null;
  };
  const project_id = pick("project_id");
  const client_email = pick("client_email");
  const private_key = pick("private_key");
  if (project_id && client_email && private_key) {
    return { project_id, client_email, private_key };
  }
  return null;
}

if (!admin.apps.length) {
  let raw = null;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    try {
      raw = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64.trim(), "base64").toString("utf8");
    } catch (e) {
      raw = null;
    }
  } else {
    raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || null;
  }
  if (raw) raw = decodeIfBase64(raw);
  if (!raw) {
    throw setupError(
      "Server setup incomplete: set FIREBASE_SERVICE_ACCOUNT_BASE64 (or FIREBASE_SERVICE_ACCOUNT_KEY) in the Netlify environment variables."
    );
  }
  const serviceAccount = parseServiceAccount(raw);
  if (!serviceAccount) {
    throw setupError(
      "Server setup problem: the Firebase key could not be read. It must be the full key file from Firebase (project_id, client_email, private_key)."
    );
  }
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

module.exports = admin;
