import { Gamepad2, Puzzle } from "lucide-react";
import { hyperCasualGames, puzzleGames } from "@/data/projects";

const HyperCasualGallery = () => {
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
            {hyperCasualGames.map((game, index) => (
              <div
                key={game.name}
                className="glass-card overflow-hidden hover-glow group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Video Container with proper aspect ratio */}
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <iframe
                    src={game.videos[0]}
                    title={game.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm md:text-lg font-display font-semibold group-hover:text-primary transition-colors truncate">
                      {game.name}
                    </h3>
                    {game.videos.length > 1 && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">+{game.videos.length - 1}</span>
                    )}
                  </div>
                </div>
              </div>
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

          <div className="grid md:grid-cols-2 gap-6">
            {puzzleGames.map((game) => (
              <div
                key={game.name}
                className="glass-card overflow-hidden hover-glow group"
              >
                {/* Video Container with proper aspect ratio */}
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <iframe
                    src={game.videos[0]}
                    title={game.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                    <Puzzle className="w-5 h-5 text-primary" />
                    {game.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HyperCasualGallery;
