const mainServiceTabs = document.querySelectorAll(".main-service-tab");
const mainServicePanels = document.querySelectorAll(".main-service-panel");
const subserviceTabs = document.querySelectorAll(".subservice-tab");

/* Servicios principales */
if (mainServiceTabs.length && mainServicePanels.length) {
  mainServiceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetService = tab.dataset.service;

      mainServiceTabs.forEach((item) => item.classList.remove("active"));
      mainServicePanels.forEach((panel) => panel.classList.remove("is-open"));

      tab.classList.add("active");
      document.getElementById(`service-${targetService}`)?.classList.add("is-open");

      window.scrollTo({
        top: tab.closest(".services-page-section").offsetTop - 80,
        behavior: "smooth"
      });
    });
  });
}

/* Subservicios */
if (subserviceTabs.length) {
  subserviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const parent = tab.dataset.parent;
      const sub = tab.dataset.sub;

      document
        .querySelectorAll(`.subservice-tab[data-parent="${parent}"]`)
        .forEach((item) => item.classList.remove("active"));

      document
        .querySelectorAll(`.subservice-panel[id^="${parent}-"]`)
        .forEach((panel) => panel.classList.remove("is-open"));

      tab.classList.add("active");
      document.getElementById(`${parent}-${sub}`)?.classList.add("is-open");
    });
  });
}

/* LIGHTBOX PREMIUM */
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxMediaWrap = document.getElementById("lightboxMediaWrap");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxContent = document.getElementById("lightboxContent");

let currentGallery = [];
let currentIndex = 0;

function getVisibleGalleryItems(clickedItem) {
  const visiblePanel =
    clickedItem.closest(".subservice-panel.is-open") ||
    clickedItem.closest(".main-service-panel.is-open");

  if (!visiblePanel) return [];

  return Array.from(visiblePanel.querySelectorAll(".lightbox-trigger"));
}

function renderLightboxItem(index) {
  if (!currentGallery.length) return;

  const item = currentGallery[index];
  const type = item.dataset.type;
  const src = item.dataset.src;
  const title = item.dataset.title || "";

  lightboxMediaWrap.innerHTML = "";

  if (type === "image") {
    const img = document.createElement("img");
    img.src = src;
    img.alt = title || "Imagen ampliada";
    lightboxMediaWrap.appendChild(img);
  }

  if (type === "video") {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    lightboxMediaWrap.appendChild(video);
  }

  lightboxCaption.textContent = title;
  currentIndex = index;
}

function openLightboxFromItem(item) {
  currentGallery = getVisibleGalleryItems(item);
  currentIndex = currentGallery.indexOf(item);

  if (currentIndex < 0) currentIndex = 0;

  renderLightboxItem(currentIndex);
  lightbox.classList.add("is-visible");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-visible");
  lightboxMediaWrap.innerHTML = "";
  lightboxCaption.textContent = "";
  document.body.style.overflow = "";
}

function showNextItem() {
  if (!currentGallery.length) return;
  const nextIndex = (currentIndex + 1) % currentGallery.length;
  renderLightboxItem(nextIndex);
}

function showPrevItem() {
  if (!currentGallery.length) return;
  const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  renderLightboxItem(prevIndex);
}

document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openLightboxFromItem(trigger);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxBackdrop?.addEventListener("click", closeLightbox);
lightboxNext?.addEventListener("click", showNextItem);
lightboxPrev?.addEventListener("click", showPrevItem);

window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-visible")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNextItem();
  if (e.key === "ArrowLeft") showPrevItem();
});

/* Swipe touch + drag mouse */
let startX = 0;
let currentX = 0;
let isDragging = false;
const swipeThreshold = 60;

function dragStart(x) {
  startX = x;
  currentX = x;
  isDragging = true;
  lightboxMediaWrap.classList.add("dragging");
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
      showNextItem();
    } else {
      showPrevItem();
    }
  }

  isDragging = false;
  lightboxMediaWrap.classList.remove("dragging");
}

lightboxContent?.addEventListener("touchstart", (e) => {
  if (!lightbox.classList.contains("is-visible")) return;
  if (e.touches.length === 1) dragStart(e.touches[0].clientX);
}, { passive: true });

lightboxContent?.addEventListener("touchmove", (e) => {
  if (!lightbox.classList.contains("is-visible")) return;
  if (e.touches.length === 1) dragMove(e.touches[0].clientX);
}, { passive: true });

lightboxContent?.addEventListener("touchend", () => {
  if (!lightbox.classList.contains("is-visible")) return;
  dragEnd();
});

lightboxContent?.addEventListener("mousedown", (e) => {
  if (!lightbox.classList.contains("is-visible")) return;
  dragStart(e.clientX);
});

window.addEventListener("mousemove", (e) => {
  if (!lightbox.classList.contains("is-visible")) return;
  dragMove(e.clientX);
});

window.addEventListener("mouseup", () => {
  if (!lightbox.classList.contains("is-visible")) return;
  dragEnd();
});