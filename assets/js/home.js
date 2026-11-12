/* Homepage: featured tours + "Rwanda, west to east" elevation profile. */
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

  // approximate longitude of each destination, west (left) to east (right)
  var LON = { nyungwe: 29.25, karongi: 29.38, volcanoes: 29.55, jali: 30.05, muhazi: 30.36, akagera: 30.7 };

  function profile() {
    var host = document.getElementById("profile-chart");
    var panel = document.getElementById("profile-panel");
    if (!host || !panel) return;
    var pts = D.DESTINATIONS.filter(function (d) { return LON[d.id]; }).map(function (d) { return { d: d, lon: LON[d.id] }; });
    pts.sort(function (a, b) { return a.lon - b.lon; });

    var W = 1200, H = 380, padL = 56, padR = 24, top = 90, bottom = 320;
    var x0 = 29.0, x1 = 30.95, e0 = 1000, e1 = 4800;
    function X(lon) { return padL + (lon - x0) / (x1 - x0) * (W - padL - padR); }
    function Y(m) { return bottom - (m - e0) / (e1 - e0) * (bottom - top); }

    // ridge: destination points plus gentle terrain in between
    var ridge = [[29.0, 1600], [29.12, 2300]]
      .concat([[29.25, 2950], [29.31, 1900], [29.38, 1460], [29.45, 2200], [29.55, 4507], [29.66, 2400], [29.85, 1850], [30.05, 2080], [30.2, 1600], [30.36, 1450], [30.52, 1550], [30.7, 1300], [30.95, 1350]]);
    var P = ridge.map(function (r) { return [X(r[0]), Y(r[1])]; });
    // Catmull-Rom to cubic Bézier
    var d = "M" + P[0][0] + "," + P[0][1];
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2, t = 0.18;
      d += " C" + (p1[0] + (p2[0] - p0[0]) * t).toFixed(1) + "," + (p1[1] + (p2[1] - p0[1]) * t).toFixed(1) + " " +
        (p2[0] - (p3[0] - p1[0]) * t).toFixed(1) + "," + (p2[1] - (p3[1] - p1[1]) * t).toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
    }
    var area = d + " L" + P[P.length - 1][0] + "," + bottom + " L" + P[0][0] + "," + bottom + " Z";

    var ticks = [1000, 2000, 3000, 4000].map(function (m) {
      return '<g class="axis"><line x1="' + padL + '" x2="' + (W - padR) + '" y1="' + Y(m) + '" y2="' + Y(m) + '"/><text x="' + (padL - 10) + '" y="' + (Y(m) + 4) + '" text-anchor="end">' + m.toLocaleString("en-GB") + "</text></g>";
    }).join("");

    var marks = pts.map(function (p, idx) {
      var cx = X(p.lon), cy = Y(p.d.elev);
      var up = p.d.elev > 2600; // label below very high points
      var ly = up ? cy + 30 : cy - 48;
      var anchor = idx === 0 ? "start" : idx === pts.length - 1 ? "end" : "middle";
      var lx = idx === 0 ? cx - 6 : idx === pts.length - 1 ? cx + 6 : cx;
      if (p.d.id === "volcanoes") { anchor = "middle"; lx = cx; ly = cy - 34; }
      if (p.d.id === "karongi") { anchor = "middle"; lx = cx - 10; ly = cy + 30; }
      if (p.d.id === "nyungwe") { ly = cy - 42; anchor = "start"; lx = cx - 6; }
      return '<g class="pt" tabindex="0" role="button" aria-label="' + esc(p.d.name + ", " + p.d.elevLabel) + '" data-id="' + p.d.id + '">' +
        '<rect x="' + (cx - 44) + '" y="' + (cy - 60) + '" width="88" height="' + (bottom - cy + 60) + '" fill="transparent"/>' +
        '<line x1="' + cx + '" x2="' + cx + '" y1="' + cy + '" y2="' + bottom + '"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="5.5"/>' +
        '<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '">' + esc(p.d.name.replace(" National Park", "").replace(", Kigali", "")) + "</text>" +
        '<text class="elev" x="' + lx + '" y="' + (ly + 16) + '" text-anchor="' + anchor + '">' + esc(p.d.elevLabel) + "</text></g>";
    }).join("");

    host.innerHTML =
      '<svg viewBox="0 0 ' + W + " " + H + '" role="group" aria-label="Elevation profile of Rwanda destinations, west to east">' +
      '<defs><linearGradient id="ridgeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c4436"/><stop offset="1" stop-color="#15201a" stop-opacity="0"/></linearGradient></defs>' +
      ticks +
      '<path class="ridge" d="' + area + '"/><path class="ridge-line" d="' + d + '"/>' +
      marks +
      '<g class="axis"><text x="' + padL + '" y="' + (bottom + 34) + '">WEST · Lake Kivu</text><text x="' + (W - padR) + '" y="' + (bottom + 34) + '" text-anchor="end">Tanzania border · EAST</text><text x="' + (padL - 10) + '" y="' + (Y(4000) - 18) + '" text-anchor="end">metres</text></g>' +
      "</svg>";

    function show(id) {
      var dest = D.DESTINATIONS.filter(function (x) { return x.id === id; })[0];
      host.querySelectorAll(".pt").forEach(function (g) {
        var on = g.getAttribute("data-id") === id;
        g.classList.toggle("is-active", on);
        g.setAttribute("aria-pressed", String(on));
      });
      panel.innerHTML =
        U.media(dest.image, { label: dest.name }) +
        "<div>" +
        '<span class="eyebrow">' + esc(dest.region) + " · " + esc(dest.elevLabel) + "</span>" +
        "<h3>" + esc(dest.name) + "</h3><p>" + esc(dest.text) + "</p>" +
        '<ul class="chips">' + dest.activities.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" +
        '<a class="link-arrow" href="tours.html?cat=' + esc(dest.cat) + '#tours">See ' + esc(dest.cat === "wildlife" ? "safari" : D.CATEGORIES.filter(function (c) { return c.id === dest.cat; })[0].label.toLowerCase()) + " tours " + U.ICON.arrow + "</a>" +
        "</div>";
      U.wireImages(panel);
    }
    host.addEventListener("click", function (e) { var g = e.target.closest(".pt"); if (g) show(g.getAttribute("data-id")); });
    host.addEventListener("keydown", function (e) {
      var g = e.target.closest(".pt");
      if (!g) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(g.getAttribute("data-id")); }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var all = [].slice.call(host.querySelectorAll(".pt")), i = all.indexOf(g);
        var n = all[(i + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length];
        n.focus(); show(n.getAttribute("data-id"));
      }
    });
    show("volcanoes");
  }

  document.addEventListener("DOMContentLoaded", function () { featured(); profile(); });
})();
