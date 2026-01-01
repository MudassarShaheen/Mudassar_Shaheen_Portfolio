import { Button } from "@/components/ui/button";
import { ArrowDown, Gamepad2, Cpu, Glasses } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(220_30%_12%)_0%,_hsl(220_20%_4%)_70%)]" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 section-container text-center">
        {/* Name badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-card/40 backdrop-blur-sm animate-fade-in">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground font-body">Available for Projects</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 animate-slide-up">
          <span className="text-foreground">MUDASSAR</span>
          <br />
          <span className="gradient-text glow-text">SHAHEEN</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-display mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Technical Game Developer & Automation Expert
        </p>

        {/* Sub-tagline */}
        <p className="text-lg md:text-xl text-primary/80 font-body max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Bridging Game Development, Immersive VR, and Intelligent Automation
        </p>

        {/* Skills icons */}
        <div className="flex justify-center gap-8 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col items-center gap-2 group">
            <div className="p-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm group-hover:border-primary/50 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-300">
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-body">Unity</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="p-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm group-hover:border-secondary/50 group-hover:shadow-[0_0_30px_hsl(var(--secondary)/0.2)] transition-all duration-300">
              <Glasses className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-xs text-muted-foreground font-body">VR/Meta Quest</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="p-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm group-hover:border-primary/50 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-300">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-body">AI & Automation</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Button variant="hero" size="xl" onClick={scrollToProjects}>
            View Projects
          </Button>
          <Button variant="outline" size="xl" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
