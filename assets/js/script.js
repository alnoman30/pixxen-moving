// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();



//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pixxen Moving js start
document.addEventListener('DOMContentLoaded', () => {
 
    const MAGNETIC_MAX_DISTANCE = 12; // px -- movement can never exceed this, however far the mouse goes
    const clamp = (value) => Math.max(-MAGNETIC_MAX_DISTANCE, Math.min(MAGNETIC_MAX_DISTANCE, value));
 
    // ---- grouped magnetic buttons: icon + text inside .moving-btn-cta move TOGETHER,
    // driven by one mousemove listener on the shared outer anchor, so they
    // never drift apart / overlap independently anymore.
    document.querySelectorAll('.moving-btn-cta').forEach((group) => {
        const magneticChildren = group.querySelectorAll('.moving-magnetic-btn');
 
        group.addEventListener('mousemove', (e) => {
            const rect = group.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
 
            magneticChildren.forEach((child) => {
                gsap.to(child, {
                    x: clamp(x * 0.15),
                    y: clamp(y * 0.15),
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });
        });
 
        group.addEventListener('mouseleave', () => {
            magneticChildren.forEach((child) => {
                gsap.to(child, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)',
                });
            });
        });
    });
 
    // ---- standalone magnetic buttons (e.g. See Pricing): unchanged, independent per-element ----
    document.querySelectorAll('.moving-magnetic-btn').forEach((btn) => {
        if (btn.closest('.moving-btn-cta')) return; // already handled by the group logic above
 
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
 
            gsap.to(btn, {
                x: clamp(x * 0.2),
                y: clamp(y * 0.2),
                duration: 0.4,
                ease: 'power3.out',
            });
        });
 
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)',
            });
        });
    });
});


// Moving banner section stagger
document.addEventListener("DOMContentLoaded", function () {
  // Set initial states first, so nothing "flashes" before animating
  gsap.set(".moving-banner-heading", { y: 40, opacity: 0, filter: "blur(3px)" });
  gsap.set(".moving-banner-img", { y: 60, opacity: 0, filter: "blur(6px)" });
  gsap.set(".moving-banner-desc", { y: 30, opacity: 0, filter: "blur(3px)" });
  gsap.set(".moving-banner-price", { y: 30, opacity: 0, filter: "blur(0px)" });
  gsap.set(".moving-banner-cta", { y: 20, opacity: 0, filter: "blur(0px)" });
  gsap.set(".moving-banner-tags", { y: 20, opacity: 0, filter: "blur(3px)" });
  gsap.set(".moving-banner-list-item", { x: -20, opacity: 0, filter: "blur(3px)" });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.55 },
  });

  // Heading and image start at the exact same time (label "start")
  tl.addLabel("start")
    .to(
      ".moving-banner-heading",
      { y: 0, opacity: 1, filter: "blur(0px)" },
      "start"
    )
    .to(
      ".moving-banner-img",
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
      "start"
    )
    .to(
      ".moving-banner-desc",
      { y: 0, opacity: 1, filter: "blur(0px)" },
      "-=0.4"
    )
    .to(
      ".moving-banner-price",
      { y: 0, opacity: 1 },
      "-=0.35"
    )
    .to(
      ".moving-banner-cta",
      { y: 0, opacity: 1 },
      "-=0.35"
    )
    .to(
      ".moving-banner-tags",
      { y: 0, opacity: 1, filter: "blur(0px)" },
      "-=0.35"
    )
    .to(
      ".moving-banner-list-item",
      { x: 0, opacity: 1, filter: "blur(0px)", stagger: 0.1, duration: 0.45 },
      "-=0.25"
    );
});

// Moving section heading splittext reveal
document.fonts.ready.then(() => {
  document.querySelectorAll(".moving-heading-reveal").forEach((el) => {

    // keep layout stable + let SplitText auto-handle resize/responsive re-splitting
    SplitText.create(el, {
      type: "words,lines",
      mask: "lines",              // clips each line so words rise out of a "letterbox" — the modern reveal look
      linesClass: "reveal-line",
      autoSplit: true,            // re-splits automatically on font load / resize
      onSplit: (self) => {
        return gsap.from(self.words, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.045,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            // markers: true, // uncomment while debugging
          },
        });
      },
    });

  });
});

// 
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".moving-counter-item");

  counters.forEach((counter) => {
    const rawVal =
      counter.getAttribute("data-value") || counter.textContent.trim();

    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";

    const cleanVal = rawVal.replace(/[^\d.]/g, "");
    const chars = cleanVal.split("");
    const isSingleDigit = cleanVal.replace(".", "").length === 1;

    counter.innerHTML = "";

    if (prefix) {
      const pSpan = document.createElement("span");
      pSpan.innerHTML = prefix;
      counter.appendChild(pSpan);
    }

    chars.forEach((char, index) => {
      if (char === ".") {
        const dot = document.createElement("span");
        dot.textContent = ".";
        counter.appendChild(dot);
        return;
      }

      const col = document.createElement("span");
      col.className = "moving-counter-digit-col";

      const list = document.createElement("span");
      list.className = "moving-counter-digit-list";

      const finalNum = parseInt(char, 10);

      // Standardize the roll: 0 through 9, ending with the specific finalNum
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, finalNum];

      numbers.forEach((num) => {
        const numSpan = document.createElement("span");
        numSpan.textContent = num;
        list.appendChild(numSpan);
      });

      col.appendChild(list);
      counter.appendChild(col);

      // Ensure first digit (index 0) starts cleanly from top
      let startY = 0; 

      if (index === 0) {
        startY = 0; 
      } else if (!isSingleDigit && index % 2 !== 0) {
        startY = 100;
      } else {
        startY = -100;
      }

      ScrollTrigger.create({
        trigger: counter,
        start: "top bottom",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            list,
            {
              yPercent: startY
            },
            {
              yPercent: -((numbers.length - 1) * (100 / numbers.length)),
              duration: 2.8,
              ease: "expo.out",
              delay: index * 0.1
            }
          );
        }
      });
    });

    if (suffix) {
      const sSpan = document.createElement("span");
      sSpan.innerHTML = suffix;
      counter.appendChild(sSpan);
    }
  });
});

// 
document.querySelectorAll('.moving-spacification').forEach(row => {
  const img = row.querySelector('img');
  const base = gsap.getProperty(img, "rotation"); // or set manually
  row.addEventListener('mouseenter', () => gsap.to(img, { rotation: -5, duration: 0.5, ease: "power2.out" }));
  row.addEventListener('mouseleave', () => gsap.to(img, { rotation: base, duration: 0.5, ease: "power2.out" }));
});


// moving Timeline js
document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".moving-stagger-wrap, .moving-stagger-mobile");

  wrappers.forEach((wrapper) => {
    const items = wrapper.querySelectorAll(".moving-stagger-item");

    const markers = wrapper.querySelectorAll(".moving-stagger-marker");
    const cards = wrapper.querySelectorAll(".moving-stagger-card");

    gsap.from(items, {
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });

    gsap.from(markers, {
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });
  });
});