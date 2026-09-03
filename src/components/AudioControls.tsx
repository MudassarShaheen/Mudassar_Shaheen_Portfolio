import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Mic } from "lucide-react";
import {
  initSound,
  setSoundEnabled,
  isSoundEnabled,
  playHoverSound,
  playClickSound,
  playToggleSound,
} from "@/lib/sound";

/**
 * HEAD-checks a public asset so we only show controls for files that
 * actually exist. Also verifies the content-type isn't HTML — an SPA dev
 * server (and some static hosts) return 200 + index.html for any missing
 * path instead of a real 404.
 */
const useAssetExists = (path: string) => {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch(path, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!cancelled) setExists(res.ok && !type.includes("text/html"));
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);
  return exists;
};

/**
 * Floating audio control cluster, bottom-right:
 * - UI sound-effect toggle (procedural, always available)
 * - Voice intro play button (only shown once /intro.mp3 exists)
 * - Ambient background music toggle (only shown once /ambient.mp3 exists)
 *
 * Everything defaults OFF — audio only ever starts from a direct click,
 * which is both good UX and satisfies browser autoplay restrictions.
 */
const AudioControls = () => {
  const [soundOn, setSoundOn] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const introRef = useRef<HTMLAudioElement | null>(null);

  const hasIntro = useAssetExists("/intro.mp3");
  const hasMusic = useAssetExists("/ambient.mp3");

  useEffect(() => {
    setSoundOn(initSound());
  }, []);

  useEffect(() => {
    if (!hasMusic) return;
    const el = new Audio("/ambient.mp3");
    el.loop = true;
    el.volume = 0.18;
    musicRef.current = el;
    return () => {
      el.pause();
      musicRef.current = null;
    };
  }, [hasMusic]);

  useEffect(() => {
    if (!hasIntro) return;
    const el = new Audio("/intro.mp3");
    introRef.current = el;
    const onEnd = () => setIntroPlaying(false);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("ended", onEnd);
      el.pause();
      introRef.current = null;
    };
  }, [hasIntro]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) playToggleSound();
  };

  const toggleMusic = () => {
    const el = musicRef.current;
    if (!el) return;
    if (musicPlaying) {
      el.pause();
      setMusicPlaying(false);
    } else {
      el.play().catch(() => {});
      setMusicPlaying(true);
    }
    if (isSoundEnabled()) playClickSound();
  };

  const toggleIntro = () => {
    const el = introRef.current;
    if (!el) return;
    if (introPlaying) {
      el.pause();
      el.currentTime = 0;
      setIntroPlaying(false);
    } else {
      el.play().catch(() => {});
      setIntroPlaying(true);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
      onMouseEnter={() => isSoundEnabled() && playHoverSound()}
    >
      {hasIntro && (
        <button
          type="button"
          onClick={toggleIntro}
          aria-label={introPlaying ? "Pause voice intro" : "Play voice intro"}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/60 bg-card/80 backdrop-blur-xl text-xs font-display uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          <Mic className="w-3.5 h-3.5" />
          {introPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      )}

      {hasMusic && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause background music" : "Play background music"}
          className="p-2.5 rounded-full border border-border/60 bg-card/80 backdrop-blur-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          {musicPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      )}

      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundOn ? "Mute interface sounds" : "Enable interface sounds"}
        className="p-2.5 rounded-full border border-border/60 bg-card/80 backdrop-blur-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      >
        {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default AudioControls;
