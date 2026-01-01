import ProjectCard from "./ProjectCard";

const featuredProjects = [
  {
    title: "AI Agents English Learning Game",
    description: "An innovative educational game leveraging AI agents to create personalized English learning experiences with adaptive difficulty and conversational practice.",
    tags: ["Unity", "AI Integration", "EdTech", "Mobile"],
    featured: true,
  },
  {
    title: "Royal Champs",
    description: "A competitive multiplayer game featuring royal battle mechanics with strategic gameplay elements.",
    tags: ["Unity", "Multiplayer", "Mobile"],
  },
  {
    title: "Kids Game Project",
    description: "Engaging educational games designed specifically for children with colorful visuals and intuitive controls.",
    tags: ["Unity", "Educational", "Kids"],
  },
  {
    title: "Car Paint Project",
    description: "Technical showcase demonstrating advanced shader programming and realistic paint simulation systems.",
    tags: ["Unity", "Shaders", "Technical Art"],
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
