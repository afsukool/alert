(function () {
  "use strict";
  var WA = "919037848878";

  /* mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* conversion tracking hook: pushes to dataLayer only; no analytics script is loaded here */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-track]") : null;
    if (!el) return;
    (window.dataLayer = window.dataLayer || []).push({ event: "cta_click", cta: el.getAttribute("data-track") });
  });

  /* enquiry form */
  var form = document.getElementById("contact-form");
  if (!form) return;
  var endpoint = form.getAttribute("data-endpoint") || "";
  var status = document.getElementById("form-status");
  var note = document.getElementById("form-note");
  if (!endpoint && note) {
    note.textContent = "Pressing Request a quote opens WhatsApp with your details filled in. Press send there to reach us. You can also call or email us directly.";
  }
  form.removeAttribute("action");
  form.setAttribute("novalidate", "novalidate");

  function setErr(id, msg) {
    var input = document.getElementById(id);
    var err = document.getElementById(id + "-err");
    if (msg) { input.setAttribute("aria-invalid", "true"); err.textContent = msg; }
    else { input.removeAttribute("aria-invalid"); err.textContent = ""; }
    return !msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) { return (document.getElementById(id).value || "").trim(); };
    var digits = v("f-phone").replace(/\D/g, "");
    var okName = setErr("f-name", v("f-name") ? "" : "Enter your name.");
    var okPhone = setErr("f-phone", digits.length >= 8 ? "" : "Enter a phone number we can call, with at least 8 digits.");
    var email = v("f-email");
    var okEmail = setErr("f-email", !email || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "" : "Enter a valid email address or leave it blank.");
    if (!(okName && okPhone && okEmail)) {
      var bad = form.querySelector("[aria-invalid='true']");
      if (bad) bad.focus();
      return;
    }
    if (v("f-website")) return; /* honeypot */

    var data = {
      name: v("f-name"), phone: v("f-phone"), email: email, location: v("f-location"),
      service: v("f-service"), message: v("f-message")
    };
    (window.dataLayer = window.dataLayer || []).push({ event: "quote_request", service: data.service });

    if (endpoint) {
      status.textContent = "Sending your enquiry...";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error("bad response");
        form.reset();
        status.textContent = "Thank you, " + data.name + ". Your enquiry has been sent to Alert LookLive. We will contact you on the number you gave.";
      }).catch(function () {
        status.textContent = "Your enquiry could not be sent. Please call +91 9037 848 878 or use WhatsApp instead.";
      });
      return;
    }

    var lines = [
      "Hello Alert LookLive, I would like a quote.",
      "Name: " + data.name,
      "Phone: " + data.phone
    ];
    if (data.email) lines.push("Email: " + data.email);
    if (data.location) lines.push("Location: " + data.location);
    if (data.service) lines.push("Service: " + data.service);
    if (data.message) lines.push("Details: " + data.message);
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    status.textContent = "WhatsApp has opened with your enquiry. Press send there to reach us.";
  });
})();
