(() => {
  // Evita doble init (Webflow)
  if (window.__skillsCardsInit) return;
  window.__skillsCardsInit = true;

  // Respeta reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("[SkillsCards] GSAP/ScrollTrigger no cargados");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const grid = document.querySelector(".u-grid-3");
  if (!grid) {
    console.warn("[SkillsCards] .u-grid-3 no encontrado");
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".card-captabilities-wrapper"));
  if (!cards.length) {
    console.warn("[SkillsCards] No hay .card-captabilities-wrapper dentro del grid");
    return;
  }

  // Estado inicial (más “premium”: un poco de blur + subida suave)
  gsap.set(cards, {
    autoAlpha: 0,
    y: 56,
    filter: "blur(6px)",
    willChange: "transform, opacity, filter"
  });

  // Timeline reversible
  const tl = gsap.timeline({
    defaults: {
      duration: 0.78,                // tempo premium (no rápido, no pesado)
      ease: "power3.out"             // más suave que power2
    },
    scrollTrigger: {
      trigger: grid,
      start: "top 78%",              // entra un pelín antes
      end: "bottom 55%",
      toggleActions: "play reverse play reverse", // reversible
      invalidateOnRefresh: true
      // markers: true,
    }
  });

  tl.to(cards, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    stagger: {
      each: 0.14,                    // mini delay elegante
      from: "start"
    }
  });

  // Limpieza performance al terminar (evita “will-change” permanente)
  ScrollTrigger.addEventListener("refreshInit", () => {
    gsap.set(cards, { willChange: "transform, opacity, filter" });
  });

  tl.eventCallback("onComplete", () => {
    gsap.set(cards, { willChange: "auto" });
  });

  tl.eventCallback("onReverseComplete", () => {
    gsap.set(cards, { willChange: "auto" });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
