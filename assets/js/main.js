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
  sliderInterval = setInterval(nextSlide, 5500);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

if (slides.length > 0) {
  startSlider();

  nextBtn?.addEventListener("click", () => {
    stopSlider();
    nextSlide();
    startSlider();
  });

  prevBtn?.addEventListener("click", () => {
    stopSlider();
    prevSlide();
    startSlider();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      stopSlider();
      const index = Number(dot.dataset.slide);
      showSlide(index);
      startSlider();
    });
  });
}