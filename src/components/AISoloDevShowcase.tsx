import { Bot, Cpu, Sparkles } from "lucide-react";
import { aiSoloBuilds } from "@/data/projects";

const highlights = [
  { icon: Bot, label: "Claude Code as Co-Developer" },
  { icon: Cpu, label: "Unity MCP Integration" },
  { icon: Sparkles, label: "AI-Generated Art & Assets" },
];

const AISoloDevShowcase = () => {
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

        {/* Portrait (9:16) mobile-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {aiSoloBuilds.map((build, index) => (
            <div key={index} className="glass-card overflow-hidden hover-glow group">
              <div className="aspect-[9/16] w-full">
                <iframe
                  src={build.videoUrl}
                  title={build.title}
                  loading="lazy"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold font-display group-hover:text-primary transition-colors">
                  {build.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Practice prototype · Built solo with Claude Code + Unity MCP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISoloDevShowcase;
