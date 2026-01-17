(() => {
  // Evita doble init (Webflow)
  if (window.__skillsCardsInit) return;
  window.__skillsCardsInit = true;

  // Respeta reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("[SkillsCards] GSAP o ScrollTrigger no cargados");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const grid = document.querySelector(".u-grid-3");
  if (!grid) {
    console.warn("[SkillsCards] .u-grid-3 no encontrado");
    return;
  }

  const cards = grid.querySelectorAll(".card-captabilities-wrapper");
  if (!cards.length) {
    console.warn("[SkillsCards] No hay cards");
    return;
  }

  gsap.set(cards, { autoAlpha: 0, y: 40 });

  gsap.to(cards, {
    autoAlpha: 1,
    y: 0,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: grid,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();

