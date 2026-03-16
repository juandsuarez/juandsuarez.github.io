document.addEventListener("DOMContentLoaded", () => {
  const projectsData = {
    "ryan-castro": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop",
        title: "Ryan Castro — Escenario principal"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1800&auto=format&fit=crop",
        title: "Ryan Castro — Iluminación"
      },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Ryan Castro — Video referencia"
      }
    ],
    "adidas-picnic": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1800&auto=format&fit=crop",
        title: "Adidas Estéreo Picnic — Activación"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1800&auto=format&fit=crop",
        title: "Adidas Estéreo Picnic — Stand"
      },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Adidas Estéreo Picnic — Video referencia"
      }
    ],
    "toyota-urban": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1800&auto=format&fit=crop",
        title: "Toyota Urban Fest — Producción"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1800&auto=format&fit=crop",
        title: "Toyota Urban Fest — Luces"
      }
    ],
    "movistar-arena": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1800&auto=format&fit=crop",
        title: "Movistar Arena — Escenario"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1800&auto=format&fit=crop",
        title: "Movistar Arena — Montaje"
      }
    ],
    "corferias": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1800&auto=format&fit=crop",
        title: "Corferias — Stand para marca"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1800&auto=format&fit=crop",
        title: "Corferias — Estructura"
      }
    ],
    "ecopetrol": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517502166878-35c93a0072f0?q=80&w=1800&auto=format&fit=crop",
        title: "Ecopetrol — Corporativo"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop",
        title: "Ecopetrol — Área operativa"
      }
    ],
    "banco-bogota": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop",
        title: "Banco de Bogotá — Montaje"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop",
        title: "Banco de Bogotá — Mobiliario"
      }
    ],
    "vive-claro": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1800&auto=format&fit=crop",
        title: "Vive Claro — Evento"
      },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Vive Claro — Video referencia"
      }
    ],
    "coliseo": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1800&auto=format&fit=crop",
        title: "Coliseo — Graderías"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1800&auto=format&fit=crop",
        title: "Coliseo — Producción"
      }
    ],
    "festival-ciudad": [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1800&auto=format&fit=crop",
        title: "Festival Ciudad — Escenario"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop",
        title: "Festival Ciudad — Montaje"
      },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Festival Ciudad — Video referencia"
      }
    ]
  };

  const projectTriggers = document.querySelectorAll(".project-trigger");
  const lightbox = document.getElementById("projectLightbox");
  const lightboxMedia = document.getElementById("projectLightboxMedia");
  const lightboxCaption = document.getElementById("projectLightboxCaption");
  const lightboxClose = document.getElementById("projectLightboxClose");
  const lightboxPrev = document.getElementById("projectLightboxPrev");
  const lightboxNext = document.getElementById("projectLightboxNext");
  const lightboxBackdrop = document.getElementById("projectLightboxBackdrop");
  const lightboxContent = document.getElementById("projectLightboxContent");

  let currentGallery = [];
  let currentIndex = 0;
  let isOpen = false;

  function renderCurrent(direction = "") {
    if (!currentGallery.length) return;

    const item = currentGallery[currentIndex];
    lightboxMedia.classList.remove("slide-next-in", "slide-prev-in", "dragging");
    void lightboxMedia.offsetWidth;

    if (direction === "next") lightboxMedia.classList.add("slide-next-in");
    if (direction === "prev") lightboxMedia.classList.add("slide-prev-in");

    lightboxMedia.innerHTML = "";

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title || "Proyecto";
      img.draggable = false;
      lightboxMedia.appendChild(img);
    }

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      lightboxMedia.appendChild(video);
    }

    lightboxCaption.textContent = item.title || "";
  }

  function openProject(projectKey) {
    currentGallery = projectsData[projectKey] || [];
    currentIndex = 0;
    renderCurrent();
    lightbox.classList.add("is-visible");
    document.body.style.overflow = "hidden";
    isOpen = true;
  }

  function closeProject() {
    lightbox.classList.remove("is-visible");
    lightboxMedia.innerHTML = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
    isOpen = false;
  }

  function nextProjectMedia() {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    renderCurrent("next");
  }

  function prevProjectMedia() {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    renderCurrent("prev");
  }

  projectTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.project;
      openProject(key);
    });
  });

  lightboxClose?.addEventListener("click", closeProject);
  lightboxBackdrop?.addEventListener("click", closeProject);
  lightboxNext?.addEventListener("click", nextProjectMedia);
  lightboxPrev?.addEventListener("click", prevProjectMedia);

  window.addEventListener("keydown", (e) => {
    if (!isOpen) return;

    if (e.key === "Escape") closeProject();
    if (e.key === "ArrowRight") nextProjectMedia();
    if (e.key === "ArrowLeft") prevProjectMedia();
  });

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  const threshold = 50;

  function dragStart(x) {
    if (!isOpen) return;
    isDragging = true;
    startX = x;
    currentX = x;
    lightboxMedia.classList.add("dragging");
  }

  function dragMove(x) {
    if (!isDragging || !isOpen) return;
    currentX = x;
    const deltaX = currentX - startX;
    lightboxMedia.style.transform = `translateX(${deltaX}px)`;
  }

  function dragEnd() {
    if (!isDragging || !isOpen) return;

    const deltaX = currentX - startX;
    lightboxMedia.style.transform = "";
    lightboxMedia.classList.remove("dragging");

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        nextProjectMedia();
      } else {
        prevProjectMedia();
      }
    }

    isDragging = false;
    startX = 0;
    currentX = 0;
  }

  lightboxContent?.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) dragStart(e.touches[0].clientX);
  }, { passive: true });

  lightboxContent?.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) dragMove(e.touches[0].clientX);
  }, { passive: true });

  lightboxContent?.addEventListener("touchend", dragEnd);

  lightboxContent?.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragStart(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    dragMove(e.clientX);
  });

  window.addEventListener("mouseup", dragEnd);
});