import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 7;

/**
 * A soft "liquid" glow that trails the cursor across empty space — a
 * chain of blurred circles that merge into each other (an SVG "goo"
 * filter: heavy blur + a contrast boost on the alpha channel turns
 * separate soft circles into one gooey blob wherever they overlap).
 *
 * Pure CSS/SVG + rAF, no canvas, no dependency. Desktop (fine pointer)
 * only, skipped for prefers-reduced-motion, and it never darkens
 * anything — `mix-blend-mode: screen` can only brighten, so it can't
 * hurt text contrast the way a solid overlay would.
 */
const MouseLiquid = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduceMotion) return;

    const points = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    const mouse = { x: points[0].x, y: points[0].y };
    let active = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;

      points[0].x += (mouse.x - points[0].x) * 0.35;
      points[0].y += (mouse.y - points[0].y) * 0.35;
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.32;
        points[i].y += (points[i - 1].y - points[i].y) * 0.32;
      }

      points.forEach((p, i) => {
        const dot = dotsRef.current[i];
        if (!dot) return;
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
      });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 1, mixBlendMode: "screen" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="liquid-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
          />
        </filter>
        <radialGradient id="liquid-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g filter="url(#liquid-goo)" opacity="0.28">
        {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            r={26 - i * 2.2}
            fill="url(#liquid-fill)"
          />
        ))}
      </g>
    </svg>
  );
};

export default MouseLiquid;
