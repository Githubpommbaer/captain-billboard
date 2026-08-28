(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var year = document.getElementById("y");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll("video").forEach(function (video) {
    var frame = video.closest(".player");
    var markMissing = function () {
      if (frame) frame.classList.add("is-missing");
    };
    video.addEventListener("error", markMissing);
    video.querySelectorAll("source").forEach(function (source) {
      source.addEventListener("error", markMissing);
    });
    if (frame) frame.classList.add("is-missing");
    video.addEventListener("loadeddata", function () {
      if (frame) frame.classList.remove("is-missing");
    });
  });

  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      var figure = img.closest(".shot, .hero-frame, .service__shot, .work, .player");
      if (figure) figure.classList.add("is-missing");
    });
  });

  var form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var consent = document.getElementById("consent");
      if (consent && !consent.checked) return;
      var lines = [
        "Captain Billboard booking",
        "------------------------",
        "Name: " + value("name"),
        "Email: " + value("email"),
        "Company / brand: " + value("company"),
        "Website: " + value("website"),
        "Package: " + value("package"),
        "Preferred dates: " + value("dates"),
        "City / location: " + value("city"),
        "Placard: " + value("placard"),
        "",
        value("message") || "(no extra note)",
        "",
        "— sent from the captainbillboard site",
      ];
      var subject = encodeURIComponent("Booking: " + (value("company") || value("name") || "Captain Billboard"));
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:book@captainbillboard.com?subject=" + subject + "&body=" + body;
    });
  }

  var burger = document.querySelector(".nav__menu");
  var drawer = document.getElementById("site-menu");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      if (open) drawer.setAttribute("hidden", "");
      else drawer.removeAttribute("hidden");
    });
    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        burger.setAttribute("aria-expanded", "false");
        drawer.setAttribute("hidden", "");
      });
    });
  }

  var links = document.querySelectorAll(".menu a[href^='#']");
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ el: el, link: link });
  });
  function markNav() {
    var y = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (item) {
      if (item.el.offsetTop <= y) current = item;
    });
    links.forEach(function (link) {
      link.classList.toggle("is-here", current && link === current.link);
    });
  }
  if (links.length) {
    markNav();
    window.addEventListener("scroll", markNav, { passive: true });
  }

  if (reduce) {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-in");
    });
  } else if ("IntersectionObserver" in window) {
    var reveals = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (node) {
      io.observe(node);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-in");
    });
  }

  var counted = false;
  var stats = document.querySelectorAll("[data-count]");
  function runCounters() {
    if (counted) return;
    counted = true;
    stats.forEach(function (el) {
      var target = Number(el.getAttribute("data-count") || 0);
      var start = performance.now();
      var suffix = el.querySelector("span");
      function frame(now) {
        var t = Math.min(1, (now - start) / 900);
        var eased = 1 - Math.pow(1 - t, 3);
        el.childNodes[0].textContent = String(Math.round(target * eased));
        if (suffix && !el.contains(suffix)) el.appendChild(suffix);
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  var proof = document.getElementById("proof");
  if (proof && stats.length) {
    if (reduce) {
      runCounters();
    } else if ("IntersectionObserver" in window) {
      var po = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          runCounters();
          po.disconnect();
        }
      }, { threshold: 0.25 });
      po.observe(proof);
    }
  }
})();
