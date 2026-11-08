// ONE place that defines every ticket type, its price and when it is on
// sale. The website (script.js) and the server (api/*.js) both read this
// file, so prices and dates can never disagree.
//
// To change a price or a date, edit it here and redeploy. Dates use
// Addis Ababa time (+03:00).
(function (root) {
  var FIRST_WAVE_END = "2026-11-11T00:00:00+03:00"; // first wave / early bird close, second wave opens
  var SALE_END = "2026-11-14T12:00:00+03:00"; // all online sales close

  var cfg = {
    saleEnd: SALE_END,
    // Telebirr account buyers pay to (shown after they tap Buy tickets).
    // To change the number, edit it here and nowhere else.
    telebirr: { name: "ADDIS ZEMEN", number: "0987654321" },
    // key  = stored in the database (do not rename existing ones)
    // prefix = letter used in each ticket's QR code ID
    // online:false = shown on the page but sold only at the gate
    // capacity = maximum number that can ever be sold (VVIP seats)
    types: [
      { key: "early", prefix: "E", price: 2500, until: FIRST_WAVE_END, en: "Early bird", am: "ቀደምት ዋጋ" },
      { key: "normal", prefix: "N", price: 3000, until: FIRST_WAVE_END, en: "First wave", am: "የመጀመሪያ ዙር" },
      { key: "wave2", prefix: "W", price: 4000, from: FIRST_WAVE_END, en: "Second wave", am: "ሁለተኛ ዙር" },
      { key: "gate", prefix: "G", price: 5000, online: false, en: "At the gate", am: "በበር ላይ" },
      { key: "vip", prefix: "V", price: 10000, capacity: 50, en: "VVIP · dinner included", am: "ቪቪአይፒ · እራት ተካቷል" }
    ],
    // true if this ticket type can be bought online at time `now`
    isOpen: function (type, now) {
      now = now || new Date();
      if (type.online === false) return false;
      if (now >= new Date(cfg.saleEnd)) return false;
      if (type.from && now < new Date(type.from)) return false;
      if (type.until && now >= new Date(type.until)) return false;
      return true;
    },
    // [{ id: "SHIK-XXXX-E1", key: "early", prefix: "E" }, ...]
    seatIds: function (reference, tickets) {
      var out = [];
      cfg.types.forEach(function (tp) {
        var n = Number(tickets && tickets[tp.key]) || 0;
        for (var i = 1; i <= n; i++) out.push({ id: reference + "-" + tp.prefix + i, key: tp.key, prefix: tp.prefix });
      });
      return out;
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = cfg;
  else root.TICKET_CONFIG = cfg;
})(typeof window !== "undefined" ? window : globalThis);
