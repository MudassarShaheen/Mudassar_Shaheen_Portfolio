import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import HeroScene from "@/components/HeroScene";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(220_30%_12%)_0%,_hsl(220_20%_4%)_70%)]" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Single 3D glowing object, reacts to mouse & scroll */}
      <HeroScene />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Availability status */}
      <div className="absolute top-24 right-4 sm:right-8 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] font-display uppercase tracking-[0.15em] text-muted-foreground">
          Available for select projects
        </span>
      </div>

      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto glass-card p-10 md:p-16 text-center">
          {/* Role badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs md:text-sm text-primary font-display uppercase tracking-[0.25em]">
              Unity Game Developer · Technical Project Manager
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-8 animate-slide-up leading-[1.05]">
            <span className="gradient-text glow-text">Mudassar Shaheen</span>
          </h1>

          {/* Tagline with colored keywords */}
          <p
            className="text-lg md:text-2xl text-muted-foreground font-body max-w-3xl mx-auto mb-4 animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Building interactive games, immersive experiences, and real-time systems across{" "}
            <span className="text-secondary font-semibold">Hypercasual</span>,{" "}
            <span className="text-primary font-semibold">VR/AR</span>, and{" "}
            <span className="text-foreground font-semibold">Steam/PC</span> platforms.
          </p>
          <p
            className="text-sm text-muted-foreground/80 font-body mb-10 animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            8+ years leading teams and delivering shipped titles · Remote · Worldwide
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" onClick={scrollToProjects}>
              View My Work
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#contact">Let's Work Together</a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 animate-float">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
