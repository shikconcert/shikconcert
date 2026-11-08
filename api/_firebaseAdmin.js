// Shared Firebase Admin SDK init. Needs FIREBASE_SERVICE_ACCOUNT_KEY set
// in Netlify (Site configuration → Environment variables): the whole
// service-account JSON from Firebase Console → Project Settings →
// Service Accounts → Generate new private key, pasted on ONE line.
// Never commit that file to the repo.

const admin = require("firebase-admin");

function setupError(message) {
  const e = new Error(message);
  e.setup = true; // safe to show to the site owner
  return e;
}

if (!admin.apps.length) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw setupError(
      "Server setup incomplete: FIREBASE_SERVICE_ACCOUNT_KEY is not set in the Netlify environment variables."
    );
  }
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(raw.trim());
  } catch (e) {
    throw setupError(
      "Server setup problem: FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON. Paste the whole key file contents."
    );
  }
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

module.exports = admin;
