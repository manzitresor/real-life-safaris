/* Shared site behaviour: header, mobile menu, images, reveal, lightbox, copy, prototype notes. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    dash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Image markup with loading + fallback state. img may be null (photo to be supplied). */
  function media(img, opts) {
    opts = opts || {};
    var label = opts.label || (img && img.alt) || "To be supplied";
    if (!img) {
      return '<div class="media media--placeholder ' + (opts.cls || "") + '" role="img" aria-label="' + esc(label) + ' (photo to be supplied)" data-note="Photo to be supplied by Real Life Safaris"><span class="media-fallback-label">' + esc(label) + '</span></div>';
    }
    return '<div class="media is-loading ' + (opts.cls || "") + '"><img src="' + esc(img.src) + '" alt="' + esc(opts.decorative ? "" : img.alt) + '" loading="' + (opts.eager ? "eager" : "lazy") + '" decoding="async"' + (opts.eager ? ' fetchpriority="high"' : "") + (opts.pos ? ' style="object-position:' + esc(opts.pos) + '"' : "") + '><span class="media-fallback-label" aria-hidden="true">' + esc(label) + "</span></div>";
  }

  function wireImages(root) {
    (root || document).querySelectorAll(".media img").forEach(function (img) {
      if (img.dataset.wired) return;
      img.dataset.wired = "1";
      var box = img.closest(".media");
      function ok() { img.classList.add("is-loaded"); box.classList.remove("is-loading"); }
      function fail() { box.classList.remove("is-loading"); box.classList.add("is-fallback"); }
      if (img.complete && img.naturalWidth) ok();
      else if (img.complete && !img.naturalWidth && img.src) fail();
      img.addEventListener("load", ok);
      img.addEventListener("error", fail);
    });
  }

  function priceHTML(t, cls) {
    var req = !t.price.from;
    return '<div class="price ' + (req ? "price--request " : "") + (cls || "") + '"><small>' + (req ? "Price" : t.price.table.length > 1 ? "From" : "Price") + "</small><b>" + esc(req ? "On request" : t.price.display.replace(/^From\s/, "")) + (req ? "" : ' <span class="visually-hidden">' + esc(t.price.unit || "") + "</span>") + "</b></div>";
  }

  function tourCard(t, opts) {
    opts = opts || {};
    return (
      '<article class="tour-card' + (opts.entering ? " is-entering" : "") + '">' +
      '<span class="tour-card-badge">' + esc(t.kicker) + "</span>" +
      media(t.image, { decorative: true }) +
      '<div class="tour-card-body">' +
      '<div class="tour-card-meta"><span>' + ICON.clock + esc(t.duration) + "</span><span>" + ICON.pin + esc(t.location.split(",")[0]) + "</span></div>" +
      '<h3><a href="tour.html?id=' + encodeURIComponent(t.id) + '">' + esc(t.title) + "</a></h3>" +
      "<p>" + esc(t.short) + "</p>" +
      '<div class="tour-card-foot">' + priceHTML(t) + '<span class="tour-card-cta" aria-hidden="true">View tour ' + ICON.arrow + "</span></div>" +
      "</div></article>"
    );
  }

  /* header */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var solidAlways = header.hasAttribute("data-solid");
    function onScroll() {
      header.classList.toggle("is-solid", solidAlways || window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = document.querySelector(".menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    function setOpen(open) {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
      if (open) { var first = menu.querySelector("a"); if (first) first.focus(); }
    }
    toggle.addEventListener("click", function () { setOpen(!document.body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960) setOpen(false); });
    // keep focus inside the open menu
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = [toggle].concat([].slice.call(menu.querySelectorAll("a,button")));
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    });
  }

  /* reveal: content is visible at rest; only elements below the fold get a gentle lift */
  function initReveal() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var els = [].slice.call(document.querySelectorAll(".reveal"));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("is-pending"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 1.02) { el.classList.add("is-pending"); io.observe(el); }
    });
    // safety: never leave anything hidden
    setTimeout(function () { els.forEach(function (el) { el.classList.remove("is-pending"); }); }, 6000);
  }

  /* lightbox for [data-lightbox] buttons */
  function initLightbox() {
    var box = document.getElementById("lightbox");
    if (!box) return;
    var img = box.querySelector("img"), cap = box.querySelector("p"), close = box.querySelector(".lightbox-close"), last;
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lightbox]");
      if (!b) return;
      var src = b.getAttribute("data-lightbox");
      var fig = b.querySelector("img");
      if (!fig || !fig.classList.contains("is-loaded")) return; // nothing to enlarge
      last = b;
      img.src = src; img.alt = b.getAttribute("data-caption") || "";
      cap.textContent = b.getAttribute("data-caption") || "";
      box.hidden = false; document.body.style.overflow = "hidden"; close.focus();
    });
    function hide() { box.hidden = true; document.body.style.overflow = ""; if (last) last.focus(); }
    close.addEventListener("click", hide);
    box.addEventListener("click", function (e) { if (e.target === box) hide(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) hide(); });
  }

  /* copy buttons */
  function initCopy() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-copy]");
      if (!b) return;
      var text = b.getAttribute("data-copy"), orig = b.textContent;
      function done(msg) { b.textContent = msg; setTimeout(function () { b.textContent = orig; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done("Copied"); }, function () { done("Select to copy"); });
      } else done("Select to copy");
    });
  }

  /* prototype notes toggle */
  function initNotes() {
    var btns = document.querySelectorAll(".notes-toggle");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var on = document.body.classList.toggle("show-notes");
        btns.forEach(function (x) { x.setAttribute("aria-pressed", String(on)); x.textContent = on ? "Hide prototype notes" : "Show prototype notes"; });
      });
    });
  }

  function fillYear() { document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); }); }

  window.RLSUI = { ICON: ICON, esc: esc, media: media, wireImages: wireImages, tourCard: tourCard, priceHTML: priceHTML };

  document.addEventListener("DOMContentLoaded", function () {
    initHeader(); wireImages(); initLightbox(); initCopy(); initNotes(); fillYear();
    requestAnimationFrame(initReveal);
  });
})();
