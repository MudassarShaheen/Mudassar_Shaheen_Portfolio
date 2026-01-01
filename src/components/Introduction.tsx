import { Code2, Layers, Zap, Trophy } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "8+", icon: Trophy },
  { label: "Projects Delivered", value: "50+", icon: Layers },
  { label: "Technologies", value: "15+", icon: Code2 },
  { label: "Happy Clients", value: "30+", icon: Zap },
];

const Introduction = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <span className="text-primary font-display text-sm uppercase tracking-widest">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Crafting Digital
              <span className="gradient-text block">Experiences</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              I am a versatile developer with deep expertise in{" "}
              <span className="text-primary">Unity</span>,{" "}
              <span className="text-secondary">VR development for Meta Quest</span>, and{" "}
              <span className="text-primary">AI-driven workflows</span>.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              From creating Hyper-Casual hits that captivate millions to building complex 
              Steam RPGs with intricate gameplay systems, I bring technical excellence 
              to every project. My expertise extends to crafting automated n8n systems 
              that streamline development pipelines and business operations.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
              <div className="h-1 w-10 bg-muted rounded-full" />
              <div className="h-1 w-5 bg-muted rounded-full" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card p-6 hover-glow group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-4xl font-bold font-display gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
