/* Tour detail page. Renders the tour named in ?id= (default: Akagera). Runs before the
   enquiry form initialises so the form preselects this tour. */
(function () {
  "use strict";
  var D = window.RLS, U = window.RLSUI, esc = U.esc;
  var id = new URLSearchParams(location.search).get("id") || "akagera-2-days";
  var t = D.TOURS.filter(function (x) { return x.id === id; })[0];
  var main = document.getElementById("tour-main");

  if (!t) {
    document.title = "Tour not found | Real Life Safaris";
    document.getElementById("page-title").textContent = "We couldn't find that tour.";
    document.getElementById("tour-short").textContent = "The link may be out of date. Browse all tours or tell us what you're looking for.";
    document.getElementById("tour-kicker").textContent = "Tour not found";
    document.getElementById("crumb-current").textContent = "Not found";
    document.querySelector(".facts-bar").hidden = true;
    main.innerHTML = '<div class="empty-state"><h3>Try one of our six tours</h3><p>Every tour is listed on the tours page.</p><a class="btn" href="tours.html#tours">Browse tours</a></div>';
    document.getElementById("tour-enquiry").removeAttribute("data-tour");
    return;
  }

  /* head + hero */
  document.title = t.title + " | Real Life Safaris";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t.short);
  var heroImg = document.querySelector("#hero-media img");
  if (heroImg.getAttribute("src") !== t.image.src) { heroImg.src = t.image.src; }
  heroImg.alt = t.image.alt;
  document.querySelector("#hero-media .media-fallback-label").textContent = t.location;
  document.getElementById("tour-kicker").textContent = t.kicker;
  document.getElementById("page-title").textContent = t.title;
  document.getElementById("tour-short").textContent = t.short;
  document.getElementById("crumb-current").textContent = t.title;
  document.getElementById("tour-enquiry").setAttribute("data-tour", t.id);

  /* facts bar */
  var facts = [
    ["Duration", t.duration], ["Location", t.location], ["Departs", t.departs], ["Group", t.group],
    ["Price", t.price.from ? t.price.display + " " + (t.price.unit || "") : "On request"]
  ];
  document.getElementById("tour-facts").innerHTML = facts.map(function (f) {
    return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
  }).join("");

  /* main column */
  var I = U.ICON;
  var gallery = t.gallery.map(function (g, i) {
    return '<button type="button" data-lightbox="' + esc(g.src) + '" data-caption="' + esc(g.alt) + '" aria-label="Enlarge photo: ' + esc(g.alt) + '">' + U.media(g, { decorative: true }) + "</button>";
  }).join("");

  var priceBlock = t.price.table.length
    ? '<table class="price-table"><caption class="visually-hidden">Prices</caption><tbody>' + t.price.table.map(function (r) { return '<tr><th scope="row">' + esc(r.label) + "</th><td>" + esc(r.value) + "</td></tr>"; }).join("") + "</tbody></table>"
    : '<p style="color:var(--muted)">Prices depend on group size, season and the options you choose. Send an enquiry for a quote.</p>';

  main.innerHTML =
    '<section class="overview" aria-labelledby="ov-title"><h2 id="ov-title" class="visually-hidden">Overview</h2>' + t.overview.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>" +

    '<dl class="stats-row" aria-label="At a glance">' + t.stats.map(function (s) { return '<div class="stat"><dt>' + esc(s.k) + "</dt><dd>" + esc(s.v) + "</dd></div>"; }).join("") + "</dl>" +

    '<section aria-labelledby="hl-title"><h2 id="hl-title">Highlights</h2><ul class="highlights">' + t.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></section>" +

    '<section id="itinerary" aria-labelledby="it-title"><h2 id="it-title">Itinerary</h2>' +
    '<p class="sample-note" data-note="Confirm itinerary with Real Life Safaris">' + esc(t.itinerary.note) + "</p>" +
    '<ol class="timeline">' + t.itinerary.steps.map(function (s) {
      return '<li><div class="tl-when"><b>' + esc(s.label) + "</b><span>" + esc(s.time) + '</span></div><div class="tl-body"><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div></li>";
    }).join("") + "</ol></section>" +

    '<section aria-labelledby="gal-title"><h2 id="gal-title">Gallery</h2><div class="detail-gallery" style="--rest:' + Math.max(1, t.gallery.length - 1) + '">' + gallery + "</div></section>" +

    '<section aria-labelledby="inc-title"><h2 id="inc-title">What\'s included</h2><div class="incl">' +
    '<div class="yes"><h3>Included</h3><ul>' + t.included.map(function (x) { return "<li>" + I.check + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul></div>" +
    '<div class="no"><h3>Not included</h3><ul>' + t.excluded.map(function (x) { return "<li>" + I.dash + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul></div>" +
    '<div class="yes" style="grid-column:1/-1"><h3>What to bring</h3><ul class="bring">' + t.bring.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
    "</div></section>" +

    '<section aria-labelledby="pr-title"><h2 id="pr-title">Prices</h2>' + priceBlock +
    '<p class="sample-note" style="margin-top:16px;margin-bottom:0" data-note="Prices from current website; verify before launch">' + esc(t.price.note) + "</p></section>";

  U.wireImages(main);

  /* sticky aside price summary */
  var sticky = document.querySelector(".aside-sticky");
  var ap = document.createElement("div");
  ap.className = "aside-price";
  ap.innerHTML = U.priceHTML(t) + '<span class="mono" style="font-size:.75rem;color:var(--muted)">' + esc(t.duration) + "</span>";
  var card = sticky.querySelector("[data-enquiry]");
  // inserted into the form card once it renders
  document.addEventListener("DOMContentLoaded", function () {
    var fc = card.querySelector(".form-card");
    if (fc) fc.insertBefore(ap, fc.firstChild);
  });

  /* related tours: share a category, fall back to others */
  var rel = D.TOURS.filter(function (x) { return x.id !== t.id && x.categories.some(function (c) { return t.categories.indexOf(c) > -1; }); });
  D.TOURS.forEach(function (x) { if (x.id !== t.id && rel.indexOf(x) < 0) rel.push(x); });
  var relHost = document.getElementById("related-tours");
  relHost.innerHTML = rel.slice(0, 3).map(function (x) { return U.tourCard(x); }).join("");

  /* mobile sticky CTA */
  document.getElementById("mobile-price").outerHTML = U.priceHTML(t);
  var bar = document.getElementById("mobile-cta"), hero = document.getElementById("tour-hero"), enq = document.getElementById("enquire");
  if ("IntersectionObserver" in window) {
    var heroVis = true, enqVis = false;
    function upd() {
      var on = !heroVis && !enqVis;
      bar.classList.toggle("is-visible", on);
      bar.setAttribute("aria-hidden", String(!on));
      bar.querySelector("a").tabIndex = on ? 0 : -1;
    }
    new IntersectionObserver(function (e) { heroVis = e[0].isIntersecting; upd(); }).observe(hero);
    new IntersectionObserver(function (e) { enqVis = e[0].isIntersecting; upd(); }).observe(enq);
  }
})();
