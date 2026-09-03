import { useEffect } from "react";
import { isSoundEnabled, playClickSound, playHoverSound } from "@/lib/sound";

/**
 * Wires the procedural click/hover blips to every link and button on the
 * page via delegated listeners — no need to touch individual components.
 * No-ops entirely while sound is muted (the default).
 */
export const useUiSounds = () => {
  useEffect(() => {
    let lastHover = 0;

    const onClick = (e: MouseEvent) => {
      if (!isSoundEnabled()) return;
      const target = (e.target as HTMLElement).closest("a, button");
      if (target) playClickSound();
    };

    const onOver = (e: MouseEvent) => {
      if (!isSoundEnabled()) return;
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;
      const now = performance.now();
      if (now - lastHover < 120) return; // avoid rapid-fire retriggering
      lastHover = now;
      playHoverSound();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);
};
