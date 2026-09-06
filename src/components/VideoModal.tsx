import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  videoUrl: string | null;
  title: string;
  onClose: () => void;
  /** "portrait" for 9:16 mobile-shot clips (renders as a phone-frame popup),
   *  "video" (default) for standard 16:9 landscape embeds. */
  aspect?: "video" | "portrait";
}

/**
 * A cinematic popup video player — backdrop dims and blurs, the player
 * scales/fades in inside a paper-card frame. Closes on Escape, backdrop
 * click, or the close button. Body scroll is locked while open, and the
 * iframe only exists while the modal is open (nothing loads until the
 * visitor actually asks to watch it).
 *
 * The frame itself adapts to the clip's real orientation instead of
 * always forcing a 16:9 box — a portrait clip gets a narrow, tall
 * phone-style frame; a landscape one gets the usual wide frame.
 */
const VideoModal = ({ videoUrl, title, onClose, aspect = "video" }: VideoModalProps) => {
  useEffect(() => {
    if (!videoUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [videoUrl, onClose]);

  if (!videoUrl) return null;

  const isPortrait = aspect === "portrait";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-foreground/50 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`paper-card relative overflow-hidden animate-modal-in ${
          isPortrait ? "w-full max-w-sm" : "w-full max-w-4xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10 p-2 rounded-md border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className={`w-full bg-muted ${isPortrait ? "aspect-[9/16] max-h-[75vh] mx-auto" : "aspect-video"}`}>
          <iframe
            src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="px-5 py-3 border-t-2 border-foreground/70">
          <h3 className="font-display text-sm md:text-base font-bold uppercase tracking-wide truncate">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
