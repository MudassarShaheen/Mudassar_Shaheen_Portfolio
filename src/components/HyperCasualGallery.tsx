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
  { name: "Traffic Jam", link: "https://drive.google.com/file/d/1-8lXtzitCIQJBIWxvKT21zrIgDVU4KDP/view" },
  { name: "Number Puzzle", link: "https://drive.google.com/file/d/1dOdoUD9ti7xdXeOk5V3dHe_ufJTx5gdb/view" },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hyperCasualGames.map((game, index) => (
              <div 
                key={game.name}
                className="glass-card overflow-hidden hover-glow group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Video Embed - Show first video */}
                <div className="aspect-video w-full">
                  <iframe
                    src={game.videos[0]}
                    title={game.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">
                      {game.name}
                    </h3>
                    {game.videos.length > 1 && (
                      <span className="text-xs text-muted-foreground">+{game.videos.length - 1} more</span>
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
              <a 
                key={game.name}
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 flex flex-col items-center text-center hover-glow group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Puzzle className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-xl font-display font-semibold group-hover:text-secondary transition-colors flex items-center gap-2">
                  {game.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground mt-2">Click to view demo</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HyperCasualGallery;
