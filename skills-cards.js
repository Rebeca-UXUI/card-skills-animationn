(() => {
  if (window.__skillsCardsInit) return;
  window.__skillsCardsInit = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("[SkillsCards] GSAP/ScrollTrigger no cargados");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const grid = document.querySelector(".u-grid-3");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".card-captabilities-wrapper"));
  if (!cards.length) return;

  // Blur súper mínimo (casi nada) + subida suave
  gsap.set(cards, {
    autoAlpha: 0,
    y: 52,
    filter: "blur(1px)",
    willChange: "transform, opacity, filter"
  });

  gsap.to(cards, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.8,
    ease: "power3.out",
    stagger: { each: 0.14, from: "start" },
    scrollTrigger: {
      trigger: grid,
      start: "top 78%",
      // ✅ NO reverse al subir: solo se reproduce una vez y se queda
      toggleActions: "play none none none",
      once: true,
      invalidateOnRefresh: true
      // markers: true,
    },
    onComplete: () => gsap.set(cards, { willChange: "auto" })
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();

