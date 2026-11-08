// GET /api/health — open it in the browser to see what is missing.
// Shows only yes/no values, never the secrets themselves.
module.exports = async (req, res) => {
  const out = {
    ok: true,
    env: {
      FIREBASE_SERVICE_ACCOUNT_KEY: !!(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
      ADMIN_SESSION_SECRET: !!process.env.ADMIN_SESSION_SECRET,
    },
  };
  // Safe diagnostics about the Firebase key: yes/no facts only, no secrets.
  try {
    const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    const rawEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const source = b64 ? "BASE64" : rawEnv ? "KEY" : "none";
    let text = "";
    if (b64) text = Buffer.from(b64.trim(), "base64").toString("utf8");
    else if (rawEnv) text = rawEnv;
    out.keyCheck = {
      using: source,
      savedLength: (b64 || rawEnv || "").length,
      decodedLength: text.length,
      startsWithBrace: text.trim().startsWith("{"),
      hasProjectId: /"project_id"\s*:/.test(text),
      hasClientEmail: /"client_email"\s*:/.test(text),
      hasPrivateKey: /"private_key"\s*:/.test(text),
      privateKeyComplete: /END PRIVATE KEY/.test(text),
      isServiceAccount: /"type"\s*:\s*"service_account"/.test(text),
    };
  } catch (e) {
    out.keyCheck = { error: "could not inspect key" };
  }
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
