const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.classList.remove("active");
    });
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

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

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* HERO SLIDER */
const heroSlider = document.querySelector(".hero-slider");
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

let currentSlide = 0;
let sliderInterval;

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

function startSlider() {
  stopSlider();
  sliderInterval = setInterval(nextSlide, 5500);
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }
}

if (slides.length > 0) {
  startSlider();

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startSlider();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    startSlider();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slide);
      showSlide(index);
      startSlider();
    });
  });

  /* SWIPE / DRAG */
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let hasMoved = false;
  const swipeThreshold = 60;

  function onDragStart(clientX) {
    startX = clientX;
    currentX = clientX;
    isDragging = true;
    hasMoved = false;
    stopSlider();
  }

  function onDragMove(clientX) {
    if (!isDragging) return;
    currentX = clientX;
    if (Math.abs(currentX - startX) > 8) {
      hasMoved = true;
    }
  }

  function onDragEnd() {
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
    hasMoved = false;
    startSlider();
  }

  /* Touch */
  heroSlider?.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      onDragStart(e.touches[0].clientX);
    }
  }, { passive: true });

  heroSlider?.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      onDragMove(e.touches[0].clientX);
    }
  }, { passive: true });

  heroSlider?.addEventListener("touchend", () => {
    onDragEnd();
  });

  /* Mouse */
  heroSlider?.addEventListener("mousedown", (e) => {
    onDragStart(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    onDragMove(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    onDragEnd();
  });

  heroSlider?.addEventListener("mouseleave", () => {
    if (isDragging) {
      onDragEnd();
    }
  });

  /* Evita arrastrar imágenes del navegador */
  heroSlider?.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
  });
}
