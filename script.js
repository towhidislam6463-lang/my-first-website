/**
 * Catify — interactions, data, and motion
 */

(function () {
  "use strict";

  const PRODUCTS = [
    {
      id: "salmon-crunch",
      name: "Salmon Crunch",
      price: "$28",
      rating: 4.9,
      reviews: 612,
      desc: "Wild-inspired salmon with crunchy kibble texture—omega-rich for glossy coats and picky eaters who still want crunch.",
      image: "assets/img/product-salmon.jpg",
      fallback: "assets/img/product-salmon.svg",
    },
    {
      id: "chicken-delight",
      name: "Chicken Delight",
      price: "$26",
      rating: 4.8,
      reviews: 540,
      desc: "Farm-raised chicken as the first ingredient, balanced for everyday energy—comfort food energy, nutritionist-approved macros.",
      image: "assets/img/product-chicken.jpg",
      fallback: "assets/img/product-chicken.svg",
    },
    {
      id: "tuna-pro-mix",
      name: "Tuna Pro Mix",
      price: "$32",
      rating: 4.95,
      reviews: 423,
      desc: "Deep-sea tuna blend with added taurine support—built for active adults who treat the living room like a parkour course.",
      image: "assets/img/product-tuna.jpg",
      fallback: "assets/img/product-tuna.svg",
    },
    {
      id: "kitten-energy",
      name: "Kitten Energy Formula",
      price: "$30",
      rating: 4.9,
      reviews: 891,
      desc: "DHA-forward growth recipe with controlled minerals—tiny kibble, big fuel for the chaos era (weeks 8–12 and beyond).",
      image: "assets/img/product-kitten.jpg",
      fallback: "assets/img/product-kitten.svg",
    },
  ];

  const TESTIMONIALS = [
    {
      quote:
        "We tried three ‘premium’ brands. Catify is the first one where both cats show up early for breakfast instead of side-eyeing the bowl.",
      author: "Jordan M.",
      cat: "Luna & Bean",
      stars: 5,
    },
    {
      quote:
        "Salmon Crunch cleared up the dull-coat situation in a few weeks. Our vet noticed before we even brought it up.",
      author: "Priya S.",
      cat: "Miso",
      stars: 5,
    },
    {
      quote:
        "Kitten Energy was the only food our foster actually gained steady weight on—no digestive drama, just zoomies.",
      author: "Alex R.",
      cat: "Noodle",
      stars: 5,
    },
    {
      quote:
        "Subscription is stupidly easy to pause when we travel. The food quality doesn’t feel ‘startup-y’—it feels legit.",
      author: "Taylor K.",
      cat: "Goose",
      stars: 5,
    },
  ];

  const FAQ_ITEMS = [
    {
      q: "Is Catify suitable for cats with sensitive stomachs?",
      a: "Many parents choose our single-protein-forward recipes during transitions. For diagnosed sensitivities, always loop in your vet—we publish full ingredient decks so they can advise quickly.",
    },
    {
      q: "How do subscriptions and shipping work?",
      a: "Pick a cadence that matches your cat’s appetite, adjust portions anytime, and skip a month when life gets weird. Orders over $45 on Catify Club ship free in the contiguous U.S.",
    },
    {
      q: "Where is Catify made?",
      a: "We partner with FDA-registered facilities in the U.S. that meet our audit checklist. Lot codes on every bag tie back to ingredient sourcing notes we share with subscribers.",
    },
    {
      q: "Can I mix Catify with my cat’s current food?",
      a: "Yes—slow transitions (7–10 days) are the move. Our welcome guide includes a day-by-day chart so you can avoid the ‘new food surprise’ litter moment.",
    },
    {
      q: "Do you offer a money-back taste guarantee?",
      a: "Demo site disclaimer: on launch day we plan a first-bag happiness policy. For now, tell us your story via the contact form—we read everything.",
    },
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function stars(rating) {
    const r = Math.min(5, Math.max(0, Math.round(Number(rating))));
    return "★".repeat(r) + "☆".repeat(5 - r);
  }

  function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(
      (p) => `
      <article class="product-card" data-product="${p.id}">
        <div class="product-card__img-wrap">
          <img class="product-card__img" src="${p.image}" alt="${p.name} — Catify premium cat food" width="800" height="800" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${p.fallback}'">
        </div>
        <div class="product-card__body">
          <div class="product-card__top">
            <h3 class="product-card__name">${p.name}</h3>
            <span class="product-card__price">${p.price}</span>
          </div>
          <div class="product-card__rating">
            <span class="product-card__stars" aria-hidden="true">${stars(p.rating)}</span>
            <span>${p.rating} (${p.reviews} reviews)</span>
          </div>
          <p class="product-card__desc">${p.desc}</p>
          <button type="button" class="product-card__btn">Add to bowl</button>
        </div>
      </article>`
    ).join("");
  }

  function renderFaq() {
    const list = document.getElementById("faqList");
    if (!list) return;
    list.innerHTML = FAQ_ITEMS.map(
      (item, i) => `
      <div class="faq__item" data-faq-index="${i}">
        <button type="button" class="faq__trigger" id="faq-btn-${i}" aria-expanded="false" aria-controls="faq-panel-${i}">
          <span>${item.q}</span>
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}">
          <div class="faq__panel-inner">${item.a}</div>
        </div>
      </div>`
    ).join("");

    list.querySelectorAll(".faq__trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq__item");
        const panel = item.querySelector(".faq__panel");
        const inner = panel.querySelector(".faq__panel-inner");
        const open = item.classList.contains("is-open");

        list.querySelectorAll(".faq__item").forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const oBtn = other.querySelector(".faq__trigger");
            const oPanel = other.querySelector(".faq__panel");
            oBtn.setAttribute("aria-expanded", "false");
            oPanel.style.maxHeight = null;
          }
        });

        if (open) {
          item.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          panel.style.maxHeight = null;
        } else {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = inner.scrollHeight + "px";
        }
      });
    });
  }

  let reviewIndex = 0;
  let reviewTimer = null;

  function renderTestimonials() {
    const track = document.getElementById("reviewTrack");
    const dots = document.getElementById("reviewDots");
    if (!track || !dots) return;

    track.innerHTML = TESTIMONIALS.map(
      (t, i) => `
      <div class="review-slide${i === 0 ? " is-active" : ""}" data-review="${i}" ${i === 0 ? "" : 'hidden'}>
        <div class="review-slide__stars" aria-hidden="true">${"★".repeat(t.stars)}</div>
        <p class="review-slide__quote">“${t.quote}”</p>
        <p class="review-slide__meta"><strong>${t.author}</strong> · parent of ${t.cat}</p>
      </div>`
    ).join("");

    dots.innerHTML = TESTIMONIALS.map(
      (_, i) =>
        `<button type="button" class="reviews__dot${i === 0 ? " is-active" : ""}" data-dot="${i}" aria-label="Show testimonial ${i + 1}" ${i === 0 ? 'aria-current="true"' : ""}></button>`
    ).join("");

    function showReview(i) {
      reviewIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
      track.querySelectorAll(".review-slide").forEach((el, idx) => {
        const on = idx === reviewIndex;
        el.classList.toggle("is-active", on);
        el.toggleAttribute("hidden", !on);
      });
      dots.querySelectorAll(".reviews__dot").forEach((d, idx) => {
        d.classList.toggle("is-active", idx === reviewIndex);
        d.toggleAttribute("aria-current", idx === reviewIndex);
      });
    }

    function resetTimer() {
      if (reviewTimer) clearInterval(reviewTimer);
      if (!prefersReducedMotion) {
        reviewTimer = setInterval(() => showReview(reviewIndex + 1), 6000);
      }
    }

    document.getElementById("reviewPrev")?.addEventListener("click", () => {
      showReview(reviewIndex - 1);
      resetTimer();
    });
    document.getElementById("reviewNext")?.addEventListener("click", () => {
      showReview(reviewIndex + 1);
      resetTimer();
    });

    dots.querySelectorAll(".reviews__dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        showReview(Number(dot.dataset.dot));
        resetTimer();
      });
    });

    resetTimer();
  }

  function animateCounter(el) {
    const target = Number(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const duration = prefersReducedMotion ? 0 : 1600;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    }

    if (duration === 0) {
      el.textContent = target + suffix;
    } else {
      requestAnimationFrame(frame);
    }
  }

  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => obs.observe(c));
  }

  function initParallax() {
    if (prefersReducedMotion) return;
    const layers = document.querySelectorAll("[data-parallax], [data-parallax-slow]");
    if (!layers.length) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        layers.forEach((el) => {
          const slow = el.hasAttribute("data-parallax-slow");
          const factor = slow ? 0.04 : 0.08;
          const offset = Math.round(y * factor);
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initHeader() {
    const header = document.getElementById("header");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.querySelector(".nav");
    const menu = document.getElementById("navMenu");
    if (!toggle || !nav || !menu) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function setThemeColor(isLight) {
    const meta = document.getElementById("themeColorMeta");
    if (meta) meta.setAttribute("content", isLight ? "#faf8f5" : "#0a0a0b");
  }

  function initTheme() {
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");
    const stored = localStorage.getItem("catify-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (stored === "light" || (!stored && prefersLight)) {
      root.setAttribute("data-theme", "light");
      setThemeColor(true);
    } else {
      root.setAttribute("data-theme", "dark");
      setThemeColor(false);
    }

    btn?.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("catify-theme", next);
      setThemeColor(next === "light");
    });
  }

  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    document.body.classList.add("is-loading");

    let done = false;
    function hideLoader() {
      if (done) return;
      done = true;
      loader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
    }

    const delay = prefersReducedMotion ? 80 : 550;
    function scheduleHide() {
      setTimeout(hideLoader, delay);
    }

    /* Do not wait for window "load" — blocked/slow remote images/fonts can leave the screen covered forever */
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", scheduleHide, { once: true });
    } else {
      scheduleHide();
    }

    setTimeout(hideLoader, 3200);
  }

  function initForm() {
    const form = document.getElementById("contactForm");
    const note = document.getElementById("formNote");
    if (!form || !note) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      note.textContent = "Thanks — we’ve logged your message. (Demo: no email was sent.)";
      note.classList.add("is-success");
      form.reset();
    });
  }

  function initYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initProductButtons() {
    document.getElementById("productGrid")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".product-card__btn");
      if (!btn) return;
      const card = btn.closest(".product-card");
      if (!card) return;
      btn.textContent = "Added ✓";
      setTimeout(() => {
        btn.textContent = "Add to bowl";
      }, 2000);
    });
  }

  renderProducts();
  renderFaq();
  renderTestimonials();
  initCounters();
  initParallax();
  initHeader();
  initNav();
  initTheme();
  initLoader();
  initForm();
  initYear();
  initProductButtons();
})();
