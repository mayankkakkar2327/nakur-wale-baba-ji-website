/* ============================================================
   Gallery source data.
   NOTE: these currently point at the images already hosted on
   the live site (nakurwalebabaji.com) since that's where the
   real photos live today. Before final launch, download the
   /images and /background effect folders from the current
   hosting and switch these to local relative paths (e.g.
   "images/Nakud wale baba ji/photo1.jpg") so the new site does
   not depend on the old one staying online. See README.md.
   ============================================================ */

var ASSET_BASE = "https://nakurwalebabaji.com";

var GALLERY = {
  baba: [
    "photo1.jpg","photo2.jpg","photo3.jpg","photo4.jpg","photo7.jpg","photo13.jpg","photo14.jpg","photo16.jpg",
    "photo18.png","photo19.png","photo20.png","photo21.png","photo22.jpg","photo23.jpg","photo24.jpg","photo25.jpg",
    "photo33.jpg","photo44.jpg","photo48.jpg","photo51.jpg","photo57.jpg","photo58.jpg","photo66.jpg"
  ].map(function(f){
    return { src: ASSET_BASE + "/images/Nakud%20wale%20baba%20ji/" + f, caption: "Nakur Wale Baba Ji — sacred moment at the ashram" };
  }),

  devi: [
    ["devi-ji.png", "Sant Devi Sudiksha Saraswati Ji"],
    ["devi-ji2.png", "Sant Devi Sudiksha Saraswati Ji"],
    ["photo6.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo8.png", "Devi Ji — sacred moment at the ashram"],
    ["photo12.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo17.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo26.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo28.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo31.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo32.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo34.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo35.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo36.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo38.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo42.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo45.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo50.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo56.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo59.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo61.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo62.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo64.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo65.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo67.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo68.jpg", "Devi Ji — sacred moment at the ashram"],
    ["photo29.jpg.jpeg", "Sushri Saumya Saraswati Ji"],
    ["photo30.jpg.jpeg", "Sushri Samiksha Saraswati Ji"]
  ].map(function(pair){
    return { src: ASSET_BASE + "/images/Devi%20ji/" + pair[0], caption: pair[1] };
  }),

  events: [
    "photo5.jpg","photo9.jpg","photo10.jpg","photo11.jpg","photo15.jpg","photo27.jpg","photo37.jpg","photo39.jpg",
    "photo40.jpg","photo41.jpg","photo43.jpg","photo46.jpg","photo47.jpg","photo49.jpg","photo52.jpg","photo53.jpg",
    "photo54.jpg","photo55.jpg","photo60.jpg","photo63.jpg","photo69.jpg"
  ].map(function(f){
    return { src: ASSET_BASE + "/images/Different%20events/" + f, caption: "A moment from ashram events and celebrations" };
  })
};

/**
 * Renders a set of gallery panels (id="gallery-baba", "gallery-devi", "gallery-events")
 * Call this on pages that include those containers (gallery.html).
 */
function renderFullGallery() {
  renderGalleryPanel("gallery-baba", GALLERY.baba);
  renderGalleryPanel("gallery-devi", GALLERY.devi);
  renderGalleryPanel("gallery-events", GALLERY.events);
}

function renderGalleryPanel(containerId, items) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(function (item) {
    return '<img src="' + item.src + '" alt="' + item.caption + '" loading="lazy" onclick="openLightbox(this.src, this.alt)">';
  }).join("");
}

/**
 * Renders a small preview grid (homepage) mixing photos from each category,
 * up to `total` images altogether.
 */
function renderGalleryPreview(containerId, total) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var cats = [GALLERY.baba, GALLERY.devi, GALLERY.events];
  var mix = [];
  var round = 0;
  while (mix.length < total && round < 50) {
    for (var i = 0; i < cats.length && mix.length < total; i++) {
      if (cats[i][round]) mix.push(cats[i][round]);
    }
    round++;
  }
  el.innerHTML = mix.map(function (item) {
    return '<img src="' + item.src + '" alt="' + item.caption + '" loading="lazy">';
  }).join("");
}

/**
 * Lightbox popup — used on the Gallery page so photos open full-size on click.
 */
function openLightbox(src, alt) {
  var lb = document.getElementById("lightbox");
  var img = document.getElementById("lightbox-img");
  if (!lb || !img) return;
  img.src = src;
  img.alt = alt || "";
  lb.classList.add("open");
}
function closeLightbox() {
  var lb = document.getElementById("lightbox");
  if (lb) lb.classList.remove("open");
}
document.addEventListener("DOMContentLoaded", function () {
  var lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
});
