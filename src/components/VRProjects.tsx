import { Glasses } from "lucide-react";

const vrProjects = [
  {
    title: "Immersive Meditation in VR",
    description: "A calming VR experience designed for Meta Quest that guides users through peaceful environments with guided meditation sessions.",
    tags: ["Meta Quest", "Wellness", "VR", "Oculus"],
    videoUrl: "https://www.youtube.com/embed/VrpOE-4iQU8",
  },
  {
    title: "VR Physics and Rigidbody Interaction",
    description: "Technical demonstration of advanced physics-based interactions in VR, featuring realistic object manipulation with physical hands.",
    tags: ["Meta Quest", "Physics", "Hand Tracking"],
    videoUrl: "https://www.youtube.com/embed/UKLCynXzaf8",
  },
  {
    title: "Unity VR Physics Interaction",
    description: "Showcasing VR physics interaction development for Metaverse and Oculus Quest 2 environments.",
    tags: ["Unity", "VR Development", "Metaverse"],
    videoUrl: "https://www.youtube.com/embed/e3kWlnI2eLU",
  },
  {
    title: "VR Meditation Client Demo",
    description: "A professional VR meditation project developed for a client, demonstrating immersive relaxation experiences.",
    tags: ["Client Work", "VR", "Meditation"],
    videoUrl: "https://www.youtube.com/embed/s1Tto1bQ0gE",
  },
  {
    title: "Meta Quest Hand Interactions",
    description: "Unity Meta Quest Oculus 2 hand interactions showcasing natural hand tracking and gesture controls.",
    tags: ["Meta Quest", "Hand Tracking", "Oculus 2"],
    videoUrl: "https://www.youtube.com/embed/yuKlAclu2uo",
  },
];

const VRProjects = () => {
  return (
    <section className="py-24 relative overflow-hidden scroll-mt-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="section-container relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
            <Glasses className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              VR & <span className="gradient-text">Metaverse Experiences</span>
            </h2>
            <p className="text-muted-foreground font-body">Meta Quest and Oculus VR development</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vrProjects.map((project, index) => (
            <div 
              key={index} 
              className="glass-card overflow-hidden hover-glow group"
            >
              {/* Video Embed */}
              <div className="aspect-video w-full">
                <iframe
                  src={project.videoUrl}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VR Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "VR Projects", value: "10+" },
            { label: "Meta Quest Apps", value: "5" },
            { label: "Hand Tracking", value: "Expert" },
            { label: "Spatial Audio", value: "Yes" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl border border-border/50 bg-card/30">
              <div className="text-2xl font-bold font-display text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VRProjects;
