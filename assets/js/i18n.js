/* ============================================================
   Simple site-wide English <-> Hindi toggle.
   - Every translatable element carries data-en and data-hi attributes.
   - The #lang-toggle link (top right of the header) flips the language
     and its own label between "हिंदी में पढ़ें" and "En".
   - Preference is stored in localStorage so it holds across page
     navigation (this is a plain multi-page site, not a single-page app).
   ============================================================ */

function getSiteLang() {
  return localStorage.getItem("siteLang") || "en";
}

function applySiteLang(lang) {
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-en]").forEach(function (el) {
    var text = lang === "hi" ? (el.getAttribute("data-hi") || el.getAttribute("data-en")) : el.getAttribute("data-en");
    if (text !== null) el.textContent = text;
  });
  document.querySelectorAll("[data-en-placeholder]").forEach(function (el) {
    var text = lang === "hi" ? (el.getAttribute("data-hi-placeholder") || el.getAttribute("data-en-placeholder")) : el.getAttribute("data-en-placeholder");
    if (text !== null) el.setAttribute("placeholder", text);
  });
}

function setSiteLang(lang) {
  localStorage.setItem("siteLang", lang);
  applySiteLang(lang);
  // Re-render any JS-generated content that depends on language (e.g. the
  // Today's Wisdom card on the homepage), if that function is present on this page.
  if (typeof renderDailyWisdom === "function") renderDailyWisdom();
}

document.addEventListener("DOMContentLoaded", function () {
  applySiteLang(getSiteLang());
  var toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      setSiteLang(getSiteLang() === "hi" ? "en" : "hi");
    });
  }
});
