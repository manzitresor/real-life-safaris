/* Homepage: featured tours + destination explorer. */
(function () {
  "use strict";
  var D = window.RLS, U = window.RLSUI, esc = U.esc;

  function featured() {
    var el = document.getElementById("featured-tours");
    if (!el) return;
    var ids = ["akagera-2-days", "musanze-day", "kigali-weekend-hike"];
    el.innerHTML = ids.map(function (id) { return U.tourCard(D.TOURS.filter(function (t) { return t.id === id; })[0]); }).join("");
    U.wireImages(el);
  }

  function explorer() {
    var list = document.getElementById("explorer-list");
    var panel = document.getElementById("explorer-panel");
    if (!list || !panel) return;
    var dests = D.DESTINATIONS;

    list.innerHTML = dests.map(function (d, i) {
      return '<button type="button" role="tab" id="xp-tab-' + d.id + '" aria-controls="explorer-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-dest="' + d.id + '">' +
        '<span class="xp-n">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="xp-name">' + esc(d.name) + "</span>" +
        '<span class="xp-meta">' + esc(d.region) + "</span></button>";
    }).join("");

    function show(id) {
      var d = dests.filter(function (x) { return x.id === id; })[0];
      var tour = D.TOURS.filter(function (t) { return t.id === d.tour; })[0];
      list.querySelectorAll("[role=tab]").forEach(function (b) {
        var on = b.getAttribute("data-dest") === id;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        if (on && list.scrollWidth > list.clientWidth + 4) list.scrollTo({ left: b.offsetLeft - list.offsetLeft - 16, behavior: "smooth" });
      });
      panel.setAttribute("aria-labelledby", "xp-tab-" + id);
      panel.innerHTML =
        U.media(d.image, { label: d.name }) +
        '<div class="xp-body">' +
        '<p class="xp-region">' + esc(d.region) + " · " + esc(d.elevLabel) + "</p>" +
        "<h3>" + esc(d.name) + "</h3>" +
        "<p>" + esc(d.text) + "</p>" +
        '<ul class="pills">' + d.activities.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" +
        '<div class="btn-row">' +
        (tour ? '<a class="btn btn--light" href="tour.html?id=' + tour.id + '">See a related tour ' + U.ICON.arrow + "</a>" : "") +
        '<a class="btn btn--ghost-light" href="index.html?dest=' + d.id + '#plan" data-dest-enquire="' + d.id + '">Plan a visit</a>' +
        "</div></div>";
      U.wireImages(panel);
    }

    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-dest]");
      if (b) show(b.getAttribute("data-dest"));
    });
    list.addEventListener("keydown", function (e) {
      var tabs = [].slice.call(list.querySelectorAll("[role=tab]"));
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (e.key === "Home") n = -i; if (e.key === "End") n = tabs.length - 1 - i;
      if (n === undefined) return;
      e.preventDefault();
      var t = tabs[(i + n + tabs.length) % tabs.length];
      t.focus(); show(t.getAttribute("data-dest"));
    });
    show(dests.filter(function (d) { return d.id === "volcanoes"; })[0] ? "volcanoes" : dests[0].id);
  }

  /* Destination link inside the homepage: prefill the form in place instead of reloading. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-dest-enquire]");
    if (!a) return;
    var d = D.DESTINATIONS.filter(function (x) { return x.id === a.getAttribute("data-dest-enquire"); })[0];
    var form = document.querySelector("#plan form");
    if (!d || !form) return;
    e.preventDefault();
    form.elements.tour.value = "tailor-made";
    form.elements.tour.dispatchEvent(new Event("change"));
    if (!form.elements.message.value) form.elements.message.value = "I'd like to visit " + d.name + ".";
    document.getElementById("plan").scrollIntoView({ behavior: "smooth" });
    setTimeout(function () { form.elements.name.focus({ preventScroll: true }); }, 500);
  });

  document.addEventListener("DOMContentLoaded", function () { featured(); explorer(); });
})();
