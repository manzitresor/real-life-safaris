/* Tours page: category + duration filters (synced to ?cat= / ?dur=) and destination list. */
(function () {
  "use strict";
  var D = window.RLS, U = window.RLSUI, esc = U.esc;
  var state = { cat: "all", dur: "all" };

  function readURL() {
    var q = new URLSearchParams(location.search);
    var c = q.get("cat"), d = q.get("dur");
    if (c && D.CATEGORIES.some(function (x) { return x.id === c; })) state.cat = c;
    if (d && /^(half|day|multi)$/.test(d)) state.dur = d;
  }
  function writeURL() {
    var q = new URLSearchParams();
    if (state.cat !== "all") q.set("cat", state.cat);
    if (state.dur !== "all") q.set("dur", state.dur);
    var url = location.pathname + (q.toString() ? "?" + q : "") + "#tours";
    try { history.replaceState(null, "", url); } catch (e) { /* file:// in some browsers */ }
  }

  function matches(t, cat, dur) {
    return (cat === "all" || t.categories.indexOf(cat) > -1) && (dur === "all" || t.durationType === dur);
  }

  function renderChips() {
    var host = document.getElementById("cat-filters");
    var all = [{ id: "all", label: "All tours" }].concat(D.CATEGORIES);
    host.innerHTML = all.map(function (c) {
      var n = D.TOURS.filter(function (t) { return matches(t, c.id, state.dur); }).length;
      return '<button type="button" class="chip-btn" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.label) + '<span class="count">' + n + "</span></button>";
    }).join("");
  }

  function render(animate) {
    var list = D.TOURS.filter(function (t) { return matches(t, state.cat, state.dur); });
    var grid = document.getElementById("tour-grid");
    grid.innerHTML = list.map(function (t) { return U.tourCard(t, { entering: animate }); }).join("");
    U.wireImages(grid);
    document.getElementById("empty-state").hidden = list.length > 0;
    var filtered = state.cat !== "all" || state.dur !== "all";
    document.getElementById("reset-filters").hidden = !filtered;
    var catLabel = state.cat === "all" ? "" : " · " + D.CATEGORIES.filter(function (c) { return c.id === state.cat; })[0].label;
    var durLabel = state.dur === "all" ? "" : " · " + { half: "Half day", day: "Full day", multi: "Multi-day" }[state.dur];
    document.getElementById("results-count").textContent = (filtered ? "Showing " + list.length + " of " + D.TOURS.length + " tours" : "Showing all " + D.TOURS.length + " tours") + catLabel + durLabel;
    renderChips();
    document.getElementById("duration-filter").value = state.dur;
  }

  function reset() { state.cat = "all"; state.dur = "all"; writeURL(); render(true); }

  function destinations() {
    var host = document.getElementById("dest-list");
    host.innerHTML = D.DESTINATIONS.map(function (d) {
      var tour = D.TOURS.filter(function (t) { return t.id === d.tour; })[0];
      return '<article class="dest reveal" id="dest-' + d.id + '">' +
        U.media(d.image, { label: d.name, decorative: false }) +
        '<div style="min-width:0"><div class="dest-head"><h3>' + esc(d.name) + '</h3><span class="dest-meta">' + esc(d.region) + " · " + esc(d.elevLabel) + "</span></div>" +
        "<p>" + esc(d.text) + "</p>" +
        '<ul class="chips light-chips">' + d.activities.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="dest-cta"><a class="btn btn--ghost" href="index.html?dest=' + d.id + '#plan">Enquire about ' + esc(d.name.split(",")[0].replace(" National Park", "")) + "</a>" +
        (tour ? '<a class="link-arrow" href="tour.html?id=' + tour.id + '">Related tour: ' + esc(tour.title.length > 34 ? tour.title.slice(0, 32).replace(/\s+\S*$/, "") + "…" : tour.title) + " " + U.ICON.arrow + "</a>" : "") +
        "</div></article>";
    }).join("");
    U.wireImages(host);
  }

  document.addEventListener("DOMContentLoaded", function () {
    readURL();
    render(false);
    destinations();
    document.getElementById("cat-filters").addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b) return;
      state.cat = b.getAttribute("data-cat");
      writeURL(); render(true);
      var nb = document.querySelector('[data-cat="' + state.cat + '"]'); if (nb) nb.focus();
    });
    document.getElementById("duration-filter").addEventListener("change", function () { state.dur = this.value; writeURL(); render(true); });
    document.getElementById("reset-filters").addEventListener("click", reset);
    document.getElementById("empty-reset").addEventListener("click", reset);
    // land on a destination anchor after it is rendered
    if (location.hash && location.hash.indexOf("#dest-") === 0) {
      var t = document.querySelector(location.hash); if (t) setTimeout(function () { t.scrollIntoView(); }, 50);
    }
  });
})();
