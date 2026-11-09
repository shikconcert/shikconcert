// Ethiopian mobile numbers. Accepts 09xxxxxxxx, 07xxxxxxxx, +2519xxxxxxxx,
// +2517xxxxxxxx, 2519..., 002519..., or 9xxxxxxxx (spaces/dashes ignored).
// Returns the standard local form "09xxxxxxxx" / "07xxxxxxxx", or null.
function normalizePhone(input) {
  let d = String(input || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  let local = null;
  if (d.length === 12 && d.startsWith("251")) local = d.slice(3);
  else if (d.length === 10 && d.startsWith("0")) local = d.slice(1);
  else if (d.length === 9) local = d;
  if (!local || !/^[79]\d{8}$/.test(local)) return null;
  return "0" + local;
}

// True when two numbers are the same phone, however each was typed.
function samePhone(a, b) {
  const x = String(a || "").replace(/\D/g, "").slice(-9);
  const y = String(b || "").replace(/\D/g, "").slice(-9);
  return x.length === 9 && x === y;
}

module.exports = { normalizePhone, samePhone };
