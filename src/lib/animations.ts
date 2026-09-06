import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** True when the user has asked the OS for reduced motion. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveal an element (or list of elements) as it scrolls into view.
 * Centralizes the "fade + rise" motion used across sections so every
 * section animates consistently instead of each component rolling its own.
 */
export const revealOnScroll = (
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) => {
  if (prefersReducedMotion()) return;

  // One tween per element, each triggered by itself. A ScrollTrigger
  // `trigger` must be a single element/selector — handing it the whole
  // NodeList throws inside GSAP's tween init, and because that runs on
  // the shared ticker it freezes *every* tween on the page at its "from"
  // state (i.e. opacity: 0, invisible sections).
  const elements = gsap.utils.toArray<Element>(targets);
  if (!elements.length) return;

  elements.forEach((element, i) =>
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        // Keeps the staggered feel for siblings entering together, capped
        // so later elements never sit behind a long delay.
        delay: Math.min(i * 0.12, 0.36),
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        ...vars,
      }
    )
  );
};
