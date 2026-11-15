"""Builds the three static pages from shared partials (head, header, footer).

Edit page bodies in src/pages/ and the shared parts below, then run:
    python3 tools/build.py
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT
SRC = ROOT / "src" / "pages"

ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'
WA = ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-.5-.2z"/></svg>')
# Wordmark: a sun rising over two rolling hills. Temporary until the vector logo is supplied.
MARK = ('<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">'
        '<circle cx="20" cy="20" r="19" fill="currentColor" opacity=".08"/>'
        '<circle cx="25" cy="15" r="5" fill="var(--sun)"/>'
        '<path d="M4 29c5-6 10-8 16-4 4 2.5 9 2 16-4v9.5A16 16 0 0 1 20 36 16 16 0 0 1 4 29z" fill="var(--clay)"/>'
        '<path d="M2.6 25.5C9 18 15 16.5 22 21c3 1.9 7 1.6 12-1.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        '</svg>')
BRAND = f'<a class="brand" href="index.html" aria-label="Real Life Safaris, home">{MARK}<span class="brand-word"><b>Real Life Safaris</b><small>Kigali · Rwanda</small></span></a>'


def head(title, desc, canonical):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#151a1c">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Real Life Safaris">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://www.reallifesafaris.com/assets/img/home/home2.jpeg">
<link rel="canonical" href="https://www.reallifesafaris.com/{canonical}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%23151a1c'/%3E%3Ccircle cx='25' cy='15' r='5' fill='%23c7b79b'/%3E%3Cpath d='M0 31c6-6 12-8 18-4 5 3 11 2 22-5v18H0z' fill='%239a743e'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.reallifesafaris.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Jost:wght@400;500;600&family=Marcellus&display=swap">
<link rel="stylesheet" href="assets/css/styles.css">
"""


def header(current, cta_href="index.html#plan", solid=False):
    items = [("index.html", "Home", "home"), ("tours.html#tours", "Tours", "tours"),
             ("tours.html#destinations", "Destinations", "dest"), ("index.html#about", "About us", "about"),
             ("index.html#plan", "Contact", "contact")]

    def cur(k):
        return ' aria-current="page"' if k == current else ""
    desktop = "".join(f'<li><a href="{h}"{cur(k)}>{l}</a></li>' for h, l, k in items)
    mobile = "".join(f'<li><a href="{h}"{cur(k)}><span>{l}</span>{ARROW}</a></li>' for h, l, k in items)
    return f"""<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header{' is-solid' if solid else ''}"{' data-solid' if solid else ''}>
  <div class="wrap header-inner">
    {BRAND}
    <nav class="nav-primary" aria-label="Main"><ul>{desktop}</ul></nav>
    <div class="header-actions">
      <a class="header-wa" href="https://wa.me/250789248756" target="_blank" rel="noopener" aria-label="WhatsApp Real Life Safaris">{WA}<span>+250 789 248 756</span></a>
      <a class="btn btn--sm" href="{cta_href}">Plan your trip</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <nav aria-label="Mobile"><ul>{mobile}</ul></nav>
  <div class="mm-contact">
    <a class="btn btn--block" href="{cta_href}">Plan your trip {ARROW}</a>
    <a class="btn btn--ghost-light btn--block" href="https://wa.me/250789248756" target="_blank" rel="noopener">{WA} WhatsApp +250 789 248 756</a>
    <span>reallifesafaris2022@gmail.com</span>
  </div>
</div>
"""


FOOTER_CTA = f"""    <div class="footer-cta">
      <h2 id="footer-title">Ready when you are. <em>Let's plan Rwanda together.</em></h2>
      <div class="btn-row">
        <a class="btn" href="index.html#plan">Start planning {ARROW}</a>
        <a class="btn btn--ghost-light" href="https://wa.me/250789248756" target="_blank" rel="noopener">{WA} WhatsApp us</a>
      </div>
    </div>
"""

FOOTER = f"""<footer class="site-footer" aria-labelledby="footer-title">
  <div class="wrap">
@@FOOTCTA@@    <div class="footer-grid">
      <div class="footer-brand">
        {BRAND}
        <p>Tailor-made journeys across Rwanda and East Africa, led by local guides, in small groups, with community and conservation at the heart of every trip.</p>
      </div>
      <div>
        <h3>Explore</h3>
        <ul>
          <li><a href="tours.html#tours">All tours</a></li>
          <li><a href="tours.html#destinations">Destinations</a></li>
          <li><a href="tour.html?id=akagera-2-days">2 Days in Akagera</a></li>
          <li><a href="tour.html?id=kigali-weekend-hike">Weekend hikes in Kigali</a></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li>11 KG 4 Ave, Kigali, Rwanda</li>
          <li><a href="tel:+250789248756">+250 789 248 756</a></li>
          <li><a href="https://wa.me/250789248756" target="_blank" rel="noopener">WhatsApp us</a></li>
          <li><a href="mailto:reallifesafaris2022@gmail.com" style="overflow-wrap:anywhere">reallifesafaris2022@gmail.com</a></li>
        </ul>
      </div>
      <div>
        <h3>Follow</h3>
        <ul>
          <li><a href="https://www.instagram.com/reallifesafaris/" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="https://www.facebook.com/people/Real-life-Safari/100084378417995/" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="https://x.com/reallifesafaris" target="_blank" rel="noopener">X</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> Real Life Safaris · <a href="https://www.reallifesafaris.com/legal/privacy.html" target="_blank" rel="noopener">Privacy</a> · <a href="https://www.reallifesafaris.com/legal/terms.html" target="_blank" rel="noopener">Terms</a></span>
      <span>Redesign concept · <button class="notes-toggle" type="button" aria-pressed="false">Show prototype notes</button></span>
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
    html = html.replace("@@FOOTCTA@@", "" if fname == "index.html" else FOOTER_CTA)
    html = html.replace("{{ARROW}}", ARROW).replace("{{WA}}", WA)
    (OUT / fname).write_text(html)
    print("wrote", fname, len(html))
