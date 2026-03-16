document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const header = document.getElementById("header");

  /* ===============================
     MENU MOBILE
  ============================== */
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuBtn.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.classList.remove("active");
      });
    });
  }

  /* ===============================
     HEADER: NEGRO AL ENTRAR / BLUR EN SCROLL
  ============================== */
  function updateHeaderOnScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);

  /* ===============================
     REVEAL
  ============================== */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach((el, index) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const visiblePoint = 120;

      if (elementTop < windowHeight - visiblePoint) {
        setTimeout(() => {
          el.classList.add("active");
        }, index * 60);
      }
    });
  }

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  /* ===============================
     HERO SLIDER INDEX
  ============================== */
  const heroSlider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  let currentSlide = 0;
  let sliderInterval = null;

  if (heroSlider && slides.length) {
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function stopSlider() {
      if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
      }
    }

    function startSlider() {
      stopSlider();
      sliderInterval = setInterval(nextSlide, 5500);
    }

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      startSlider();
    });

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      startSlider();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.slide);
        showSlide(index);
        startSlider();
      });
    });

    /* SWIPE / DRAG HERO */
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    const swipeThreshold = 60;

    function dragStart(x) {
      startX = x;
      currentX = x;
      isDragging = true;
      stopSlider();
    }

    function dragMove(x) {
      if (!isDragging) return;
      currentX = x;
    }

    function dragEnd() {
      if (!isDragging) return;

      const diffX = currentX - startX;

      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      isDragging = false;
      startSlider();
    }

    heroSlider.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          dragStart(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    heroSlider.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length === 1) {
          dragMove(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    heroSlider.addEventListener("touchend", dragEnd);

    heroSlider.addEventListener("mousedown", (e) => {
      e.preventDefault();
      dragStart(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      dragMove(e.clientX);
    });

    window.addEventListener("mouseup", dragEnd);

    heroSlider.addEventListener("mouseleave", () => {
      if (isDragging) dragEnd();
    });

    heroSlider.querySelectorAll("img").forEach((img) => {
      img.setAttribute("draggable", "false");
    });

    startSlider();
  }

  /* ===============================
     WHATSAPP PREMIUM FLOAT
  ============================== */
  const waBtn = document.getElementById("waFloatingBtn");
  const waCard = document.getElementById("waChatCard");
  const waClose = document.getElementById("waChatClose");
  const waChatBtn = document.getElementById("waChatBtn");

  if (waBtn && waCard && waClose && waChatBtn) {
    const page = window.location.pathname.split("/").pop() || "index.html";

    const messages = {
      "index.html": "Hola RW Producciones, quiero cotizar un evento.",
      "sobre-nosotros.html": "Hola RW Producciones, vi su página y quiero más información sobre la empresa.",
      "servicios.html": "Hola RW Producciones, quiero información sobre sus servicios para un evento.",
      "proyectos.html": "Hola RW Producciones, vi sus proyectos y quiero cotizar algo similar.",
      "contacto.html": "Hola RW Producciones, quiero comunicarme con ustedes."
    };

    const message =
      messages[page] ||
      "Hola RW Producciones, quiero información sobre sus servicios.";

    const waUrl = `https://wa.me/573194605024?text=${encodeURIComponent(message)}`;

    waBtn.href = waUrl;
    waChatBtn.href = waUrl;

    const storageKey = `waCardClosed_${page}`;

    function showCard() {
      if (sessionStorage.getItem(storageKey) === "true") return;
      waCard.classList.add("show");
    }

    function hideCard() {
      waCard.classList.remove("show");
      sessionStorage.setItem(storageKey, "true");
    }

    /* SOLO EN DESKTOP */
    if (window.innerWidth > 768) {
      setTimeout(showCard, 7000);
    }

    waClose.addEventListener("click", hideCard);

    waBtn.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        waCard.classList.add("show");
      }
    });

    waBtn.addEventListener("mouseleave", () => {
      if (
        window.innerWidth > 768 &&
        sessionStorage.getItem(storageKey) === "true"
      ) {
        waCard.classList.remove("show");
      }
    });
  }
});