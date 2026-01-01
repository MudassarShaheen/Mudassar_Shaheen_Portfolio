import { Monitor } from "lucide-react";

const SteamProjects = () => {
  return (
    <section id="steam" className="py-24 relative scroll-mt-24">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      
      <div className="section-container relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-xl bg-secondary/20 border border-secondary/30">
            <Monitor className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              PC & Console <span className="text-secondary">(Steam)</span>
            </h2>
            <p className="text-muted-foreground font-body">Professional RPG and desktop game development</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Fracture Fables with Video */}
          <div className="glass-card overflow-hidden hover-glow ring-1 ring-secondary/30">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/2hyubtj3m0o"
                title="Fracture Fables"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {["Unity", "RPG", "Steam", "PC", "Story-Driven"].map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold font-display mb-2">Fracture Fables</h3>
              <p className="text-sm text-muted-foreground font-body">
                A professional RPG project featuring rich storytelling, complex character progression systems, 
                and immersive world-building. Developed for Steam with AAA-quality game mechanics and production values.
              </p>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="glass-card p-8 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-6">
              <Monitor className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">More Coming Soon</h3>
            <p className="text-muted-foreground font-body max-w-sm">
              New PC and console projects are currently in development. Stay tuned for exciting announcements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SteamProjects;
