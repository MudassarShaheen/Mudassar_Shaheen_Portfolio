import { useEffect, useState } from "react";

/**
 * Subtle fixed vertical indicator on the left edge — a thin line that
 * fills as the page scrolls. Hides once the visitor has scrolled well
 * past the hero so it never competes with content.
 */
const ScrollIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const frac = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, frac));
      setVisible(window.scrollY < window.innerHeight * 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <span
        className="font-display text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
        style={{ writingMode: "vertical-rl" }}
      >
        Scroll to explore
      </span>
      <div className="relative w-px h-24 bg-border overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-primary"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
