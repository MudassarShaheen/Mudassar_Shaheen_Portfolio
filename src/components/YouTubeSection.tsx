import { useState } from "react";
import { Youtube, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tutorials } from "@/data/projects";
import { getVideoThumbnail } from "@/lib/thumbnail";
import VideoModal from "@/components/VideoModal";

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

const YouTubeSection = () => {
  const [playing, setPlaying] = useState<{ url: string; title: string } | null>(null);

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
            <button
              key={index}
              type="button"
              onClick={() => setPlaying({ url: tutorial.videoUrl, title: tutorial.title })}
              className="paper-card group text-left overflow-hidden"
            >
              <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                {getVideoThumbnail(tutorial.videoUrl) && (
                  <img
                    src={getVideoThumbnail(tutorial.videoUrl)!}
                    alt=""
                    loading="lazy"
                    onError={hideOnError}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <span className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-foreground bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </span>
              </div>
              <div className="p-5 border-t-2 border-foreground/70">
                <h3 className="text-lg font-bold font-display mb-2">{tutorial.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{tutorial.description}</p>
              </div>
            </button>
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

      <VideoModal
        videoUrl={playing?.url ?? null}
        title={playing?.title ?? ""}
        onClose={() => setPlaying(null)}
      />
    </section>
  );
};

export default YouTubeSection;
