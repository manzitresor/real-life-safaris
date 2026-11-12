"""Builds the three static pages from shared partials (header, footer)."""
import pathlib, sys

OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path(__file__).resolve().parent.parent / "src" / "pages"

ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'
MARK = ('<svg class="brand-mark" viewBox="0 0 34 34" aria-hidden="true">'
        '<circle cx="24" cy="7" r="2.6" fill="#d6a632"/>'
        '<path d="M1.5 25 L10.5 13 L16.5 20 L23 9.5 L32.5 25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'
        '<path d="M1.5 31 L10.5 19 L16.5 26 L23 15.5 L32.5 31" fill="none" stroke="#a3202e" stroke-width="1.8" stroke-linejoin="round"/></svg>')


def head(title, desc, canonical):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#15201a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Real Life Safaris">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://www.reallifesafaris.com/assets/img/home/home2.jpeg">
<link rel="canonical" href="https://www.reallifesafaris.com/{canonical}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 34'%3E%3Crect width='34' height='34' fill='%2315201a'/%3E%3Cpath d='M3 24 L11 14 L17 20 L23 10 L31 24' fill='none' stroke='%23eceee8' stroke-width='2.2'/%3E%3Cpath d='M3 30 L11 20 L17 26 L23 16 L31 30' fill='none' stroke='%23a3202e' stroke-width='2.2'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.reallifesafaris.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/css/styles.css">
"""


def header(current, cta_href="index.html#plan", solid=False):
    def a(href, label, key):
        cur = ' aria-current="page"' if key == current else ""
        return f'<li><a href="{href}"{cur}>{label}</a></li>'
    items = [("index.html", "Home", "home"), ("tours.html#tours", "Tours", "tours"),
             ("tours.html#destinations", "Destinations", "dest"), ("index.html#about", "About", "about"),
             ("index.html#plan", "Contact", "contact")]
    desktop = "".join(a(h, l, k) for h, l, k in items)
    mobile = "".join(
        f'<li><a href="{h}"{" aria-current=\"page\"" if k == current else ""}>{l}<small>{s}</small></a></li>'
        for (h, l, k), s in zip(items, ["Start here", "6 trips", "7 places", "Who we are", "Kigali office"]))
    return f"""<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"{' data-solid' if solid else ''}>
  <div class="wrap header-inner">
    <a class="brand" href="index.html" aria-label="Real Life Safaris, home">{MARK}<span class="brand-word"><b>Real Life Safaris</b><small>Kigali · Rwanda</small></span></a>
    <nav class="nav-primary" aria-label="Main">
      <ul>{desktop}<li><a class="btn" href="{cta_href}">Plan your trip</a></li></ul>
    </nav>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <nav aria-label="Mobile"><ul>{mobile}</ul></nav>
  <div class="mm-contact">
    <a class="btn btn--light btn--block" href="{cta_href}">Plan your trip {ARROW}</a>
    <span style="margin-top:14px">Call or WhatsApp <strong>+250 789 248 756</strong></span>
    <span>reallifesafaris2022@gmail.com</span>
  </div>
</div>
"""


FOOTER = f"""<footer class="site-footer" aria-labelledby="footer-title">
  <div class="wrap">
    <h2 class="visually-hidden" id="footer-title">Real Life Safaris contact and links</h2>
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="index.html" aria-label="Real Life Safaris, home">{MARK}<span class="brand-word"><b>Real Life Safaris</b><small>Kigali · Rwanda</small></span></a>
        <p>Tailor-made journeys across Rwanda and East Africa, led by local guides, in small groups, with community and conservation at the heart of every trip.</p>
        <p class="footer-tag">Rwanda, your travel destination.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="tours.html#tours">All tours</a></li>
          <li><a href="tours.html#destinations">Destinations</a></li>
          <li><a href="tour.html?id=akagera-2-days">2 Days in Akagera</a></li>
          <li><a href="tour.html?id=kigali-weekend-hike">Weekend hikes in Kigali</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>11 KG 4 Ave, Kigali, Rwanda</li>
          <li><a href="tel:+250789248756">+250 789 248 756</a></li>
          <li><a href="https://wa.me/250789248756" target="_blank" rel="noopener">WhatsApp us</a></li>
          <li><a href="mailto:reallifesafaris2022@gmail.com" style="overflow-wrap:anywhere">reallifesafaris2022@gmail.com</a></li>
        </ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul>
          <li><a href="https://www.instagram.com/reallifesafaris/" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="https://www.facebook.com/people/Real-life-Safari/100084378417995/" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="https://x.com/reallifesafaris" target="_blank" rel="noopener">X</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> Real Life Safaris. <a href="https://www.reallifesafaris.com/legal/privacy.html" target="_blank" rel="noopener">Privacy</a> · <a href="https://www.reallifesafaris.com/legal/terms.html" target="_blank" rel="noopener">Terms</a></span>
      <span class="footer-note">Redesign concept · prototype · <button class="notes-toggle" type="button" aria-pressed="false">Show prototype notes</button></span>
    </div>
  </div>
</footer>
<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="btn btn--light lightbox-close" type="button">Close</button>
  <figure style="margin:0"><img alt=""><p></p></figure>
</div>
"""

SCRIPTS = '<script src="assets/js/data.js"></script>\n<script src="assets/js/main.js"></script>\n<script src="assets/js/enquiry.js"></script>\n'

PAGES = [
    ("index.html", "Real Life Safaris | Tailor-made Rwanda safaris, hikes and birding",
     "Kigali-based tour operator offering tailor-made Rwanda safaris, Akagera game drives, birding, weekend hikes, cycling and cultural experiences with local guides.",
     "", "home", "index.html#plan", False, ["home.js"]),
    ("tours.html", "Tours and destinations in Rwanda | Real Life Safaris",
     "Browse Real Life Safaris tours: Akagera safaris, birding, Musanze walks, weekend hikes in Kigali, beekeeping and cycling, plus Rwanda's best destinations.",
     "tours.php", "tours", "index.html#plan", False, ["tours.js"]),
    ("tour.html", "2 Days in Akagera National Park | Real Life Safaris",
     "Two days of game drives, a boat trip and a night drive in Akagera National Park, with an overnight at Salt of Akagera. From Kigali.",
     "tours.php", "tours", "#enquire", False, ["tour.js"]),
]

for fname, title, desc, canon, cur, cta, solid, extra in PAGES:
    body = (SRC / fname).read_text()
    html = (head(title, desc, canon) + "</head>\n<body>\n" + header(cur, cta, solid) + body + FOOTER + SCRIPTS
            + "".join(f'<script src="assets/js/{e}"></script>\n' for e in extra) + "</body>\n</html>\n")
    html = html.replace("{{ARROW}}", ARROW)
    (OUT / fname).write_text(html)
    print("wrote", fname, len(html))
