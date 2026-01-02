import { Gamepad2, Puzzle, ExternalLink } from "lucide-react";

const hyperCasualGames = [
  { name: "SkinCare", videos: ["https://drive.google.com/file/d/1FfMIwz4FrLhHXio9hsf21zQUaBousql0/preview", "https://drive.google.com/file/d/1FdNPb_bc31I2dQf-R-_rYqNtK6fOLIMl/preview"] },
  { name: "MagicMaster", videos: ["https://drive.google.com/file/d/1RIWUbyLqBS4zN45Bws3HLK8MXz2V9Mur/preview"] },
  { name: "Prisoner Escape", videos: ["https://drive.google.com/file/d/1AoDpziTDPSbuzsNAai6-MFXrpNJrAPgA/preview"] },
  { name: "SchoolRush3D", videos: ["https://drive.google.com/file/d/17BLYD6fgtAid-zJeq5IfaAT9yQDCc2rg/preview"] },
  { name: "SurvivalRush", videos: ["https://drive.google.com/file/d/1LWwaxWjnajrlLQAxSxouKD3l31rQDwCj/preview"] },
  { name: "Boomerang", videos: ["https://drive.google.com/file/d/1Ch-GwtEYWIwa4XKviFWXGBSgpHRBCGd_/preview", "https://drive.google.com/file/d/1-WjnJxGkrH2kd7fqke_NUErvORm8yGVl/preview"] },
  { name: "DigitRun", videos: ["https://drive.google.com/file/d/1icB9QEC3kjdaA--HbkrEderjFv8FkmK3/preview"] },
  { name: "TrainRush", videos: ["https://drive.google.com/file/d/1D8Ym1CqBoXdfjay8z3nJM2LLdSFHFNDa/preview"] },
  { name: "TailorMasterIdle", videos: ["https://drive.google.com/file/d/1gDZsoMXL-aCWovgtXrdhWsGcd26ZEqOk/preview"] },
  { name: "Water Park", videos: ["https://drive.google.com/file/d/1xoGOVFBOvSeWxv9se2mAifCJRfGtgVGI/preview"] },
];

const puzzleGames = [
  { name: "Traffic Jam", video: "https://drive.google.com/file/d/1-8lXtzitCIQJBIWxvKT21zrIgDVU4KDP/preview" },
  { name: "Number Puzzle", video: "https://drive.google.com/file/d/1dOdoUD9ti7xdXeOk5V3dHe_ufJTx5gdb/preview" },
];

const HyperCasualGallery = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        {/* Hyper-Casual Section */}
        <div id="hypercasual" className="mb-20 scroll-mt-24">
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

          <div className="grid md:grid-cols-2 gap-6">
            {puzzleGames.map((game) => (
              <div 
                key={game.name}
                className="glass-card overflow-hidden hover-glow group"
              >
                {/* Video Container with proper aspect ratio */}
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <iframe
                    src={game.video}
                    title={game.name}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-display font-semibold group-hover:text-secondary transition-colors flex items-center gap-2">
                    <Puzzle className="w-5 h-5 text-secondary" />
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
