import { useEffect, useRef } from "react";
import { milestones } from "@/data/experience";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations";

// Oldest role first, current role last — the timeline reads bottom-up like
// a level progression, ending on where the journey is right now.
const levels = milestones;

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".milestone-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 relative scroll-mt-24">
      <div className="section-container">
        <div className="mb-16 max-w-2xl">
          <span className="section-label">05 — My Path</span>
          <h2 className="display-heading mt-4">Where I've Leveled Up</h2>
          <p className="text-muted-foreground font-body mt-4 text-lg">
            A timeline of roles and studios — each level unlocking new responsibility.
          </p>
        </div>

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border">
            <div ref={lineRef} className="absolute inset-0 w-px bg-gradient-to-b from-primary to-secondary" />
          </div>

          <div className="space-y-10">
            <div className="milestone-item relative pb-2">
              <span className="absolute -left-10 md:-left-14 top-1 w-3 h-3 -translate-x-1/2 rotate-45 border-2 border-foreground bg-background" />
              <span className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Quest began here
              </span>
            </div>

            {levels.map((m, i) => {
              const isCurrent = i === levels.length - 1;
              const levelNum = i + 1;
              return (
                <div key={m.index} className="milestone-item relative">
                  <span
                    className={`absolute -left-10 md:-left-14 top-1 w-5 h-5 -translate-x-1/2 rounded-full border-2 border-foreground bg-background flex items-center justify-center ${
                      isCurrent ? "shadow-[0_0_0_4px_hsl(var(--primary)/0.25)]" : ""
                    }`}
                  >
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </span>

                  <div className="paper-card inline-block p-5 md:p-6 -rotate-[0.4deg] hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-foreground text-background">
                        {isCurrent ? "NOW" : `LVL ${String(levelNum).padStart(2, "0")}`}
                      </span>
                      <span className="font-display text-xs uppercase tracking-[0.25em] text-primary">
                        {m.period}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-1">{m.role}</h3>
                    <p className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      {m.company} · {m.location}
                    </p>
                    <p className="text-muted-foreground font-body max-w-2xl leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
