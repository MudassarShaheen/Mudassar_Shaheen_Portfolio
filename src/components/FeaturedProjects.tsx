const featuredProjects = [
  {
    title: "Zanthalar - Multiplayer Card Game",
    description: "A real-time online multiplayer card game built with Unity and a custom Node.js socket-based backend server. Features strategic card battles, matchmaking, persistent player profiles, and low-latency networking for competitive play.",
    tags: ["Unity", "Multiplayer", "Socket.IO", "Custom Backend", "Card Game"],
    videoUrl: "https://www.youtube.com/embed/ybfDXeDwyZc",
    featured: true,
  },
  {
    title: "AI Agents English Learning Game",
    description: "An innovative educational game leveraging AI agents to create personalized English learning experiences with adaptive difficulty and conversational practice.",
    tags: ["Unity", "AI Integration", "EdTech", "Mobile"],
    videoUrl: "https://www.youtube.com/embed/FJ5CewpYzHE",
    featured: true,
  },
  {
    title: "Royal Champs",
    description: "A competitive multiplayer game featuring royal battle mechanics with strategic gameplay elements.",
    tags: ["Unity", "Multiplayer", "Mobile"],
    videoUrl: "https://drive.google.com/file/d/1snmlPrDNJZBrBlRuCaOMWgm_r_G4G2IN/preview",
  },
  {
    title: "Kids Game Project",
    description: "Engaging educational games designed specifically for children with colorful visuals and intuitive controls.",
    tags: ["Unity", "Educational", "Kids"],
    videoUrl: "https://drive.google.com/file/d/137Ty4nBKqdfnLHL5Sra5ULowBcw6YSbs/preview",
  },
  {
    title: "Car Paint Project",
    description: "Technical showcase demonstrating advanced shader programming and realistic paint simulation systems.",
    tags: ["Unity", "Shaders", "Technical Art"],
    videoUrl: "https://www.youtube.com/embed/kdRgFFxWmk4",
    featured: true,
  },
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-primary/5 rounded-r-full blur-[100px]" />
      
      <div className="section-container relative">
        <div className="text-center mb-16">
          <span className="text-primary font-display text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4">
            Featured <span className="gradient-text">Client Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
            A selection of professional projects showcasing expertise in game development, 
            AI integration, and technical implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <div 
              key={index} 
              className={`glass-card overflow-hidden hover-glow group ${project.featured ? 'ring-1 ring-primary/30' : ''}`}
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
              <div className="p-6">
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
                <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
