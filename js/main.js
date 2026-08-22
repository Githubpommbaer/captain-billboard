(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var year = document.getElementById("y");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll("video").forEach(function (video) {
    var frame = video.closest(".player, .trailer-frame");
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
      var figure = img.closest(".shot, .hero-shot, .hero-frame, .media-frame, .brand, .episode, .cast__photo, .thumb");
      if (img.dataset.fallback === "mark") {
        var mark = document.createElement("span");
        mark.className = "brand__mark";
        mark.setAttribute("aria-hidden", "true");
        mark.textContent = "CB";
        img.replaceWith(mark);
        return;
      }
      if (img.dataset.fallback === "hide") {
        img.remove();
        return;
      }
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
      if (!document.getElementById("consent").checked) return;
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

  var burger = document.querySelector(".burger");
  var drawer = document.getElementById("mobile-nav");
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

  var links = document.querySelectorAll(".rail nav a[href^='#']");
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ el: el, link: link });
  });
  function markRail() {
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
    markRail();
    window.addEventListener("scroll", markRail, { passive: true });
  }

  function setupCast(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll(".cast__slide"));
    var picks = Array.prototype.slice.call(root.querySelectorAll(".cast__picks [data-cast]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-cast-dots] i"));
    var index = 0;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle("is-on", on);
        if (on) slide.removeAttribute("hidden");
        else slide.setAttribute("hidden", "");
      });
      picks.forEach(function (pick, i) {
        pick.classList.toggle("is-on", i === index);
        pick.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-on", i === index);
      });
    }

    picks.forEach(function (pick) {
      pick.addEventListener("click", function () {
        show(Number(pick.getAttribute("data-cast") || 0));
      });
    });
    var prev = root.querySelector("[data-cast-prev]");
    var next = root.querySelector("[data-cast-next]");
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });
  }

  document.querySelectorAll("[data-cast]").forEach(setupCast);

  function setupCarousel(root) {
    var track = root.querySelector("[data-track]");
    var dotsWrap = root.querySelector("[data-dots]");
    if (!track) return;
    var items = Array.prototype.slice.call(track.children);
    if (!items.length) return;

    function pageWidth() {
      return track.clientWidth || 1;
    }

    function pages() {
      var w = pageWidth();
      var total = track.scrollWidth;
      return Math.max(1, Math.ceil(total / w));
    }

    function current() {
      return Math.round(track.scrollLeft / pageWidth());
    }

    function paintDots() {
      if (!dotsWrap) return;
      var n = pages();
      dotsWrap.innerHTML = "";
      for (var i = 0; i < n; i += 1) {
        var dot = document.createElement("i");
        if (i === current()) dot.className = "is-on";
        dotsWrap.appendChild(dot);
      }
    }

    function go(dir) {
      track.scrollBy({ left: dir * pageWidth(), behavior: reduce ? "auto" : "smooth" });
    }

    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    track.addEventListener("scroll", paintDots, { passive: true });
    window.addEventListener("resize", paintDots);
    paintDots();
  }

  document.querySelectorAll("[data-carousel]").forEach(setupCarousel);

  var galleryHero = document.querySelector("[data-gallery-hero]");
  if (galleryHero) {
    document.querySelectorAll(".strip figure").forEach(function (figure) {
      figure.addEventListener("click", function () {
        var img = figure.querySelector("img");
        if (!img) return;
        galleryHero.src = img.src;
        galleryHero.alt = img.alt;
        document.querySelectorAll(".strip figure").forEach(function (node) {
          node.classList.toggle("is-on", node === figure);
        });
        var caption = galleryHero.parentElement.querySelector("figcaption");
        if (caption) caption.textContent = img.alt;
      });
    });
  }

  var thumbs = document.querySelectorAll("[data-thumbs] .thumb");
  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      thumbs.forEach(function (node) {
        node.classList.toggle("is-on", node === thumb);
      });
    });
  });

  if (reduce) {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-in");
    });
    return;
  }

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (node) {
      io.observe(node);
    });
  } else {
    reveals.forEach(function (node) {
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
      var suffix = el.querySelector("small");
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
  if (proof && "IntersectionObserver" in window) {
    var po = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        runCounters();
        po.disconnect();
      }
    }, { threshold: 0.25 });
    po.observe(proof);
  }

  var sticky = document.querySelector(".mobile-book");
  var hideOn = ["rates", "book", "rules", "faq"].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  if (sticky && hideOn.length && "IntersectionObserver" in window) {
    var visible = {};
    var paintSticky = function () {
      var on = Object.keys(visible).some(function (k) { return visible[k]; });
      if (on) sticky.setAttribute("hidden", "");
      else sticky.removeAttribute("hidden");
      document.body.classList.toggle("book-in-view", on);
    };
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      paintSticky();
    }, { threshold: 0, rootMargin: "0px 0px -70px 0px" });
    hideOn.forEach(function (el) { so.observe(el); });
  }
})();
