import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { gsap, prefersReducedMotion } from "@/lib/animations";

const openUrl = (url: string) => url.replace("/embed/", "/watch?v=");

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const hero = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-scene").forEach((scene) => {
        gsap.fromTo(
          scene,
          { opacity: 0, y: 50, clipPath: "inset(8% 0% 8% 0% round 1rem)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scene,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".project-carousel",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".project-carousel", start: "top 88%", toggleActions: "play none none reverse" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 280) + 20;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 280) + 20;
    setActiveDot(Math.round(track.scrollLeft / step));
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 relative scroll-mt-24">
      <div className="section-container">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className="section-label">04 — Featured Projects</span>
          <h2 className="display-heading mt-4">Some Things I've Built</h2>
          <p className="text-muted-foreground font-body mt-4 text-lg">
            A curated selection of game development work spanning multiple platforms —
            from AI-powered learning games to VR experiences and multiplayer systems.
          </p>
        </div>

        {/* Hero pieces — full cinematic treatment for the standout work */}
        <div className="space-y-14 md:space-y-20">
          {hero.map((project, index) => (
            <article
              key={project.title}
              className={`project-scene group grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative">
                <span className="absolute -top-7 left-0 font-display text-5xl md:text-7xl font-bold text-transparent [-webkit-text-stroke:1px_hsl(var(--border))] select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
                  <div className="aspect-video w-full bg-muted">
                    <iframe
                      src={project.videoUrl}
                      title={project.title}
                      loading="lazy"
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              <div>
                <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-3 mb-3 transition-transform duration-300 group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed mb-5 max-w-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-display uppercase tracking-wider px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={openUrl(project.videoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Compact carousel — the rest of the catalogue, dense and scannable */}
        <div className="project-carousel mt-16 md:mt-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              More Projects
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => scrollByCard(-1)}
                className="p-2 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => scrollByCard(1)}
                className="p-2 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {rest.map((project) => (
              <a
                key={project.title}
                data-card
                href={openUrl(project.videoUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="group snap-start shrink-0 w-[260px] sm:w-[280px] glass-card overflow-hidden hover-glow"
              >
                <div className="aspect-video w-full bg-muted overflow-hidden">
                  <iframe
                    src={project.videoUrl}
                    title={project.title}
                    loading="lazy"
                    className="w-full h-full pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    allow="accelerometer; encrypted-media; picture-in-picture"
                  />
                </div>
                <div className="p-4">
                  <span className="font-display text-[10px] uppercase tracking-[0.25em] text-primary">
                    {project.category}
                  </span>
                  <h4 className="font-display text-base font-semibold mt-1.5 mb-2 group-hover:text-primary transition-colors truncate">
                    {project.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-display uppercase tracking-wider px-2 py-1 rounded-full border border-border/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-2">
            {rest.map((project, i) => (
              <span
                key={project.title}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === activeDot ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
