import { useEffect, useRef } from "react";
import { technologies } from "@/data/tech";
import { revealOnScroll } from "@/lib/animations";

const TechWall = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      revealOnScroll(sectionRef.current.querySelectorAll("[data-reveal]"));
    }
  }, []);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = wall.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      wall.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "1");
        el.style.transform = `translate3d(${x * 12 * depth}px, ${y * 12 * depth}px, 0)`;
      });
    };
    wall.addEventListener("mousemove", onMove);
    return () => wall.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="section-container" ref={sectionRef}>
        <div className="mb-16 max-w-2xl" data-reveal>
          <span className="section-label">06 — Toolset</span>
          <h2 className="display-heading mt-4">Technology</h2>
        </div>

        <div
          ref={wallRef}
          data-reveal
          className="flex flex-wrap gap-4 md:gap-5"
        >
          {technologies.map((tech, i) => (
            <span
              key={tech}
              data-depth={((i % 3) + 1) * 0.6}
              className="font-display text-sm md:text-base uppercase tracking-wider px-5 py-3 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechWall;
