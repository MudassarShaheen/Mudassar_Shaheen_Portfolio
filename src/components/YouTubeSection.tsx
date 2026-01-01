import { Youtube, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const tutorials = [
  {
    title: "Vector3 Techniques in Unity",
    description: "Deep dive into Vector3 operations, transformations, and practical applications in game development.",
    duration: "15 min",
  },
  {
    title: "Lerp vs Slerp Explained",
    description: "Understanding the differences between linear and spherical interpolation with real-world examples.",
    duration: "12 min",
  },
  {
    title: "Raycasting Mastery",
    description: "Comprehensive guide to raycasting for object detection, UI interaction, and physics queries.",
    duration: "20 min",
  },
];

const YouTubeSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/10 mb-6">
            <Youtube className="w-5 h-5 text-destructive" />
            <span className="text-sm font-display uppercase tracking-wider text-destructive">YouTube Channel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            Community & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-body">
            Sharing knowledge through tutorials and educational content, 
            helping developers level up their Unity and game development skills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <div 
              key={index}
              className="glass-card p-6 hover-glow group"
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-muted to-card mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:opacity-70 transition-opacity" />
                <div className="w-14 h-14 rounded-full bg-destructive/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <Play className="w-6 h-6 text-foreground ml-1" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <BookOpen className="w-3 h-3" />
                <span>{tutorial.duration}</span>
              </div>
              <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {tutorial.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-5 h-5 mr-2" />
              Visit YouTube Channel
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
