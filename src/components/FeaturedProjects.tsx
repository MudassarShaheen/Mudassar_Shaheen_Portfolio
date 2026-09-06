import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { getVideoThumbnail } from "@/lib/thumbnail";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import VideoModal from "@/components/VideoModal";

const openUrl = (url: string) => url.replace("/embed/", "/watch?v=");

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

/**
 * A "cartridge select" project browser: one large active project at a
 * time (video + details), Prev/Next controls, an "X of N" counter, and a
 * filmstrip of every project below for jumping straight to one.
 */
const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const project = projects[active];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-selector",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const go = (dir: 1 | -1) => {
    setPlaying(false);
    setActive((i) => (i + dir + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 relative scroll-mt-24">
      <div className="section-container">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className="section-label">03 — Browse Projects</span>
          <h2 className="display-heading mt-4">Built. Shipped. Played.</h2>
          <p className="text-muted-foreground font-body mt-4 text-lg">
            A collection of games and interactive experiences built across mobile, VR, and PC.
          </p>
        </div>

        <div className="project-selector">
          <div
            key={active}
            className="project-detail-fade grid lg:grid-cols-2 gap-8 lg:gap-14 items-start"
          >
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${project.title}`}
              className="paper-card group overflow-hidden -rotate-[0.3deg] block w-full text-left"
            >
              <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                {getVideoThumbnail(project.videoUrl) && (
                  <img
                    key={project.videoUrl}
                    src={getVideoThumbnail(project.videoUrl)!}
                    alt=""
                    loading="eager"
                    onError={hideOnError}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <span className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-foreground bg-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </span>
              </div>
            </button>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-foreground text-background">
                  {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <span className="font-display text-xs uppercase tracking-[0.25em] text-primary">
                  {project.category}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-5 max-w-lg">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-display uppercase tracking-wider px-3 py-1.5 rounded-full border-2 border-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={openUrl(project.videoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => go(-1)}
                    className="p-2 rounded-md border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => go(1)}
                    className="p-2 rounded-md border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mt-3">
                Drag / use arrows to browse
              </p>
            </div>
          </div>

          {/* Filmstrip — jump straight to any project */}
          <div className="flex gap-3 overflow-x-auto pb-2 mt-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setActive(i)}
                className={`relative shrink-0 w-24 h-16 rounded-md border-2 overflow-hidden flex items-center justify-center font-display text-xs font-bold transition-colors ${
                  i === active
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-foreground/30 hover:border-foreground"
                }`}
                aria-label={p.title}
              >
                {getVideoThumbnail(p.videoUrl) && (
                  <img
                    src={getVideoThumbnail(p.videoUrl)!}
                    alt=""
                    loading="lazy"
                    onError={hideOnError}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                      i === active ? "opacity-100" : "opacity-60 hover:opacity-90"
                    }`}
                  />
                )}
                <span
                  className={`relative px-1.5 py-0.5 rounded ${
                    i === active ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        videoUrl={playing ? project.videoUrl : null}
        title={project.title}
        onClose={() => setPlaying(false)}
      />
    </section>
  );
};

export default FeaturedProjects;
