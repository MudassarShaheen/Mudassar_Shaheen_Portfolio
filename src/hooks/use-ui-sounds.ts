import { useEffect } from "react";
import { isSoundEnabled, playClickSound, playHoverSound } from "@/lib/sound";

/**
 * Any element that should feel "interactive" gets the hover/click blip —
 * not just literal <a>/<button> tags, but every card, tile and video
 * embed that already has its own hover treatment (`.group` is the common
 * marker shadcn/Tailwind hover-group patterns use across this site).
 */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], .group, .hover-glow, .video-card-hover, [data-cursor]";

/**
 * Wires the procedural click/hover blips to every interactive-feeling
 * element on the page via delegated listeners — no need to touch
 * individual components. No-ops entirely while sound is muted (the
 * default).
 */
export const useUiSounds = () => {
  useEffect(() => {
    let lastHover = 0;
    let lastHoverTarget: Element | null = null;

    const onClick = (e: MouseEvent) => {
      if (!isSoundEnabled()) return;
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTOR);
      if (target) playClickSound();
    };

    const onOver = (e: MouseEvent) => {
      if (!isSoundEnabled()) return;
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTOR);
      if (!target || target === lastHoverTarget) return;
      const now = performance.now();
      if (now - lastHover < 120) return; // avoid rapid-fire retriggering
      lastHover = now;
      lastHoverTarget = target;
      playHoverSound();
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTOR);
      if (target === lastHoverTarget) lastHoverTarget = null;
    };

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);
};
