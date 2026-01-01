import { Gamepad2, Puzzle } from "lucide-react";

const hyperCasualGames = [
  "SkinCare", "MagicMaster", "Prisoner Escape", "SchoolRush3D", 
  "SurvivalRush", "Boomerang", "DigitRun", "TrainRush", 
  "TailorMasterIdle", "Water Park"
];

const puzzleGames = ["Traffic Jam", "Number Puzzle"];

const HyperCasualGallery = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        {/* Hyper-Casual Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display">
                Hyper-Casual <span className="gradient-text">Gallery</span>
              </h2>
              <p className="text-muted-foreground font-body">Quick, addictive mobile gaming experiences</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {hyperCasualGames.map((game, index) => (
              <div 
                key={game}
                className="glass-card p-4 text-center hover-glow group cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 via-muted to-secondary/20 mb-3 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <Gamepad2 className="w-8 h-8 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-sm font-display font-semibold truncate group-hover:text-primary transition-colors">
                  {game}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Puzzle Games Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-secondary/20 border border-secondary/30">
              <Puzzle className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display">
                Puzzle <span className="text-secondary">Games</span>
              </h2>
              <p className="text-muted-foreground font-body">Brain-teasing challenges</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {puzzleGames.map((game, index) => (
              <div 
                key={game}
                className="glass-card p-6 text-center hover-glow group cursor-pointer"
              >
                <div className="aspect-video rounded-lg bg-gradient-to-br from-secondary/20 via-muted to-primary/20 mb-4 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-300">
                  <Puzzle className="w-10 h-10 text-secondary/50 group-hover:text-secondary group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-display font-semibold group-hover:text-secondary transition-colors">
                  {game}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HyperCasualGallery;
