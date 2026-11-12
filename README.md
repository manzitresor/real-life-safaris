# Real Life Safaris: website redesign prototype

A three-page concept for a new reallifesafaris.com, built as a fast static site
(plain HTML, CSS and JavaScript, with no frameworks and no build step needed to view it).

## Pages

| Page | File | What it shows |
|---|---|---|
| Homepage | `index.html` | Hero, about, "find your trip" by interest, featured tours, interactive "Rwanda, west to east" elevation profile, services, why travel with us, reviews slot, trip-planning form |
| Tours & destinations | `tours.html` | All 6 current tours with category and duration filters (shareable via `?cat=` / `?dur=`), the 7 destinations, custom-trip call to action |
| Tour detail | `tour.html?id=…` | One template for every tour. Default is `2 Days in Akagera`. Facts bar, overview, highlights, itinerary timeline, gallery with lightbox, inclusions, price table, enquiry form with the tour preselected, related tours |

Tour ids: `akagera-2-days`, `musanze-day`, `kigali-weekend-hike`, `beekeeping`, `bird-watching`, `cycling`.

## Run it locally

Any of these works:

- Double-click `index.html` to open it in a browser.
- Or serve the folder: `python3 -m http.server 8000` and open http://localhost:8000
- Or: `npx serve .`

An internet connection is needed for the photos (loaded from the live
reallifesafaris.com) and the Google Fonts.

## Editing

- Tour, destination and contact content lives in `assets/js/data.js`.
- Styles and design tokens are in `assets/css/styles.css` (tokens at the top).
- Header and footer are shared. Edit page bodies in `src/pages/` and the shared
  parts in `tools/build.py`, then run `python3 tools/build.py` to regenerate the three HTML files.
- Click **Show prototype notes** in the footer to highlight every placeholder or
  unconfirmed detail on the page.

## Content sources

All tour details, prices, destinations, values and contact details come from the current
reallifesafaris.com (read 1 November 2026). No reviews, awards, statistics or prices were invented.
Itinerary timings that the current site does not give are labelled on the page as sample plans to confirm.

## Needed from Real Life Safaris

- Logo as a vector file (SVG/AI/EPS). The prototype uses a temporary wordmark.
- Original, high-resolution photos (the site currently serves compressed copies), including
  Nyungwe, Lake Muhazi, gorilla trekking, the Land Cruiser and the team.
- Prices for Beekeeping, Bird Watching and Cycling; confirmation of whether Akagera prices are per person.
- What is and isn't included for Akagera, Beekeeping, Birding and Cycling.
- Day-by-day itinerary for the 6-day cycling trip and confirmed timings for the others.
- Weekend hike meeting point and start time.
- Office hours.
- Verified guest reviews (or a Google / TripAdvisor profile to embed).

## Not connected yet

- **Enquiry form delivery.** The form validates and builds the enquiry, then offers
  "Send on WhatsApp" (opens WhatsApp with the message prefilled) and "Copy enquiry".
  It does not email anyone. Connect it to email, a CRM or a form service at build stage.
- Booking, payments, availability calendar and customer accounts are out of scope.
- No analytics, cookie banner or CMS.
- Gallery, Blog, FAQ pages from the current site are not part of this concept.
