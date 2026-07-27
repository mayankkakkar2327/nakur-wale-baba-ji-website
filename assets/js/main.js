/* ============================================================
   Nakur Wale Baba Ji — Site Scripts
   - Mobile nav toggle
   - "Today's Wisdom" daily auto-rotating quote
   - Gallery tabs (Baba Ji / Devi Ji / Events)
   ============================================================ */

// ---- Mobile nav ----
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Note: gallery tab switching is handled by the inline script on gallery.html
  // (it needs to toggle wrapper panels, not just the grid containers).

  // ---- Today's Wisdom rotation ----
  renderDailyWisdom();
});

/**
 * DAILY WISDOM ROTATION
 * ---------------------
 * The quote bank lives in /assets/data/quotes.json (for reference / easy editing)
 * AND is duplicated directly below as a JS array so the widget still works even
 * when the site is opened straight from a file (fetch() of local JSON is blocked
 * by the browser's CORS rules under file://, but works fine once the site is
 * hosted on a real server — feel free to switch to a fetch() call at that point
 * if you'd rather manage the list from the JSON file only).
 *
 * Rotation logic: pick the quote using the day-of-year, wrapping around the
 * list length. This changes automatically at midnight with zero manual effort.
 * Grow this list over time (aim for 60-90+ quotes) so it takes months to repeat.
 */
var DAILY_QUOTES = [
  { verse: "होइहि सोइ जो राम रचि राखा। को करि तर्क बढ़ावै साखा॥", explanation: "Whatever Ram has willed will surely come to pass — there is little use arguing and building endless branches of debate against it.", explanation_hi: "जो राम ने रचा है वही होकर रहेगा — इसके विरुद्ध तर्क-वितर्क बढ़ाने से कोई लाभ नहीं।", source: "Ramcharitmanas, Ayodhya Kand", source_hi: "रामचरितमानस, अयोध्या कांड" },
  { verse: "काम क्रोध मद लोभ सब नाथ नरक के पंथ।", explanation: "Lust, anger, pride and greed are all paths that lead to ruin — give them up and turn instead toward devotion.", explanation_hi: "काम, क्रोध, मद और लोभ — ये सभी विनाश के मार्ग हैं; इन्हें त्यागकर भक्ति की ओर मुड़ें।", source: "Ramcharitmanas, Uttar Kand", source_hi: "रामचरितमानस, उत्तर कांड" },
  { verse: "परहित सरिस धर्म नहिं भाई। पर पीड़ा सम नहिं अधमाई॥", explanation: "There is no virtue greater than working for others' good, and no wrongdoing worse than causing others pain.", explanation_hi: "दूसरों की भलाई से बड़ा कोई धर्म नहीं, और दूसरों को कष्ट देने से बड़ा कोई पाप नहीं।", source: "Ramcharitmanas, Uttar Kand", source_hi: "रामचरितमानस, उत्तर कांड" },
  { verse: "सिया राममय सब जग जानी। करउं प्रणाम जोरि जुग पानी॥", explanation: "Knowing this whole world to be filled with Sita-Ram (the Divine), I bow to it with folded hands.", explanation_hi: "इस समस्त जगत को सिया-राममय जानकर, मैं दोनों हाथ जोड़कर प्रणाम करता हूं।", source: "Ramcharitmanas, Bala Kand", source_hi: "रामचरितमानस, बाल कांड" },
  { verse: "मंगल भवन अमंगल हारी। द्रवउ सो दसरथ अजिर बिहारी॥", explanation: "O Ram, abode of all that is auspicious, remover of all misfortune — be gracious to us.", explanation_hi: "हे राम, आप समस्त मंगल के धाम और अमंगल को हरने वाले हैं — हम पर कृपा करें।", source: "Ramcharitmanas, Bala Kand", source_hi: "रामचरितमानस, बाल कांड" },
  { verse: "धीरज धर्म मित्र अरु नारी। आपद काल परखिअहिं चारी॥", explanation: "Patience, righteousness, a true friend, and one's spouse — these four are truly tested only in times of hardship.", explanation_hi: "धैर्य, धर्म, सच्चा मित्र और पत्नी — इन चारों की सच्ची परख विपत्ति के समय ही होती है।", source: "Ramcharitmanas, Kishkindha Kand", source_hi: "रामचरितमानस, किष्किंधा कांड" },
  { verse: "रघुकुल रीति सदा चलि आई। प्राण जाहिं बरु बचनु न जाई॥", explanation: "It has always been the tradition of Lord Ram's family — one may lose one's life, but never break one's word.", explanation_hi: "रघुकुल की यह रीति सदा से चली आई है — प्राण भले चले जाएं, वचन नहीं टूटना चाहिए।", source: "Ramcharitmanas, Ayodhya Kand", source_hi: "रामचरितमानस, अयोध्या कांड" },
  { verse: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।", explanation: "One's mother and one's motherland are greater even than heaven itself.", explanation_hi: "माता और मातृभूमि स्वर्ग से भी बढ़कर हैं।", source: "Valmiki Ramayana, Yuddha Kand (words of Shri Ram)", source_hi: "वाल्मीकि रामायण, युद्ध कांड (श्री राम के वचन)" }
];

function dayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start;
  return Math.floor(diff / 86400000);
}

function renderDailyWisdom() {
  var el = document.getElementById("daily-wisdom");
  if (!el) return;
  var lang = (typeof getSiteLang === "function") ? getSiteLang() : "en";
  var idx = dayOfYear(new Date()) % DAILY_QUOTES.length;
  var q = DAILY_QUOTES[idx];
  var explanation = lang === "hi" ? q.explanation_hi : q.explanation;
  var source = lang === "hi" ? q.source_hi : q.source;
  el.innerHTML =
    '<div class="wisdom-verse">' + q.verse + '</div>' +
    '<div class="wisdom-explain">' + explanation + '</div>' +
    '<div class="wisdom-source">— ' + source + '</div>';
}
