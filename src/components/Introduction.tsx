import { Code2, Layers, Zap, Trophy } from "lucide-react";

const stats = [
  { label: "Years in Game Dev", value: "8+", icon: Trophy },
  { label: "Shipped Titles", value: "50+", icon: Layers },
  { label: "Engines & Tools", value: "15+", icon: Code2 },
  { label: "Clients Served", value: "30+", icon: Zap },
];

const Introduction = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <span className="text-primary font-display text-sm uppercase tracking-widest">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Senior Developer &
              <span className="gradient-text block">Technical Project Manager</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              I'm a senior <span className="text-primary">Unity developer (C#)</span> and{" "}
              <span className="text-secondary">technical project manager</span> with deep
              expertise in <span className="text-primary">ECS/DOTS & performance
              optimization</span>, <span className="text-secondary">VR for Meta Quest</span>,
              and <span className="text-primary">multiplayer networking</span> — leading
              game development services end-to-end, from concept and architecture to
              production, live-ops, and delivery.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              I've shipped hyper-casual hits played by millions, architected Steam RPGs
              with deep systems, and built socket-based multiplayer backends. As a senior
              technical lead and PM, I scope, estimate, and mentor cross-functional teams —
              translating client vision into shippable, maintainable products, on time and
              on budget. <span className="text-primary">Open to remote & contract work.</span>
            </p>
            <div className="flex gap-4 pt-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
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
