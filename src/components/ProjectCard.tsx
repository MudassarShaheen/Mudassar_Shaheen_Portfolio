import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  videoUrl?: string;
  link?: string;
  featured?: boolean;
}

const ProjectCard = ({ title, description, tags, image, videoUrl, link, featured = false }: ProjectCardProps) => {
  return (
    <div className={`glass-card overflow-hidden hover-glow group ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      {/* Media container */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
        {videoUrl ? (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-secondary/20" />
            {image && (
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">
            {title}
          </h3>
          {link && (
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm font-body line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs font-display uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
