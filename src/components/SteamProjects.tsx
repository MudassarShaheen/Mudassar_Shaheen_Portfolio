import ProjectCard from "./ProjectCard";
import { Monitor } from "lucide-react";

const SteamProjects = () => {
  return (
    <section className="py-24 relative">
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

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            title="Fracture Fables"
            description="A professional RPG project featuring rich storytelling, complex character progression systems, and immersive world-building. Developed for Steam with AAA-quality game mechanics and production values."
            tags={["Unity", "RPG", "Steam", "PC", "Story-Driven"]}
            featured
          />
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
