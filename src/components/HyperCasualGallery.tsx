import { useState } from "react";
import { Gamepad2, Puzzle, Play } from "lucide-react";
import { hyperCasualGames, puzzleGames } from "@/data/projects";
import { getVideoThumbnail } from "@/lib/thumbnail";
import VideoModal from "@/components/VideoModal";

/** Hides a broken/unavailable thumbnail image, leaving the icon fallback behind it visible. */
const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

const HyperCasualGallery = () => {
  const [playing, setPlaying] = useState<{ url: string; title: string } | null>(null);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="section-container">
        {/* Hyper-Casual Section */}
        <div id="hypercasual" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Mobile &amp; <span className="gradient-text">Hypercasual Games</span>
              </h2>
              <p className="text-muted-foreground font-body">Quick, addictive mobile gaming experiences</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {hyperCasualGames.map((game) => (
              <button
                key={game.name}
                type="button"
                onClick={() => setPlaying({ url: game.videos[0], title: game.name })}
                className="paper-card group text-left overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                  </div>
                  {getVideoThumbnail(game.videos[0]) && (
                    <img
                      src={getVideoThumbnail(game.videos[0])!}
                      alt=""
                      loading="lazy"
                      onError={hideOnError}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-foreground bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4 border-t-2 border-foreground/70">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm md:text-lg font-display font-semibold truncate">{game.name}</h3>
                    {game.videos.length > 1 && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        +{game.videos.length - 1}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Puzzle Games Section */}
        <div id="puzzle" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
              <Puzzle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Puzzle <span className="gradient-text">Games</span>
              </h2>
              <p className="text-muted-foreground font-body">Brain-teasing challenges</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {puzzleGames.map((game) => (
              <button
                key={game.name}
                type="button"
                onClick={() => setPlaying({ url: game.videos[0], title: game.name })}
                className="paper-card group text-left overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
                    <Puzzle className="w-8 h-8 text-primary" />
                  </div>
                  {getVideoThumbnail(game.videos[0]) && (
                    <img
                      src={getVideoThumbnail(game.videos[0])!}
                      alt=""
                      loading="lazy"
                      onError={hideOnError}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-foreground bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4 border-t-2 border-foreground/70">
                  <h3 className="text-sm md:text-lg font-display font-semibold flex items-center gap-2 truncate">
                    {game.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        videoUrl={playing?.url ?? null}
        title={playing?.title ?? ""}
        onClose={() => setPlaying(null)}
        aspect="portrait"
      />
    </section>
  );
};

export default HyperCasualGallery;
