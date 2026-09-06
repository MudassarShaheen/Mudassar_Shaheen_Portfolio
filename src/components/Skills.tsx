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
          <span className="section-label">04 — What I Do</span>
          <h2 className="display-heading mt-4">Skills &amp; Expertise</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, index) => {
            const rotations = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.5deg]"];
            return (
              <div
                key={skill.title}
                data-reveal
                onMouseMove={handlePointerGlow}
                className={`paper-card group relative p-6 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${rotations[index % rotations.length]}`}
              >
                {/* light that follows the cursor within the card */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.1), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    SKILL {String(index + 1).padStart(2, "0")}
                  </span>
                  <skill.icon className="w-7 h-7 text-foreground mt-3 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-display text-lg font-bold mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
