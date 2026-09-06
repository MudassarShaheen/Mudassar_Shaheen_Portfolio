import { useEffect } from "react";
import type { CSSProperties } from "react";
import { isSoundEnabled, playCardLandSound } from "@/lib/sound";

const attributes = [
  { label: "ATTR 01", title: "Unity Development", tags: "C# · Gameplay Systems · Architecture" },
  { label: "ATTR 02", title: "VR / XR", tags: "Meta Quest · Hand Tracking · Spatial UI" },
  { label: "ATTR 03", title: "Full-Cycle Dev", tags: "Client Delivery · Live Builds · Optimization" },
  { label: "ATTR 04", title: "Multiplayer", tags: "Socket.IO · Networking · Matchmaking" },
  { label: "ATTR 05", title: "AI Integration", tags: "AI-Assisted Dev · Voice AI · Automation" },
];

const stats = [
  { value: "7+", label: "Years" },
  { value: "20+", label: "Titles Shipped" },
  { value: "30+", label: "Clients Served" },
];

const Hero = () => {
  // Matching SFX for each attribute card's zoom-to-place landing (see the
  // .card-settle-in / .card-settle-in::after keyframes in index.css for
  // the VFX side). Skipped under prefers-reduced-motion, since those
  // animations resolve instantly rather than on their real timeline.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Card animations: delay = 0.5 + i*0.12, duration = 0.8s
    // Sound should play when card lands (animation completes) = delay + duration
    const timers = attributes.map((_, i) =>
      window.setTimeout(() => {
        if (isSoundEnabled()) playCardLandSound();
      }, (0.5 + i * 0.12 + 0.8) * 1000)
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const handleCardClick = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:min-h-[42rem]">
      <div className="absolute inset-0 paper-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />

      <div className="relative z-10 section-container">
        {/* Attribute cards — scattered, tilted, stat-sheet style. Each card
            gets enough vertical room (7.5rem step) so rotated corners never
            cover the next card's text, plus a staggered fade/settle-in on
            load (via CSS vars so one keyframe serves every rotation). */}
        <div className="hidden lg:block absolute top-0 right-0 w-[28rem] h-[34rem]" aria-hidden="false">
          {attributes.map((a, i) => {
            const rotations = [-2, 2, -1.5, 2.5, -2];
            const offsets = [
              { top: "0rem", right: "1rem" },
              { top: "7.5rem", right: "12.5rem" },
              { top: "15rem", right: "0.5rem" },
              { top: "22.5rem", right: "13rem" },
              { top: "29.5rem", right: "2rem" },
            ];
            return (
              <button
                key={a.label}
                type="button"
                onClick={handleCardClick}
                className="paper-card absolute w-64 p-4 card-settle-in hover:shadow-[6px_6px_0_0_hsl(var(--primary)/0.9)] transition-shadow duration-300 cursor-pointer text-left"
                style={
                  {
                    ...offsets[i],
                    "--rot": `${rotations[i]}deg`,
                    animationDelay: `${0.5 + i * 0.12}s`,
                  } as CSSProperties
                }
              >
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {a.label}
                </span>
                <h3 className="font-display text-lg font-bold uppercase mt-1">{a.title}</h3>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mt-1">
                  {a.tags}
                </p>
              </button>
            );
          })}
        </div>

        <div className="max-w-3xl">
          <p className="font-display text-xs md:text-sm uppercase tracking-[0.35em] text-primary mb-6 animate-fade-in">
            Turning gameplay ideas into shipped, playable builds
          </p>

          <h1 className="font-display font-bold uppercase leading-[0.9] mb-6 animate-slide-up">
            <span className="block text-foreground" style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}>
              Mudassar
            </span>
            <span className="block gradient-text" style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}>
              Shaheen
            </span>
          </h1>

          <h2
            className="font-display text-lg md:text-2xl text-foreground/80 mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Senior Unity Developer &amp; Technical Project Manager
          </h2>

          <p
            className="text-base md:text-lg text-muted-foreground font-body max-w-xl mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Building games, interactive experiences, playable ads and immersive digital
            products — from gameplay systems to full client delivery.
          </p>

          {/* Stat readout */}
          <div
            className="flex flex-wrap gap-8 mb-10 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-display">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap items-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#projects"
              className="magnetic-btn group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.15em] bg-primary text-primary-foreground rounded-md px-7 py-3.5 border-2 border-foreground shadow-[3px_3px_0_0_hsl(var(--foreground))] hover:shadow-[1px_1px_0_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            >
              Work
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="magnetic-btn group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.15em] text-foreground border-2 border-foreground rounded-md px-7 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Let's Talk
            </a>
            <a
              href="/cv.pdf"
              download="Mudassar's Resume.pdf"
              className="magnetic-btn group inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Download CV
              <span className="transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>

        {/* Mobile: attribute cards stacked below hero copy */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 mt-14">
          {attributes.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={handleCardClick}
              className="paper-card p-3 cursor-pointer text-left hover:shadow-[4px_4px_0_0_hsl(var(--primary)/0.7)] transition-shadow duration-300"
            >
              <span className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                {a.label}
              </span>
              <h3 className="font-display text-sm font-bold uppercase mt-1">{a.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
