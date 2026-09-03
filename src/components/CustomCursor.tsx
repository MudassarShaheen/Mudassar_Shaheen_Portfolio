import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations";

/**
 * Premium custom cursor: a small dot with a smoothly-trailing ring.
 * Desktop (fine pointer, no touch) only — mobile/touch keeps the native
 * cursor entirely. Expands over links/buttons, and again over anything
 * marked data-cursor="drag" for interactive/draggable 3D objects.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: ringPos.x, y: ringPos.y };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea");
      const draggable = target.closest("[data-cursor='drag']");
      if (draggable) {
        gsap.to(ring, {
          scale: 2.6,
          opacity: 0.95,
          boxShadow: "0 0 40px 6px hsl(var(--accent) / 0.55)",
          duration: 0.3,
          ease: "power2.out",
        });
        ring.dataset.state = "drag";
      } else if (interactive) {
        gsap.to(ring, {
          scale: 2,
          opacity: 0.85,
          boxShadow: "0 0 30px 4px hsl(var(--primary) / 0.5)",
          duration: 0.3,
          ease: "power2.out",
        });
        ring.dataset.state = "link";
      } else {
        gsap.to(ring, {
          scale: 1,
          opacity: 0.5,
          boxShadow: "0 0 0px 0px hsl(var(--primary) / 0)",
          duration: 0.3,
          ease: "power2.out",
        });
        ring.dataset.state = "";
      }
    };

    let raf = 0;
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div className="hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/60 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 opacity-50 transition-[border-color] duration-200 data-[state=drag]:border-accent"
      />
    </div>
  );
};

export default CustomCursor;
