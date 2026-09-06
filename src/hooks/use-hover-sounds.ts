import { useEffect } from "react";
import { isSoundEnabled, playHoverSound } from "@/lib/sound";

/**
 * Auto-plays hover sound effects on interactive elements (buttons, links, etc)
 * without requiring per-component manual setup.
 */
export const useHoverSounds = () => {
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      if (!isSoundEnabled()) return;

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, [data-cursor='drag'], .magnetic-btn"
      );

      if (interactive && e.target === interactive) {
        playHoverSound();
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);
};
