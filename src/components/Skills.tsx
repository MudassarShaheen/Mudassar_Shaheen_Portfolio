import { useEffect, useRef } from "react";
import { skills } from "@/data/skills";
import { revealOnScroll } from "@/lib/animations";

const handlePointerGlow = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      revealOnScroll(sectionRef.current.querySelectorAll("[data-reveal]"));
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 relative scroll-mt-24">
      <div className="section-container">
        <div className="mb-16 max-w-2xl" data-reveal>
          <span className="section-label">03 — What I Do</span>
          <h2 className="display-heading mt-4">Skills &amp; Expertise</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              data-reveal
              onMouseMove={handlePointerGlow}
              className="group relative bg-background p-8 overflow-hidden transition-colors duration-300 hover:bg-card/60"
              style={{ transitionDelay: `${index * 0.02}s` }}
            >
              {/* light that follows the cursor within the card */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.14), transparent 70%)",
                }}
              />
              <div className="relative">
                <skill.icon className="w-8 h-8 text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
