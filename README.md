# Nakur Wale Baba Ji — Website

A complete 7-page static website (no build tools required): `index.html`, `about.html`, `events.html`, `gallery.html`, `contact.html`, `ashrams.html`, `seva.html`.

## How to view it

Just double-click `index.html` — it opens directly in your browser. All the navigation between pages works locally, no server needed.

## Important: image/video sources

Photos and videos of Nakur Wale Baba Ji, Devi Ji, and past events are pulled directly from the **current live site** (`https://nakurwalebabaji.com/...`), since that's where the real files already live and this sandbox couldn't download them into this package. This means:

- **Right now:** every image/video will load correctly as long as you have an internet connection and the old site stays online — nothing looks broken.
- **Before final launch:** download the `/images`, `/videos`, and `/background effect` folders from the current hosting and place them in this project's `assets/img/` folder, then update the `src="https://nakurwalebabaji.com/..."` paths in the HTML and in `assets/js/gallery-data.js` to local relative paths instead. This makes the new site load faster and stop depending on the old site staying online.

New images I generated for you (no external dependency, already local):
- `assets/img/ashram-haridwar.jpg`, `ashram-vrindavan.jpg`, `ashram-ayodhya.jpg` — placeholder graphics, swap for real photos when ready.
- `assets/img/donation-qr.jpg` — cropped from the QR code image you shared.

## What's built

- **Homepage** — all 9 sections you asked for: Hero, Today's Wisdom (auto-rotating), Who is Nakur Wale Baba Ji, Top 5 Teachings, Latest Events, Videos, Gallery preview, Contact, Ashrams.
- **About** — tabs for "About Nakur Wale Baba Ji" (full life timeline) and "About Devi Ji".
- **Latest Events** — daily aarti/satsang schedule pinned at top (7am & 7pm, Pant Vihar), plus event cards; built to be easy to extend as new event dates are confirmed.
- **Gallery** — tabs for Nakur Wale Baba Ji / Devi Ji / Events, pulling all the photos already organised in those categories on the live site.
- **Contact Us** — form, address, email, embedded map, directions link.
- **Ashrams (Centres)** — Pant Vihar (primary, full detail) + Haridwar + Vrindavan (under construction) + Ayodhya (under construction, placeholder photos).
- **Seva** — all 6 seva categories with impact stats, plus a "Donate Directly" block with your UPI ID and QR code.

## Still open

- **Haridwar ashram**: only listed by name so far — add its full address and a short description when ready.
- **Vrindavan / Ayodhya ashrams**: using placeholder graphics — swap in real construction photos when available.
- **Contact form backend**: currently submits via a `mailto:` link (opens the visitor's email app). For a smoother experience, connect it to a form service (Formspree, Web3Forms) or a simple backend endpoint.
- **80G note**: the Seva page currently states donations aren't tax-deductible yet since 80G isn't registered — update this copy once that changes.
- **Daily Wisdom quote bank**: started with 8 verses (see `assets/js/gallery-data.js`... actually `assets/data/quotes.json` and the `DAILY_QUOTES` array in `assets/js/main.js`) — have these verified against a printed Ramcharitmanas edition, and grow the list over time.
- **Hindi version**: this build is English-only. The current live site already has a full Hindi translation via its HI/EN toggle — that content can be reused to add the same toggle here.

## File structure

```
site/
├── index.html
├── about.html
├── events.html
├── gallery.html
├── contact.html
├── ashrams.html
├── seva.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js            (daily wisdom rotation, mobile nav)
    ├── js/gallery-data.js    (gallery photo lists + render logic)
    ├── data/quotes.json      (Ramayana quote bank, human-readable copy)
    └── img/                  (locally-hosted images: placeholders + QR code)
```
