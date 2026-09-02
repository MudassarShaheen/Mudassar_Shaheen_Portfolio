import { useEffect, useRef } from "react";
import { Code2, Layers, Zap, Trophy } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";

const stats = [
  { label: "Years Experience", value: "6+", icon: Trophy },
  { label: "Shipped Titles", value: "50+", icon: Layers },
  { label: "Engines & Tools", value: "15+", icon: Code2 },
  { label: "Clients Served", value: "30+", icon: Zap },
];

const Introduction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      revealOnScroll(sectionRef.current.querySelectorAll("[data-reveal]"));
    }
  }, []);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      visual.style.setProperty("--px", `${x * 16}px`);
      visual.style.setProperty("--py", `${y * 16}px`);
    };
    visual.addEventListener("mousemove", onMove);
    return () => visual.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6" data-reveal>
            <span className="section-label">02 — About</span>
            <h2 className="display-heading">
              I BUILD GAMES AND
              <span className="gradient-text block">IMMERSIVE EXPERIENCES.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              With experience across game development, VR/XR, and interactive systems, I
              bring ideas to life with clean architecture, optimized performance and
              engaging gameplay.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              I'm a senior <span className="text-primary">Unity developer (C#)</span> and{" "}
              <span className="text-secondary">technical project manager</span> — leading
              game development end-to-end, from concept and architecture to production,
              live-ops and delivery. I've shipped hyper-casual hits played by millions,
              architected Steam RPGs with deep systems, and built socket-based multiplayer
              backends. <span className="text-primary">Open to remote &amp; contract work.</span>
            </p>
            <div className="flex gap-4 pt-2">
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
              <div className="h-1 w-10 bg-muted rounded-full" />
              <div className="h-1 w-5 bg-muted rounded-full" />
            </div>
          </div>

          {/* Abstract parallax "dev environment" visual — procedural, no external assets */}
          <div
            ref={visualRef}
            data-reveal
            className="relative aspect-square max-w-md mx-auto lg:mx-0 [perspective:1000px]"
          >
            <div
              className="absolute inset-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-transform duration-300 ease-out"
              style={{ transform: "translate3d(var(--px, 0), var(--py, 0), 0)" }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
                </div>
                <div className="space-y-2 font-mono text-[11px] text-muted-foreground/80 flex-1 overflow-hidden">
                  <p><span className="text-secondary">class</span> <span className="text-primary">GameplaySystem</span> : MonoBehaviour {"{"}</p>
                  <p className="pl-4"><span className="text-secondary">void</span> Update() {"{"}</p>
                  <p className="pl-8">HandleInput();</p>
                  <p className="pl-8">UpdatePhysics(Time.deltaTime);</p>
                  <p className="pl-8">SyncState();</p>
                  <p className="pl-4">{"}"}</p>
                  <p>{"}"}</p>
                </div>
                <div className="h-px w-full bg-border/60 my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-display uppercase tracking-[0.2em] text-muted-foreground">
                    Unity · C# · Runtime
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </div>
            <div
              className="absolute -inset-2 -z-10 rounded-3xl bg-[radial-gradient(circle,_hsl(var(--primary)/0.25)_0%,_transparent_70%)] blur-2xl transition-transform duration-500 ease-out"
              style={{ transform: "translate3d(calc(var(--px, 0) * -1), calc(var(--py, 0) * -1), 0)" }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20" data-reveal>
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 hover-glow group">
              <stat.icon className="w-7 h-7 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl md:text-4xl font-bold font-display gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
