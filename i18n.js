// -----------------------------------------------------------------
// Simple English/Amharic toggle — no build step, no framework.
//
// Elements with data-i18n="key" get their textContent swapped based
// on the selected language. Dynamic strings generated in script.js
// (form errors, success messages) use the t(key) helper below.
//
// NOTE: the Amharic strings here are a best-effort translation, not
// reviewed by a native speaker. Have someone fluent check the wording
// before this goes in front of real ticket buyers.
// -----------------------------------------------------------------

const translations = {
  en: {
    presented_by: "Presented by",
    fact_date_value: "Nov 14, 2026",
    fact_doors_label: "Doors open",
    organizer_label: "Organized by",
    partners_label: "Partners",
    tag_days_left: "{n} days left",
    tag_day_left: "1 day left",
    tag_hours_left: "{n} hours left",
    tag_starts_days: "Starts in {n} days",
    tag_starts_day: "Starts in 1 day",
    tag_starts_hours: "Starts in {n} hours",
    tag_gate: "At the gate only",
    tag_closed: "Closed",
    form_error_server: "Ordering is unavailable right now (error {code}). Please try again shortly or contact the organizer.",
    lineup_label: "The lineup",
    lineup_heading: "Performing live",
    teaser_heading: "Watch the teaser",
    fact_doors_value: "6:30 PM",
    tier_wave1: "First wave",
    tier_wave2: "Second wave",
    tier_gate: "At the gate",
    tier_vip: "VVIP — dinner included",
    hero_cta: "Buy Tickets",

    venue_label: "The venue",
    venue_heading: "An evening in the garden",
    venue_body:
      "ሽክ is a night to dress sharp and enjoy live music outdoors at Ghion Hotel Gardens, with Dawit Melese, Efrem Tamiru and Micheal Belayneh. Organized by Mera Events with Coca-Cola.",
    fact_location_label: "Location",
    fact_location_value: "Ghion Hotel Gardens",
    fact_date_label: "Date",
    fact_bottle_label: "Bottle service",
    fact_bottle_value: "Available at the Summerfields area",

    tickets_label: "Tickets",
    tickets_heading: "Choose your ticket",
    package_name: "Tickets",
    item_1: "Concert ticket",
    item_2: "Unlimited dining experience",
    item_3: "Open bar, all night long",
    stub_note:
      "Early bird and first wave are on sale now. The second wave opens at a higher price when the first wave ends. Tickets at the gate (5,000 ETB) are sold on the night, subject to availability. VVIP includes dinner.",
    restriction_1: "21+",
    restriction_2: "No outside food or drink",
    restriction_3: "No weapons",

    countdown_label: "Ticket sales end in",
    countdown_target: "Nov 14, 12:00 PM (Addis Ababa time)",
    days: "Days",
    hours: "Hrs",
    mins: "Min",
    secs: "Sec",
    buy_button_active: "Buy Tickets",
    buy_button_ended: "Sales closed",

    modal_reserve_label: "Buy tickets",
    modal_heading: "Buy your tickets",
    modal_intro:
      "Choose your tickets and pay with Telebirr. After you send the payment, upload the screenshot and your ticket is issued as soon as we confirm it.",
    field_fullname: "Full name",
    field_phone: "Phone",
    field_package: "Tickets",
    package_normal_name: "General · First wave",
    package_vip_name: "VVIP",
    field_tickets: "Tickets",
    ticket_picker_hint: "Mix and match — pick any number of each.",
    ticket_picker_hint_limit: "Maximum 6 tickets per order.",
    total_label: "Total",
    submit_button: "Buy tickets",
    submit_button_loading: "Please wait…",
    form_error_required: "Please fill in all fields.",
    form_error_no_tickets: "Choose at least one ticket.",
    form_error_network: "Could not reach the server — check your connection and try again.",
    order_disclaimer:
      "After you tap Buy tickets you will get the Telebirr payment details. Your ticket is issued once your payment is confirmed.",

    success_heading: "Order received",
    success_ref_label: "Your reference number:",
    success_body:
      "Your order is saved. Send the amount below with Telebirr, then upload a screenshot of the payment. Your ticket appears here once we confirm it.",
    screenshot_label: "Payment screenshot",
    screenshot_button: "Upload screenshot",
    screenshot_button_loading: "Uploading…",
    screenshot_error_none: "Choose a screenshot first.",
    screenshot_done: "Screenshot received — your order is awaiting review.",
    screenshot_error_read: "Could not read that file. Try another image.",

    waiting_heading: "Awaiting approval",
    waiting_body: "Keep this page open — your ticket will appear here the moment our team approves your payment.",
    waiting_timeout: "Still awaiting approval. You can close this page — check back with your reference number, or contact the organizers.",
    rejected_heading: "Payment not confirmed",
    rejected_body: "We couldn't confirm your payment. Please contact the organizers with your reference number below.",
    status_check_error: "Could not check your order status — check your connection.",

    tickets_ready_heading: "Your tickets are ready",
    ticket_eyebrow: "SHIK in the Garden",
    ticket_subheading: "Mera Events × Coca-Cola",
    ticket_name_label: "Name",
    ticket_phone_label: "Phone",
    ticket_id_label: "Ticket ID",
    ticket_package_label: "Package",
    ticket_qty_label: "Tickets",
    ticket_scan_label: "Scan for entry",
    ticket_save_hint: "📸 Screenshot each ticket or tap Download to save it to your phone.",
    ticket_download_button: "Download ticket",
    ticket_download_loading: "Preparing…",

    footer_title: "ሽክ — SHIK in the Garden",
    footer_location: "Mera Events × Coca-Cola",
  },

  am: {
    presented_by: "በአቅራቢነት",
    fact_date_value: "ህዳር 5, 2019 (Nov 14, 2026)",
    fact_doors_label: "በሮች የሚከፈቱበት",
    organizer_label: "አዘጋጅ",
    partners_label: "አጋሮች",
    tag_days_left: "{n} ቀን ይቀራል",
    tag_day_left: "1 ቀን ይቀራል",
    tag_hours_left: "{n} ሰዓት ይቀራል",
    tag_starts_days: "በ{n} ቀን ይጀምራል",
    tag_starts_day: "በ1 ቀን ይጀምራል",
    tag_starts_hours: "በ{n} ሰዓት ይጀምራል",
    tag_gate: "በበር ላይ ብቻ",
    tag_closed: "ተዘግቷል",
    form_error_server: "አሁን ማዘዝ አልተቻለም (ስህተት {code})። እባክዎ ትንሽ ቆይተው ይሞክሩ ወይም አዘጋጆቹን ያነጋግሩ።",
    lineup_label: "አርቲስቶች",
    lineup_heading: "በቀጥታ ይጫወታሉ",
    teaser_heading: "ቲዘሩን ይመልከቱ",
    fact_dress_value: "ሽክ — ሽክ ብለው ይምጡ",
    tier_wave1: "የመጀመሪያ ዙር",
    tier_wave2: "ሁለተኛ ዙር",
    tier_gate: "በበር ላይ",
    tier_vip: "ቪቪአይፒ — እራት ተካቷል",
    hero_cta: "ትኬት ይግዙ",

    venue_label: "አዳራሽ",
    venue_heading: "በአትክልት ስፍራ የሚደረግ ምሽት",
    venue_body:
      "ሽክ ብለው ለብሰው በግዮን ሆቴል መናፈሻ በክፍት አየር ከዳዊት መለሰ፣ ከኤፍሬም ታምሩ እና ከሚካኤል በላይነህ ጋር በቀጥታ ሙዚቃ የሚደሰቱበት ምሽት ነው። በሜራ ኢቨንትስ አዘጋጅነት ከኮካ-ኮላ ጋር።",
    fact_location_label: "ቦታ",
    fact_location_value: "ግዮን ሆቴል መናፈሻ",
    fact_date_label: "ቀን",
    fact_bottle_label: "የጠርሙስ አገልግሎት",
    fact_bottle_value: "በሳመርፊልድስ አካባቢ ይገኛል",

    tickets_label: "ትኬት",
    tickets_heading: "ትኬትዎን ይምረጡ",
    package_name: "ትኬቶች",
    item_1: "የኮንሰርት ትኬት",
    item_2: "ያልተገደበ የምግብ አገልግሎት",
    item_3: "ሙሉ ሌሊት ክፍት ባር",
    stub_note:
      "ቀደምት ዋጋና የመጀመሪያ ዙር አሁን ሽያጭ ላይ ናቸው። የመጀመሪያው ዙር ሲያበቃ ሁለተኛው ዙር በከፍተኛ ዋጋ ይከፈታል። በበር ላይ ትኬት (5,000 ብር) በዝግጅቱ ቀን ይሸጣል (እንደ ተገኘ)። ቪቪአይፒ እራትን ያካትታል።",
    restriction_1: "21+",
    restriction_2: "ከውጭ የመጣ ምግብ ወይም መጠጥ አይፈቀድም",
    restriction_3: "የጦር መሳሪያ አይፈቀድም",

    countdown_label: "የትኬት ሽያጭ የሚያበቃው በ",
    countdown_target: "ህዳር 5፣ ቀን 6:00 (የአዲስ አበባ ሰዓት)",
    days: "ቀናት",
    hours: "ሰዓት",
    mins: "ደቂቃ",
    secs: "ሰከንድ",
    buy_button_active: "ትኬት ይግዙ",
    buy_button_ended: "ሽያጭ ተዘግቷል",

    modal_reserve_label: "ይግዙ",
    modal_heading: "ትኬትዎን ይግዙ",
    modal_intro:
      "ትኬትዎን ይምረጡና በቴሌብር ይክፈሉ። ክፍያውን ከላኩ በኋላ ስክሪንሾቱን ይጫኑ፤ ክፍያው እንደተረጋገጠ ትኬትዎ ይወጣል።",
    field_fullname: "ሙሉ ስም",
    field_phone: "ስልክ",
    field_package: "ትኬቶች",
    package_normal_name: "መደበኛ · የመጀመሪያ ዙር",
    package_vip_name: "ቪ.ቪ.አይ.ፒ",
    field_tickets: "ትኬት ብዛት",
    ticket_picker_hint: "እንደፈለጉት ይምረጡ — ከሁለቱም ዓይነት ትኬት መግዛት ይችላሉ።",
    ticket_picker_hint_limit: "በአንድ ትዕዛዝ ቢበዛ 6 ትኬቶች ብቻ።",
    total_label: "ጠቅላላ",
    submit_button: "ትኬት ይግዙ",
    submit_button_loading: "እባክዎ ይጠብቁ…",
    form_error_required: "እባክዎ ሁሉንም መስኮች ይሙሉ።",
    form_error_no_tickets: "እባክዎ ቢያንስ አንድ ትኬት ይምረጡ።",
    form_error_network: "አገልጋዩን ማግኘት አልተቻለም — ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",
    order_disclaimer:
      "ትኬት ይግዙ የሚለውን ሲጫኑ የቴሌብር ክፍያ ዝርዝር ያገኛሉ። ክፍያዎ እንደተረጋገጠ ትኬትዎ ይወጣል።",

    success_heading: "ትዕዛዝ ደርሶናል",
    success_ref_label: "የማጣቀሻ ቁጥርዎ:",
    success_body:
      "ትዕዛዝዎ ተመዝግቧል። ከታች ያለውን መጠን በቴሌብር ይላኩ፤ ከዚያ የክፍያ ስክሪንሾት ይጫኑ። ሲረጋገጥ ትኬትዎ እዚህ ይታያል።",
    screenshot_label: "የክፍያ ስክሪንሾት",
    screenshot_button: "ስክሪንሾት ላክ",
    screenshot_button_loading: "በመላክ ላይ…",
    screenshot_error_none: "እባክዎ መጀመሪያ ስክሪንሾት ይምረጡ።",
    screenshot_done: "ስክሪንሾት ደርሶናል — ትዕዛዝዎ በግምገማ ላይ ነው።",
    screenshot_error_read: "ፋይሉን ማንበብ አልተቻለም። እባክዎ ሌላ ምስል ይሞክሩ።",

    waiting_heading: "ማረጋገጫ በመጠበቅ ላይ",
    waiting_body: "ይህን ገጽ ክፍት ያድርጉት — ትዕዛዝዎ ሲረጋገጥ ትኬትዎ እዚሁ ይታያል።",
    waiting_timeout: "አሁንም በመጠበቅ ላይ ነው። ይህን ገጽ ዘግተው በማጣቀሻ ቁጥርዎ ቆይተው ማየት ወይም አዘጋጆቹን ማነጋገር ይችላሉ።",
    rejected_heading: "ክፍያ አልተረጋገጠም",
    rejected_body: "ክፍያዎን ማረጋገጥ አልቻልንም። እባክዎ ከታች ባለው የማጣቀሻ ቁጥርዎ አዘጋጆቹን ያነጋግሩ።",
    status_check_error: "የትዕዛዝዎን ሁኔታ ማየት አልተቻለም — ግንኙነትዎን ያረጋግጡ።",

    tickets_ready_heading: "ትኬቶችዎ ዝግጁ ናቸው",
    ticket_eyebrow: "ሽክ በአትክልት ስፍራ",
    ticket_subheading: "ሜራ ኢቨንትስ × ኮካ-ኮላ",
    ticket_name_label: "ስም",
    ticket_phone_label: "ስልክ",
    ticket_id_label: "የትኬት ቁጥር",
    ticket_package_label: "ጥቅል",
    ticket_qty_label: "ትኬቶች",
    ticket_scan_label: "ለመግቢያ ይቃኙ",
    ticket_save_hint: "📸 እያንዳንዱን ትኬት ስክሪንሾት ያድርጉ ወይም Download ተጭነው ወደ ስልክዎ ያስቀምጡት።",
    ticket_download_button: "ትኬት አውርድ",
    ticket_download_loading: "በማዘጋጀት ላይ…",

    footer_title: "ሽክ — SHIK in the Garden",
    footer_location: "ሜራ ኢቨንትስ × ኮካ-ኮላ",
  },
};

const LANG_KEY = "eve_lang";

function getLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

function applyTranslations() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.body.classList.toggle("lang-am", lang === "am");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = t(key);
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.setAttribute("placeholder", text);
    } else {
      el.textContent = text;
    }
  });

  document.getElementById("lang-en")?.classList.toggle("lang-btn--active", lang === "en");
  document.getElementById("lang-am")?.classList.toggle("lang-btn--active", lang === "am");
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyTranslations();
}

function initLangToggle() {
  document.getElementById("lang-en")?.addEventListener("click", () => setLang("en"));
  document.getElementById("lang-am")?.addEventListener("click", () => setLang("am"));
  applyTranslations();
}

document.addEventListener("DOMContentLoaded", initLangToggle);
