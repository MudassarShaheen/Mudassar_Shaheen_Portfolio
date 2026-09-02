import { useEffect, useRef } from "react";
import { milestones } from "@/data/experience";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations";

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
              start: "top 80%",
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
          <span className="section-label">05 — Experience</span>
          <h2 className="display-heading mt-4">My Journey</h2>
        </div>

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border/60">
            <div ref={lineRef} className="absolute inset-0 w-px bg-gradient-to-b from-primary to-secondary" />
          </div>

          <div className="space-y-14">
            {milestones.map((m) => (
              <div key={m.index} className="milestone-item relative">
                <span className="absolute -left-10 md:-left-14 top-1 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-2 border-primary shadow-[0_0_16px_hsl(var(--primary)/0.6)]" />
                <span className="font-display text-xs uppercase tracking-[0.3em] text-primary/80">
                  {m.period}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-1">
                  {m.role}
                </h3>
                <p className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  {m.company} · {m.location}
                </p>
                <p className="text-muted-foreground font-body max-w-2xl leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
