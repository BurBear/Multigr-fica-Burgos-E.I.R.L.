document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("inicio");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = Array.from(document.querySelectorAll(".main-nav a[href^='#']"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setNavbar = () => {
    if (!navbar || !hero) return;
    navbar.classList.toggle("navbar-solid", window.scrollY > hero.offsetHeight - 80);
  };

  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.remove("is-open");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  };

  const openMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.add("is-open");
    mainNav.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
  };

  const toggleMenu = () => {
    const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  setNavbar();
  window.addEventListener("scroll", setNavbar, { passive: true });
  menuToggle?.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      closeMenu();
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  const observedSections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-42% 0px -50% 0px", threshold: 0 });

    observedSections.forEach(section => activeObserver.observe(section));
  }

  const brandSection = document.querySelector(".js-brand-reveal");
  const scrollCards = Array.from(document.querySelectorAll(".js-scroll-card"));

  if ("IntersectionObserver" in window && (brandSection || scrollCards.length)) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.22 });

    if (brandSection) revealObserver.observe(brandSection);
    scrollCards.forEach(card => revealObserver.observe(card));
  } else {
    if (brandSection) brandSection.classList.add("is-visible");
    scrollCards.forEach(card => card.classList.add("is-visible"));
  }

  const orbitalPanel = document.getElementById("storyPanel");
  const orbitalLine = document.getElementById("orbitLine");
  const orbitalNodes = Array.from(document.querySelectorAll("#porque-mb .orbit-node"));
  const orbitalSection = document.getElementById("porque-mb");

  const orbitalStories = [
    {
      number: "01",
      kicker: "Control previo",
      title: "Archivo listo para producir.",
      text: "Antes de entrar a producción, revisamos que el diseño tenga condiciones adecuadas para impresión. Este paso ayuda a prevenir errores que suelen aparecer cuando el archivo ya está impreso.",
      points: [
        "Revisión de tamaño, orientación y proporciones del arte.",
        "Validación visual de resolución, sangrado y márgenes de seguridad.",
        "Observaciones claras cuando el archivo necesita corrección antes de producir."
      ]
    },
    {
      number: "02",
      kicker: "Decisión visual",
      title: "Color y material con criterio.",
      text: "Un buen resultado no depende solo del diseño. También influye el tipo de papel, el acabado y la forma en que el color se comporta sobre cada material.",
      points: [
        "Orientación según uso: corporativo, publicitario, institucional o comercial.",
        "Selección de papel, gramaje y acabado según presentación esperada.",
        "Criterio visual para que la pieza tenga mejor lectura y presencia."
      ]
    },
    {
      number: "03",
      kicker: "Flujo completo",
      title: "Producción gráfica integral.",
      text: "Centralizamos varias etapas del trabajo gráfico para que el pedido avance con mayor orden: impresión, corte, doblez, encolado, plastificado o encuadernado según corresponda.",
      points: [
        "Coordinación de impresión y acabados en un mismo flujo de trabajo.",
        "Menos dependencia de procesos dispersos o proveedores innecesarios.",
        "Mayor control sobre la presentación final del producto."
      ]
    },
    {
      number: "04",
      kicker: "Resultado final",
      title: "Entrega lista para presentar.",
      text: "La forma en que se entrega un material también influye en cómo se percibe la marca. Por eso cuidamos la limpieza, el orden y la presentación final del pedido.",
      points: [
        "Material organizado para entregar, distribuir o presentar.",
        "Cuidado en cortes, dobleces, uniones y terminaciones visibles.",
        "Presentación final pensada para empresas, instituciones y campañas."
      ]
    }
  ];

  const orbitalLinePositions = [
    { left: "50%", top: "23%", rotate: "-90deg" },
    { left: "68%", top: "50%", rotate: "0deg" },
    { left: "50%", top: "79%", rotate: "90deg" },
    { left: "32%", top: "50%", rotate: "180deg" }
  ];

  let activeOrbitalIndex = 0;
  let orbitalLineTimer;

  const applyOrbitalLinePosition = lineConfig => {
    orbitalLine.style.left = lineConfig.left;
    orbitalLine.style.top = lineConfig.top;
    orbitalLine.style.transform = `translate(-50%, -50%) rotate(${lineConfig.rotate})`;
  };

  const updateOrbitalLine = (index, animate = true) => {
    const lineConfig = orbitalLinePositions[index];
    if (!orbitalLine || !lineConfig) return;

    if (!animate || reduceMotion) {
      applyOrbitalLinePosition(lineConfig);
      return;
    }

    window.clearTimeout(orbitalLineTimer);
    orbitalLine.classList.add("is-switching");
    orbitalLineTimer = window.setTimeout(() => {
      applyOrbitalLinePosition(lineConfig);
      window.requestAnimationFrame(() => {
        orbitalLine.classList.remove("is-switching");
      });
    }, 120);
  };

  const renderOrbitalStory = index => {
    const story = orbitalStories[index];
    if (!orbitalPanel || !story) return;
    const shouldAnimateLine = orbitalPanel.innerHTML.trim() !== "" && index !== activeOrbitalIndex;

    orbitalNodes.forEach(node => {
      const isActive = Number(node.dataset.index) === index;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    updateOrbitalLine(index, shouldAnimateLine);
    activeOrbitalIndex = index;

    orbitalPanel.innerHTML = `
      <div class="story-content">
        <div class="story-number">${story.number}</div>
        <div class="story-kicker">${story.kicker}</div>
        <h3 class="story-title">${story.title}</h3>
        <p class="story-text">${story.text}</p>
        <ul class="story-points">
          ${story.points.map(point => `<li>${point}</li>`).join("")}
        </ul>
      </div>
    `;
  };

  if (orbitalPanel && orbitalNodes.length) {
    orbitalNodes.forEach(node => {
      node.addEventListener("click", () => {
        renderOrbitalStory(Number(node.dataset.index));
      });
    });

    renderOrbitalStory(0);
  }

  if (orbitalSection && !reduceMotion) {
    orbitalSection.classList.add("orbital-animate-ready");

    if ("IntersectionObserver" in window) {
      const orbitalObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-orbital-visible");
          orbitalObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -24% 0px", threshold: 0.18 });

      orbitalObserver.observe(orbitalSection);
    } else {
      orbitalSection.classList.add("is-orbital-visible");
    }
  } else if (orbitalSection) {
    orbitalSection.classList.add("is-orbital-visible");
  }

  const initProductosBento = () => {
    const section = document.getElementById("productos");
    const modal = document.getElementById("productModal");
    if (!section || !modal) return;

    const tiles = Array.from(section.querySelectorAll(".product-bento-tile"));
    const stage = modal.querySelector(".product-carousel-stage");
    const dotsWrap = modal.querySelector(".product-carousel-dots");
    const prevButton = modal.querySelector(".product-carousel-prev");
    const nextButton = modal.querySelector(".product-carousel-next");
    const closeButton = modal.querySelector(".product-modal-close");
    const title = modal.querySelector("#productModalTitle");
    const materials = modal.querySelector("[data-product-detail='materials']");
    const sizes = modal.querySelector("[data-product-detail='sizes']");
    const finishes = modal.querySelector("[data-product-detail='finishes']");
    let currentProduct = 0;
    let currentSlide = 0;
    let lastFocusedTile = null;

    const products = [
      {
        name: "Agendas escolares",
        slug: "agendas-escolares",
        materials: "Tapas en cartón forrado en couche plastificado; interiores en papel bond.",
        sizes: "A5, 1/2 carta, A4 y medidas personalizadas según institución.",
        finishes: "Interiores de 75 g a 90 g. Tapas de 250 g a 350 g. Opcional con espiral, tapa dura o plastificado mate/brillante."
      },
      {
        name: "Agendas corporativas",
        slug: "agendas-corporativas",
        materials: "Tapas en couché, cartón forrado o cuerina; interiores en bond o papel ahuesado.",
        sizes: "A5, 17 x 24 cm, 21 x 27 cm y formatos personalizados.",
        finishes: "Interiores de 90 g a 120 g. Tapas de 250 g a 350 g o tapa dura."
      },
      {
        name: "Libros y memorias",
        slug: "libros-memorias",
        materials: "Portada en couché o foldcote; interiores en bond o couché según el proyecto.",
        sizes: "A5, 17 x 24 cm, A4 y otras medidas editoriales.",
        finishes: "Interiores de 75 g a 150 g. Portadas de 250 g a 350 g. Encuadernado hot melt, cosido o engrapado."
      },
      {
        name: "Folder corporativo",
        slug: "folder-corporativo",
        materials: "Foldcote o couché de alto cuerpo.",
        sizes: "Formato A4, oficio y medidas especiales con bolsillo o ranura para tarjeta.",
        finishes: "Gramajes de 250 g a 350 g. Acabados con plastificado, barniz UV y troquel."
      },
      {
        name: "Revistas y periódicos",
        slug: "revistas-periodicos",
        materials: "Portadas en couché; interiores en couché, bond o papel periódico.",
        sizes: "A4, A5 y tamaños personalizados.",
        finishes: "Interiores de 45 g a 150 g. Portadas de 170 g a 300 g. Acabados engrapado, hot melt o doblado."
      },
      {
        name: "Brochure corporativo",
        slug: "brochure-corporativo",
        materials: "Papel couché.",
        sizes: "A4, A3, díptico, tríptico y formatos especiales.",
        finishes: "Gramajes de 200 g a 350 g. Acabados mate, brillante, barniz UV y doblez profesional."
      },
      {
        name: "Empaques corporativos",
        slug: "empaques-corporativos",
        materials: "Cartulina foldcote, dúplex, sulfatada o microcorrugado según resistencia requerida.",
        sizes: "Medidas totalmente personalizadas según el producto.",
        finishes: "Gramajes de 250 g a 400 g. Opcional con plastificado, barniz UV, troquel y pegado."
      },
      {
        name: "Almanaques publicitarios",
        slug: "almanaques-publicitarios",
        materials: "Papel couché, cartulina o base rígida para versiones de pared y escritorio.",
        sizes: "A4, A3, 33 x 48 cm y formatos personalizados.",
        finishes: "Gramajes de 180 g a 250 g. Acabados con espiral, barniz o base armable."
      },
      {
        name: "Fotocheck PVC y lanyard",
        slug: "fotocheck-pvc-lanyard",
        materials: "PVC rígido de alta durabilidad y lanyard sublimado o estampado.",
        sizes: "Medida estándar 8.6 x 5.4 cm y formatos especiales.",
        finishes: "PVC de 0.76 mm. Acabados con perforado, porta fotocheck y acabado laminado."
      },
      {
        name: "Afiches publicitarios",
        slug: "afiches-publicitarios",
        materials: "Papel couché, bond según el uso.",
        sizes: "A3, A2 y formatos especiales.",
        finishes: "Gramajes de 150 g a 250 g. Acabados brillante, mate o encapsulado."
      },
      {
        name: "Calendario de escritorio",
        slug: "calendario-escritorio",
        materials: "Hojas en couché o cartulina; base en cartón rígido o foldcote.",
        sizes: "20 x 10 cm, 21 x 15 cm y formatos corporativos.",
        finishes: "Hojas de 150 g a 250 g. Base de 250 g a 350 g. Acabados con espiral doble cero o base armable."
      },
      {
        name: "Membretados y sobres médicos",
        slug: "membretados-sobres-medicos",
        materials: "Papel bond para hojas membretadas y sobres en bond o cartulina liviana.",
        sizes: "Carta, A4, oficio y sobres en medidas estándar o personalizadas.",
        finishes: "Hojas de 75 g a 90 g. Sobres de 90 g a 120 g. Impresión a 1 color o full color."
      },
      {
        name: "Volantes corporativos",
        slug: "volantes-corporativos",
        materials: "Papel couché o bond según el objetivo y presupuesto.",
        sizes: "A6, A5, A4 y formatos personalizados.",
        finishes: "Gramajes de 90 g a 150 g. Acabados mate, brillante o sin plastificar."
      },
      {
        name: "Tarjetas personales",
        slug: "tarjetas-personales",
        materials: "Cartulina couché, foldcote o materiales premium de alto cuerpo.",
        sizes: "9 x 5 cm, 8.5 x 5.5 cm y medidas especiales.",
        finishes: "Gramajes de 300 g a 350 g. Acabados mate, brillante, barniz UV o laminado."
      },
      {
        name: "Adhesivo publicitario",
        slug: "adhesivo-publicitario",
        materials: "Vinil adhesivo, papel sticker o materiales especiales según superficie.",
        sizes: "Troquelados, circulares, rectangulares y medidas personalizadas.",
        finishes: "Espesores y acabados variables según uso. Puede llevar laminado mate o brillante."
      },
      {
        name: "Formatos internos",
        slug: "formatos-internos",
        materials: "Papel bond, papel autocopiativo NCR y cartulina ligera para blocks o talonarios.",
        sizes: "A4, A5, 1/2 oficio, oficio y formatos personalizados.",
        finishes: "Bond de 75 g a 90 g. NCR de 50 g a 56 g. Acabados con numerado, encolado y talonario."
      }
    ].map(product => ({
      ...product,
      images: [2, 3, 4].map(number => `img/productos/${product.slug}-${number}.webp`)
    }));

    const setSlide = index => {
      const product = products[currentProduct];
      if (!product) return;
      currentSlide = (index + product.images.length) % product.images.length;

      Array.from(stage.querySelectorAll(".product-carousel-slide")).forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === currentSlide);
      });

      Array.from(dotsWrap.querySelectorAll(".product-carousel-dot")).forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentSlide;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", String(isActive));
      });
    };

    const renderModal = index => {
      const product = products[index];
      if (!product) return;
      currentProduct = index;
      currentSlide = 0;
      title.textContent = product.name;
      materials.textContent = product.materials;
      sizes.textContent = product.sizes;
      finishes.textContent = product.finishes;

      stage.innerHTML = product.images.map((image, slideIndex) => `
        <div class="product-carousel-slide${slideIndex === 0 ? " is-active" : ""}">
          <img src="${image}" alt="${product.name} ${slideIndex + 1}">
        </div>
      `).join("");

      dotsWrap.innerHTML = product.images.map((_, slideIndex) => `
        <button class="product-carousel-dot${slideIndex === 0 ? " is-active" : ""}" type="button" aria-label="Ver imagen ${slideIndex + 1}" aria-current="${slideIndex === 0}"></button>
      `).join("");

      Array.from(dotsWrap.querySelectorAll(".product-carousel-dot")).forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => setSlide(dotIndex));
      });
    };

    const openModal = index => {
      lastFocusedTile = document.activeElement;
      renderModal(index);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("product-modal-open");
      closeButton.focus({ preventScroll: true });
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("product-modal-open");
      if (lastFocusedTile && typeof lastFocusedTile.focus === "function") {
        lastFocusedTile.focus({ preventScroll: true });
      }
    };

    tiles.forEach((tile, index) => {
      tile.addEventListener("click", () => openModal(index));
    });

    prevButton?.addEventListener("click", () => setSlide(currentSlide - 1));
    nextButton?.addEventListener("click", () => setSlide(currentSlide + 1));
    closeButton?.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", event => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") setSlide(currentSlide - 1);
      if (event.key === "ArrowRight") setSlide(currentSlide + 1);
    });

    if (!reduceMotion) {
      section.classList.add("products-bento-ready");
      if ("IntersectionObserver" in window) {
        const revealProducts = () => {
          section.classList.add("is-products-visible");
          tiles.forEach((tile, index) => {
            window.setTimeout(() => tile.classList.add("is-visible"), index * 55);
          });
        };
        const productObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            revealProducts();
            productObserver.unobserve(section);
          });
        }, { rootMargin: "0px 0px -10% 0px", threshold: 0.01 });

        productObserver.observe(section);
      } else {
        section.classList.add("is-products-visible");
        tiles.forEach(tile => tile.classList.add("is-visible"));
      }
    } else {
      section.classList.add("is-products-visible");
      tiles.forEach(tile => tile.classList.add("is-visible"));
    }
  };

  initProductosBento();

  const initServiciosReveal = () => {
    const section = document.getElementById("servicios");
    if (!section || !section.classList.contains("services-showcase-section")) return;

    const head = section.querySelector(".services-showcase-head");
    const cards = Array.from(section.querySelectorAll(".services-showcase-card"));
    const revealAll = () => {
      head?.classList.add("is-visible");
      cards.forEach((card, index) => {
        window.setTimeout(() => card.classList.add("is-visible"), index * 90);
      });
    };

    if (reduceMotion) {
      section.classList.add("services-reveal-ready");
      revealAll();
      return;
    }

    section.classList.add("services-reveal-ready");

    if ("IntersectionObserver" in window) {
      const servicesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          revealAll();
          servicesObserver.unobserve(section);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });

      servicesObserver.observe(section);
    } else {
      revealAll();
    }
  };

  initServiciosReveal();

  const initProcesosVideo = () => {
    const section = document.getElementById("procesos");
    if (!section || !section.classList.contains("process-flow-section")) return;

    const stage = section.querySelector("#processFlowStage");
    const video = section.querySelector("#processFlowVideo");
    const kicker = section.querySelector("#processFlowKicker");
    const number = section.querySelector("#processFlowNumber");
    const title = section.querySelector("#processFlowName");
    const text = section.querySelector("#processFlowText");
    const tabs = Array.from(section.querySelectorAll(".process-flow-tab"));

    if (!stage || !video || !number || !title || !text || !tabs.length) return;

    const processItems = [
      {
        number: "01",
        name: "Preprensa",
        description: "Revisión, ajuste y preparación del archivo antes de entrar a producción.",
        video: "video/preprensa.mp4"
      },
      {
        number: "02",
        name: "Prensa",
        description: "El archivo se convierte en una pieza impresa mediante producción y control de color.",
        video: "video/prensa.mp4"
      },
      {
        number: "03",
        name: "Postprensa",
        description: "Acabados y terminaciones que dejan el producto listo para entregar.",
        video: "video/postprensa.mp4"
      }
    ];

    let activeIndex = 0;
    let switchStartTimer = null;
    let switchEndTimer = null;

    const playProcessVideo = () => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    const updateActiveTab = index => {
      tabs.forEach((tab, tabIndex) => {
        const isActive = tabIndex === index;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));
      });
    };

    const updateProcessContent = index => {
      const item = processItems[index];
      if (!item) return;

      if (kicker) kicker.textContent = "PROCESO";
      number.textContent = item.number;
      title.textContent = item.name;
      text.textContent = item.description;

      if (!video.getAttribute("src")?.endsWith(item.video)) {
        video.setAttribute("src", item.video);
        video.load();
      }

      playProcessVideo();
    };

    const setActiveProcess = index => {
      const item = processItems[index];
      if (!item || index === activeIndex) return;

      activeIndex = index;
      updateActiveTab(index);

      window.clearTimeout(switchStartTimer);
      window.clearTimeout(switchEndTimer);
      stage.classList.add("is-switching");

      switchStartTimer = window.setTimeout(() => {
        updateProcessContent(index);
        switchEndTimer = window.setTimeout(() => {
          stage.classList.remove("is-switching");
        }, 90);
      }, reduceMotion ? 0 : 260);
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const index = Number(tab.dataset.processIndex);
        setActiveProcess(index);
      });
    });

    updateActiveTab(activeIndex);
    updateProcessContent(activeIndex);

    if (reduceMotion) {
      section.classList.add("is-process-flow-visible");
      return;
    }

    section.classList.add("process-flow-ready");

    if ("IntersectionObserver" in window) {
      const processObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          section.classList.add("is-process-flow-visible");
          processObserver.unobserve(section);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -12% 0px" });

      processObserver.observe(section);
    } else {
      section.classList.add("is-process-flow-visible");
    }
  };

  initProcesosVideo();

  const initSectoresVisualReveal = () => {
    const section = document.getElementById("sectores");
    if (!section || !section.classList.contains("sectores-visual")) return;

    const revealSectors = () => {
      section.classList.add("is-sectores-visual-visible");
    };

    if (reduceMotion) {
      section.classList.add("sectores-visual-reveal-ready");
      revealSectors();
      return;
    }

    section.classList.add("sectores-visual-reveal-ready");

    if ("IntersectionObserver" in window) {
      const sectorsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          revealSectors();
          sectorsObserver.unobserve(section);
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

      sectorsObserver.observe(section);
    } else {
      revealSectors();
    }
  };

  initSectoresVisualReveal();

  const initCotizacionReveal = () => {
    const section = document.getElementById("cotizacion");
    if (!section || !section.classList.contains("cotizacion-integrada")) return;

    const revealCotizacion = () => {
      section.classList.add("is-cotizacion-visible");
    };

    if (reduceMotion) {
      section.classList.add("cotizacion-reveal-ready");
      revealCotizacion();
      return;
    }

    section.classList.add("cotizacion-reveal-ready");

    if ("IntersectionObserver" in window) {
      const cotizacionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          revealCotizacion();
          cotizacionObserver.unobserve(section);
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

      cotizacionObserver.observe(section);
    } else {
      revealCotizacion();
    }
  };

  initCotizacionReveal();

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-intro .hero-title", { duration: 1.2, y: 42, opacity: 0, ease: "power4.out", delay: 0.2 });
    gsap.from(".hero-intro .hero-subtitle", { duration: 1.2, y: 26, opacity: 0, ease: "power4.out", delay: 0.4 });
    gsap.from(".hero-intro .btn-contacto", { duration: 1.1, scale: 0.88, opacity: 0, ease: "elastic.out(1, 0.5)", delay: 0.6 });
    gsap.from(".hero-intro .scroll-down", { duration: 0.9, y: 18, opacity: 0, ease: "power3.out", delay: 0.9 });

    gsap.utils.toArray(".tarjeta, .catalog-card, .service-card, .graphic-process-card, .machine-card, .work-step, .cta-panel").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%" },
        y: 36,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: Math.min(index * 0.05, 0.25)
      });
    });

    gsap.utils.toArray(".timeline-item").forEach(item => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }
});
