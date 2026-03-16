document.addEventListener("DOMContentLoaded", () => {
  /* ================================
     SERVICIOS PRINCIPALES
  ================================= */
  const mainTabs = document.querySelectorAll(".main-service-tab");
  const mainPanels = document.querySelectorAll(".main-service-panel");

  mainTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const service = tab.dataset.service;

      mainTabs.forEach((t) => t.classList.remove("active"));
      mainPanels.forEach((p) => p.classList.remove("is-open"));

      tab.classList.add("active");

      const panel = document.getElementById(`service-${service}`);
      if (panel) panel.classList.add("is-open");
    });
  });

  /* ================================
     SUBSERVICIOS
  ================================= */
  const subTabs = document.querySelectorAll(".subservice-tab");

  subTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const parent = tab.dataset.parent;
      const sub = tab.dataset.sub;

      const tabs = document.querySelectorAll(
        `.subservice-tab[data-parent="${parent}"]`
      );
      const panels = document.querySelectorAll(
        `.subservice-panel[id^="${parent}-"]`
      );

      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("is-open"));

      tab.classList.add("active");

      const panel = document.getElementById(`${parent}-${sub}`);
      if (panel) panel.classList.add("is-open");
    });
  });

  /* ================================
     LIGHTBOX
  ================================= */
  const lightbox = document.getElementById("lightbox");
  const mediaWrap = document.getElementById("lightboxMediaWrap");
  const caption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  const backdrop = document.getElementById("lightboxBackdrop");
  const lightboxContent = document.getElementById("lightboxContent");

  let gallery = [];
  let currentIndex = 0;
  let isLightboxOpen = false;

  function getVisiblePanel(trigger) {
    return (
      trigger.closest(".subservice-panel.is-open") ||
      trigger.closest(".main-service-panel.is-open")
    );
  }

  function buildGalleryFromTrigger(trigger) {
    const panel = getVisiblePanel(trigger);
    if (!panel) return [];

    return Array.from(panel.querySelectorAll(".lightbox-trigger"));
  }

  function renderCurrentMedia(direction = "") {
    if (!gallery.length || !mediaWrap) return;

    const item = gallery[currentIndex];
    const type = item.dataset.type;
    const src = item.dataset.src;
    const title = item.dataset.title || "";

    mediaWrap.classList.remove("slide-next-in", "slide-prev-in", "dragging");

    void mediaWrap.offsetWidth;

    if (direction === "next") {
      mediaWrap.classList.add("slide-next-in");
    } else if (direction === "prev") {
      mediaWrap.classList.add("slide-prev-in");
    }

    mediaWrap.innerHTML = "";

    if (type === "image") {
      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.draggable = false;
      mediaWrap.appendChild(img);
    } else if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      mediaWrap.appendChild(video);
    }

    if (caption) caption.textContent = title;
  }

  function openLightbox(trigger) {
    gallery = buildGalleryFromTrigger(trigger);
    currentIndex = gallery.indexOf(trigger);

    if (currentIndex < 0) currentIndex = 0;

    renderCurrentMedia();

    if (lightbox) {
      lightbox.classList.add("is-visible");
      isLightboxOpen = true;
    }

    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("is-visible");
    isLightboxOpen = false;
    gallery = [];
    currentIndex = 0;

    if (mediaWrap) mediaWrap.innerHTML = "";
    if (caption) caption.textContent = "";

    document.body.style.overflow = "";
  }

  function nextMedia() {
    if (!gallery.length) return;
    currentIndex = (currentIndex + 1) % gallery.length;
    renderCurrentMedia("next");
  }

  function prevMedia() {
    if (!gallery.length) return;
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    renderCurrentMedia("prev");
  }

  document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(trigger);
    });
  });

  if (nextBtn) nextBtn.addEventListener("click", nextMedia);
  if (prevBtn) prevBtn.addEventListener("click", prevMedia);
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (!isLightboxOpen) return;

    if (e.key === "ArrowRight") nextMedia();
    if (e.key === "ArrowLeft") prevMedia();
    if (e.key === "Escape") closeLightbox();
  });

  /* ================================
     SWIPE TOUCH + DRAG MOUSE
  ================================= */
  let startX = 0;
  let currentX = 0;
  let isPointerDown = false;
  let hasMoved = false;
  const threshold = 50;

  function pointerStart(x) {
    if (!isLightboxOpen) return;
    isPointerDown = true;
    hasMoved = false;
    startX = x;
    currentX = x;
    if (mediaWrap) mediaWrap.classList.add("dragging");
  }

  function pointerMove(x) {
    if (!isPointerDown || !isLightboxOpen) return;
    currentX = x;

    const deltaX = currentX - startX;
    if (Math.abs(deltaX) > 6) hasMoved = true;

    if (mediaWrap) {
      mediaWrap.style.transform = `translateX(${deltaX}px)`;
    }
  }

  function pointerEnd() {
    if (!isPointerDown || !isLightboxOpen) return;

    const deltaX = currentX - startX;

    if (mediaWrap) {
      mediaWrap.style.transform = "";
      mediaWrap.classList.remove("dragging");
    }

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        nextMedia();
      } else {
        prevMedia();
      }
    }

    isPointerDown = false;
    hasMoved = false;
    startX = 0;
    currentX = 0;
  }

  if (lightboxContent) {
    lightboxContent.addEventListener(
      "touchstart",
      (e) => {
        if (!isLightboxOpen || e.touches.length !== 1) return;
        pointerStart(e.touches[0].clientX);
      },
      { passive: true }
    );

    lightboxContent.addEventListener(
      "touchmove",
      (e) => {
        if (!isLightboxOpen || e.touches.length !== 1) return;
        pointerMove(e.touches[0].clientX);
      },
      { passive: true }
    );

    lightboxContent.addEventListener("touchend", () => {
      pointerEnd();
    });

    lightboxContent.addEventListener("mousedown", (e) => {
      if (!isLightboxOpen) return;
      e.preventDefault();
      pointerStart(e.clientX);
    });
  }

  window.addEventListener("mousemove", (e) => {
    if (!isLightboxOpen) return;
    pointerMove(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    if (!isLightboxOpen) return;
    pointerEnd();
  });

  window.addEventListener("mouseleave", () => {
    if (!isLightboxOpen) return;
    if (isPointerDown) pointerEnd();
  });
});