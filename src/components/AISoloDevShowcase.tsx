import { useState } from "react";
import { Bot, Cpu, Sparkles, Play } from "lucide-react";
import { aiSoloBuilds } from "@/data/projects";
import { getVideoThumbnail } from "@/lib/thumbnail";
import VideoModal from "@/components/VideoModal";

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

const highlights = [
  { icon: Bot, label: "Claude Code as Co-Developer" },
  { icon: Cpu, label: "Unity MCP Integration" },
  { icon: Sparkles, label: "AI-Generated Art & Assets" },
];

const AISoloDevShowcase = () => {
  const [playing, setPlaying] = useState<{ url: string; title: string; aspect: "video" | "portrait" } | null>(null);

  return (
    <section id="ai-solo-dev" className="py-20 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="section-container relative">
        <div className="text-center mb-16">
          <span className="text-primary font-display text-sm uppercase tracking-widest">
            R&D · Practice Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
            Full Games Built <span className="gradient-text">Solo with AI</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto font-body">
            End-to-end game development powered by <span className="text-primary">Claude Code</span> and{" "}
            <span className="text-primary">Unity MCP</span> — architecting, coding, and art-directing
            complete playable builds with no designer and no artist required. These are raw
            practice prototypes exploring how far AI-augmented solo development can go.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
              >
                <h.icon className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm font-display uppercase tracking-wider text-primary">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mixed-orientation grid — each clip keeps its own aspect (phone
            captures stay 9:16, desktop captures stay 16:9). */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-start">
          {aiSoloBuilds.map((build, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setPlaying({
                  url: build.videoUrl,
                  title: build.title,
                  aspect: build.aspect ?? "portrait",
                })
              }
              className="paper-card group text-left overflow-hidden"
            >
              <div
                className={`relative w-full bg-muted flex items-center justify-center ${
                  (build.aspect ?? "portrait") === "portrait" ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                {getVideoThumbnail(build.videoUrl) && (
                  <img
                    src={getVideoThumbnail(build.videoUrl)!}
                    alt=""
                    loading="lazy"
                    onError={hideOnError}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <span className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-foreground bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </span>
              </div>
              <div className="p-4 border-t-2 border-foreground/70">
                <h3 className="text-base font-bold font-display">{build.title}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Practice prototype · Built solo with Claude Code + Unity MCP
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VideoModal
        videoUrl={playing?.url ?? null}
        title={playing?.title ?? ""}
        onClose={() => setPlaying(null)}
        aspect={playing?.aspect ?? "portrait"}
      />
    </section>
  );
};

export default AISoloDevShowcase;
