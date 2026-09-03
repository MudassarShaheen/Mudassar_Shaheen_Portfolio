import { useEffect, useState } from "react";

/**
 * Premium entry moment: a short "charging portal" loader tied to real
 * asset loading (the window `load` event), not a fixed fake delay — if
 * everything is already cached it resolves almost instantly.
 */
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }

    // A plain interval (not requestAnimationFrame) — this is a cosmetic
    // percentage counter, not a render-synced animation, and browsers can
    // throttle rAF in backgrounded/inactive tabs.
    const id = window.setInterval(() => {
      // Checked live each tick — avoids missing a `load` event that may
      // have already fired before this effect attached its listener.
      const realLoadDone = document.readyState === "complete";
      setProgress((p) => {
        // Eases toward 90% while waiting, then only completes once the
        // page has actually finished loading.
        const ceiling = realLoadDone ? 100 : 90;
        const next = p + (ceiling - p) * 0.15 + (realLoadDone ? 4 : 0);
        return Math.min(100, next);
      });
    }, 60);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress >= 99.5 && !done) {
      setDone(true);
      const t = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(t);
    }
  }, [progress, done]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary transition-transform"
          style={{ transform: `rotate(${progress * 3.6}deg)` }}
        />
        <span className="font-display text-2xl font-bold text-foreground">M.</span>
      </div>
      <p className="font-display text-xs uppercase tracking-[0.35em] text-muted-foreground">
        Loading Experience
      </p>
      <p className="font-display text-sm tabular-nums text-primary">{Math.floor(progress)}%</p>
    </div>
  );
};

export default LoadingScreen;
