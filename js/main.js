(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var year = document.getElementById("y");
  if (year) year.textContent = String(new Date().getFullYear());

  /* --- media fallbacks --- */

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
      var holder = img.closest(".shot, .frame, .work, .row__thumb, .hero__pill, .m-pill");
      if (holder) holder.classList.add("is-missing");
    });
  });

  /* --- booking mailto --- */

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

  /* --- menu --- */

  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("site-menu");
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.textContent = open ? "Close" : "Menu";
      if (open) menu.removeAttribute("hidden");
      else menu.setAttribute("hidden", "");
    };
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") setMenu(false);
    });
  }

  var menuLinks = document.querySelectorAll(".menu__links a[href^='#']");
  var sections = [];
  menuLinks.forEach(function (link) {
    var el = document.getElementById(link.getAttribute("href").slice(1));
    if (el) sections.push({ el: el, link: link });
  });
  function markMenu() {
    var y = window.scrollY + 160;
    var current = sections[0];
    sections.forEach(function (item) {
      if (item.el.offsetTop <= y) current = item;
    });
    menuLinks.forEach(function (link) {
      link.classList.toggle("is-here", current && link === current.link);
    });
  }
  if (sections.length) {
    markMenu();
    window.addEventListener("scroll", markMenu, { passive: true });
  }

  /* --- word split for the big statement --- */

  if (!reduce) {
    document.querySelectorAll("[data-split]").forEach(function (node) {
      var words = node.textContent.split(/\s+/).filter(Boolean);
      node.textContent = "";
      words.forEach(function (word, i) {
        var wrap = document.createElement("span");
        wrap.className = "w";
        var inner = document.createElement("i");
        inner.textContent = word;
        inner.style.transitionDelay = Math.min(i * 22, 700) + "ms";
        wrap.appendChild(inner);
        node.appendChild(wrap);
        node.appendChild(document.createTextNode(" "));
      });
      node.classList.add("reveal", "is-split");
    });
  }

  /* --- reveal on scroll --- */

  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (node) {
      node.classList.add("is-in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (node) {
      io.observe(node);
    });
  }

  /* --- scroll-driven hero --- */

  var hero = document.querySelector("[data-hero]");
  var stage = document.querySelector("[data-hero-stage]");
  if (hero && stage && !reduce) {
    var ticking = false;
    var paint = function () {
      ticking = false;
      var runway = hero.offsetHeight - window.innerHeight;
      if (runway <= 0) return;
      var p = (window.scrollY - hero.offsetTop) / runway;
      p = Math.max(0, Math.min(1, p));
      stage.style.setProperty("--p", p.toFixed(4));
    };
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* --- quote slider --- */

  var quotes = document.querySelector("[data-quotes]");
  if (quotes) {
    var slides = Array.prototype.slice.call(quotes.querySelectorAll(".quote"));
    var dotsWrap = quotes.querySelector("[data-q-dots]");
    var index = 0;
    var dots = [];

    if (dotsWrap) {
      slides.forEach(function (slide, i) {
        var dot = document.createElement("i");
        if (i === 0) dot.className = "is-on";
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    var show = function (next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle("is-on", on);
        if (on) slide.removeAttribute("hidden");
        else slide.setAttribute("hidden", "");
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-on", i === index);
      });
    };

    var prev = quotes.querySelector("[data-q-prev]");
    var next = quotes.querySelector("[data-q-next]");
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });
  }

  /* --- stat counters --- */

  var counted = false;
  var stats = document.querySelectorAll("[data-count]");
  function runCounters() {
    if (counted) return;
    counted = true;
    stats.forEach(function (el) {
      var target = Number(el.getAttribute("data-count") || 0);
      if (reduce) {
        el.childNodes[0].textContent = String(target);
        return;
      }
      var start = performance.now();
      function frame(now) {
        var t = Math.min(1, (now - start) / 1000);
        var eased = 1 - Math.pow(1 - t, 3);
        el.childNodes[0].textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  var proof = document.getElementById("proof");
  if (proof && stats.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      runCounters();
    } else {
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
