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

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: targets as unknown as Element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      ...vars,
    }
  );
};
