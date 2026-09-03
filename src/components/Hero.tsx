const specializations = ["VR / XR", "Playable Ads", "Gameplay Systems", "AI Integration"];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Cinematic ground — the glowing portal itself lives in the shared,
          page-wide PortalScene canvas rendered behind everything */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12)_0%,_hsl(var(--background))_70%)]" />

      {/* Faint architectural grid */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="absolute top-24 right-4 sm:right-8 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/70 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span className="text-[11px] font-display uppercase tracking-[0.2em] text-muted-foreground">
          Available for select projects
        </span>
      </div>

      <div className="relative z-10 section-container">
        <div className="max-w-4xl">
          <p className="font-display text-sm md:text-base uppercase tracking-[0.4em] text-primary mb-6 animate-fade-in">
            Hello, I'm
          </p>

          <h1 className="font-display font-bold uppercase leading-[0.92] mb-8 animate-slide-up">
            <span
              className="block text-foreground"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              Mudassar
            </span>
            <span
              className="block gradient-text"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              Shaheen
            </span>
          </h1>

          <h2
            className="font-display text-lg md:text-2xl uppercase tracking-wide text-foreground mb-6 animate-slide-up flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{ animationDelay: "0.15s" }}
          >
            <span>Senior Unity Developer</span>
            <span className="text-primary/50 text-base md:text-xl" aria-hidden="true">/</span>
            <span>Technical Project Manager</span>
          </h2>

          <div
            className="flex flex-wrap gap-x-3 gap-y-2 mb-8 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            {specializations.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="font-display text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {s}
                </span>
                {i < specializations.length - 1 && (
                  <span className="text-primary/50" aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>

          <p
            className="text-base md:text-lg text-muted-foreground font-body max-w-xl mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            I design and develop interactive experiences and games that combine gameplay,
            technology and immersive real-time 3D.
          </p>

          <div
            className="flex flex-wrap items-center gap-6 animate-slide-up"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href="#projects"
              className="magnetic-btn group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.2em] bg-primary text-primary-foreground rounded-full px-8 py-4 hover:shadow-[0_0_40px_hsl(var(--primary)/0.45)] transition-shadow duration-300"
            >
              Explore My Work
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="/cv.pdf"
              download="Mudassar Resume.pdf"
              className="magnetic-btn group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
            >
              Download CV
              <span className="transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
