import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tutorials } from "@/data/projects";

const YouTubeSection = () => {
  return (
    <section id="tutorials" className="py-20 md:py-24 relative scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <Youtube className="w-5 h-5 text-primary" />
            <span className="text-sm font-display uppercase tracking-wider text-primary">YouTube Channel</span>
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
              className="glass-card overflow-hidden video-card-hover group"
            >
              {/* Video Embed */}
              <div className="aspect-video w-full">
                <iframe
                  src={tutorial.videoUrl}
                  title={tutorial.title}
                  loading="lazy"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {tutorial.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.youtube.com/@mudassarshaheen8816" target="_blank" rel="noopener noreferrer">
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
