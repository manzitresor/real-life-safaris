/*
 * Enquiry form. Renders into any [data-enquiry] element.
 *   data-tour="tour-id"   preselects a tour
 *   data-title="..."      heading text
 * There is no backend in this prototype: a valid enquiry is turned into
 * a ready-to-send WhatsApp message and copyable text, and the page says
 * clearly that nothing has been emailed.
 */
(function () {
  "use strict";
  var D = window.RLS, U = window.RLSUI, esc = U.esc;
  var uid = 0;

  var INTERESTS = ["Gorillas & primates", "Wildlife safari", "Birding", "Hiking", "Culture & community", "Cycling", "Lakes"];

  function monthMin() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  }

  function template(el) {
    var n = ++uid, p = "enq" + n + "-";
    var preset = el.getAttribute("data-tour") || "";
    var params = new URLSearchParams(location.search);
    if (!preset && params.get("tour")) preset = params.get("tour");
    var dest = params.get("dest") || "";
    var destObj = D.DESTINATIONS.filter(function (d) { return d.id === dest; })[0];
    var title = el.getAttribute("data-title") || "Tell us about your trip";
    var intro = el.getAttribute("data-intro") || "Share a few details and the team in Kigali will put together a plan. Fields marked optional can be left blank.";

    var opts = '<option value="">Choose a tour or option</option>' +
      '<option value="tailor-made"' + ((!preset && destObj) || preset === "tailor-made" ? " selected" : "") + '>A tailor-made trip, help me plan</option>' +
      '<optgroup label="Tours">' +
      D.TOURS.map(function (t) { return '<option value="' + esc(t.id) + '"' + (t.id === preset ? " selected" : "") + ">" + esc(t.title) + " · " + esc(t.duration) + "</option>"; }).join("") +
      "</optgroup>";

    var interests = INTERESTS.map(function (x, i) {
      return '<label class="check"><input type="checkbox" name="interests" value="' + esc(x) + '" id="' + p + "int" + i + '"><span>' + esc(x) + "</span></label>";
    }).join("");

    var msg = destObj ? "I'd like to visit " + destObj.name + "." : "";

    el.innerHTML =
      '<div class="form-card">' +
      '<form novalidate data-form>' +
      "<h3>" + esc(title) + "</h3><p>" + esc(intro) + "</p>" +
      '<div class="form-summary" role="alert" hidden data-summary></div>' +
      '<div class="form-grid">' +
      field(p, "name", "Full name", '<input id="' + p + 'name" name="name" type="text" autocomplete="name" required maxlength="80">') +
      field(p, "email", "Email", '<input id="' + p + 'email" name="email" type="email" autocomplete="email" required inputmode="email">') +
      field(p, "phone", 'WhatsApp or phone <span class="opt">(optional)</span>', '<input id="' + p + 'phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+44 7700 900000">', "Include your country code.") +
      field(p, "country", 'Country of residence <span class="opt">(optional)</span>', '<input id="' + p + 'country" name="country" type="text" autocomplete="country-name">') +
      field(p, "tour", "Which trip are you interested in?", '<select id="' + p + 'tour" name="tour" required>' + opts + "</select>", null, true) +
      field(p, "month", "Preferred month", '<input id="' + p + 'month" name="month" type="month" min="' + monthMin() + '" required>', "Pick the month you'd like to travel.") +
      field(p, "travellers", "Travellers", '<div class="stepper"><button type="button" data-step="-1" aria-label="One fewer traveller">−</button><input id="' + p + 'travellers" name="travellers" type="number" min="1" max="30" value="2" inputmode="numeric" required><button type="button" data-step="1" aria-label="One more traveller">+</button></div>') +
      '<fieldset class="field field--full" data-interests' + (preset && preset !== "tailor-made" ? " hidden" : "") + '><legend>What would you like to do? <span class="opt">(optional)</span></legend><div class="check-grid">' + interests + "</div></fieldset>" +
      field(p, "message", 'Anything else we should know? <span class="opt">(optional)</span>', '<textarea id="' + p + 'message" name="message" maxlength="1500" placeholder="Dates, budget, fitness level, special occasions, dietary needs…">' + esc(msg) + "</textarea>", null, true) +
      '<div class="field field--full"><label class="consent"><input type="checkbox" id="' + p + 'consent" name="consent" required><span>I agree to Real Life Safaris contacting me about this enquiry.</span></label><div class="field-error" id="' + p + 'consent-err"></div></div>' +
      "</div>" +
      '<div class="form-foot">' +
      '<button class="btn btn--block" type="submit">Prepare my enquiry ' + U.ICON.arrow + "</button>" +
      '<p class="form-note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg><span data-note="Prototype: email/CRM delivery not connected yet">This demo isn\'t connected to email yet. After you submit, you can send the enquiry straight to the team on WhatsApp or copy it.</span></p>' +
      "</div></form>" +
      '<div class="form-success" hidden data-success tabindex="-1"></div>' +
      "</div>";

    if (destObj) {
      var names = { wildlife: "Wildlife safari", birding: "Birding", hiking: "Hiking", culture: "Culture & community", cycling: "Cycling" };
      var box = el.querySelector('input[value="' + (names[destObj.cat] || "") + '"]');
      if (box) box.checked = true;
    }
    return el.querySelector("form");
  }

  function field(p, name, label, control, hint, full) {
    return '<div class="field' + (full ? " field--full" : "") + '"><label for="' + p + name + '">' + label + "</label>" + control +
      (hint ? '<div class="field-hint" id="' + p + name + '-hint">' + esc(hint) + "</div>" : "") +
      '<div class="field-error" id="' + p + name + '-err" aria-live="polite"></div></div>';
  }

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate(form) {
    var errs = [];
    function check(name, test, msg) {
      var input = form.elements[name];
      var err = form.querySelector("#" + input.id + "-err");
      var bad = !test(input);
      input.setAttribute("aria-invalid", bad ? "true" : "false");
      var desc = [input.id + "-err"];
      var hint = form.querySelector("#" + input.id + "-hint");
      if (hint) desc.unshift(hint.id);
      input.setAttribute("aria-describedby", desc.join(" "));
      err.textContent = bad ? msg : "";
      if (bad) errs.push({ input: input, msg: msg });
    }
    check("name", function (i) { return i.value.trim().length >= 2; }, "Enter your name so the team knows who to reply to.");
    check("email", function (i) { return EMAIL.test(i.value.trim()); }, "Enter an email address like name@example.com.");
    check("phone", function (i) { var v = i.value.trim(); return !v || /^\+?[\d\s().-]{7,20}$/.test(v); }, "Use digits only, with your country code, for example +250 789 248 756.");
    check("tour", function (i) { return !!i.value; }, "Choose a tour, or pick the tailor-made option.");
    check("month", function (i) { return !!i.value && i.value >= i.min; }, "Choose a month from this month onwards.");
    check("travellers", function (i) { var n = +i.value; return n >= 1 && n <= 30 && Math.floor(n) === n; }, "Enter between 1 and 30 travellers. For larger groups, mention it in your message.");
    check("consent", function (i) { return i.checked; }, "Tick this box so the team can reply to you.");
    return errs;
  }

  function summaryText(data) {
    var t = D.TOURS.filter(function (x) { return x.id === data.tour; })[0];
    var month = data.month ? new Date(data.month + "-01T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "";
    var lines = [
      "Hello Real Life Safaris, I'd like to enquire about a trip.",
      "",
      "Trip: " + (t ? t.title + " (" + t.duration + ")" : "Tailor-made trip"),
      "Preferred month: " + month,
      "Travellers: " + data.travellers,
      "Name: " + data.name,
      "Email: " + data.email
    ];
    if (data.phone) lines.push("Phone/WhatsApp: " + data.phone);
    if (data.country) lines.push("Country: " + data.country);
    if (data.interests.length) lines.push("Interests: " + data.interests.join(", "));
    if (data.message) lines.push("", data.message);
    return lines.join("\n");
  }

  function bind(form) {
    var wrap = form.parentNode;
    var summary = form.querySelector("[data-summary]");
    var success = wrap.querySelector("[data-success]");
    var touched = false;

    form.addEventListener("click", function (e) {
      var b = e.target.closest("[data-step]");
      if (!b) return;
      var i = form.elements.travellers;
      var n = Math.min(30, Math.max(1, (parseInt(i.value, 10) || 1) + +b.getAttribute("data-step")));
      i.value = n;
      if (touched) validate(form);
    });

    form.elements.tour.addEventListener("change", function () {
      var box = form.querySelector("[data-interests]");
      box.hidden = !!this.value && this.value !== "tailor-made";
    });

    form.addEventListener("input", function () { if (touched) { validate(form); } });
    form.addEventListener("change", function () { if (touched) { validate(form); } });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      touched = true;
      var errs = validate(form);
      if (errs.length) {
        summary.hidden = false;
        summary.innerHTML = "<strong>" + (errs.length === 1 ? "One thing needs fixing" : errs.length + " things need fixing") + "</strong> before your enquiry is ready.";
        errs[0].input.focus();
        return;
      }
      summary.hidden = true;
      var fd = new FormData(form);
      var data = {
        name: fd.get("name").trim(), email: fd.get("email").trim(), phone: (fd.get("phone") || "").trim(),
        country: (fd.get("country") || "").trim(), tour: fd.get("tour"), month: fd.get("month"),
        travellers: fd.get("travellers"), interests: fd.getAll("interests"), message: (fd.get("message") || "").trim()
      };
      var text = summaryText(data);
      var wa = "https://wa.me/" + D.CONTACT.whatsapp + "?text=" + encodeURIComponent(text);
      success.innerHTML =
        '<div class="tick">' + U.ICON.check + "</div>" +
        "<h3>Your enquiry is ready, " + esc(data.name.split(" ")[0]) + "</h3>" +
        '<div class="prototype-flag" data-note="Connect to email, CRM or booking tool at build stage"><strong>It hasn\'t been sent yet.</strong>This prototype isn\'t connected to email. Send it to the team on WhatsApp below, or copy it into an email to ' + esc(D.CONTACT.email) + ".</div>" +
        '<pre class="enquiry-preview" aria-label="Your enquiry">' + esc(text) + "</pre>" +
        '<div class="btn-row"><a class="btn" href="' + esc(wa) + '" target="_blank" rel="noopener">Send on WhatsApp ' + U.ICON.arrow + '</a>' +
        '<button type="button" class="btn btn--ghost" data-copy="' + esc(text) + '">Copy enquiry</button>' +
        '<button type="button" class="btn btn--ghost" data-edit>Edit details</button></div>' +
        '<p style="font-size:.85rem">Prefer to talk? Call or WhatsApp <b>' + esc(D.CONTACT.phone) + "</b>.</p>";
      form.hidden = true;
      success.hidden = false;
      success.focus();
      success.querySelector("[data-edit]").addEventListener("click", function () {
        success.hidden = true; form.hidden = false; form.elements.name.focus();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-enquiry]").forEach(function (el) { bind(template(el)); });
  });
})();
