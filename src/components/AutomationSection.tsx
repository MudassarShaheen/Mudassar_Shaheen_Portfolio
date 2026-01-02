import { Cpu, GitBranch, Workflow, Zap, ExternalLink } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "n8n Workflows",
    description: "Custom automation workflows that connect apps, APIs, and services seamlessly.",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Leveraging AI models to create intelligent automation and decision-making systems.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Pipelines",
    description: "Automated build, test, and deployment pipelines for game development.",
  },
  {
    icon: Zap,
    title: "Business Logic",
    description: "Streamlined business processes through intelligent automation solutions.",
  },
];

const demoApps = [
  {
    title: "AI LinkedIn Content Automation",
    description: "Automated content generation and scheduling for LinkedIn",
    url: "https://ai-linkedin-content-automation-dbzn.vercel.app/",
  },
  {
    title: "AI English Tutor",
    description: "Interactive AI-powered English learning assistant",
    url: "https://ai-english-tutor-eta.vercel.app/",
  },
  {
    title: "AI Weather App",
    description: "Intelligent weather forecasting with AI insights",
    url: "https://ai-powered-weather-app-jet.vercel.app/",
  },
];

const AutomationSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(180_100%_50%_/_0.03)_0%,_transparent_70%)]" />
      
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <span className="text-primary font-display text-sm uppercase tracking-widest">Automation & AI</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              Intelligent
              <span className="gradient-text block">Automation Workflows</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              Beyond game development, I specialize in creating n8n automation systems 
              and custom demo applications that streamline development pipelines and 
              business operations. My expertise in AI-driven workflows helps teams 
              work smarter and faster.
            </p>
            <ul className="space-y-3 text-muted-foreground font-body">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                API integrations and webhook management
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Data transformation and processing pipelines
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Custom notification and alert systems
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                AI-powered content generation workflows
              </li>
            </ul>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 hover-glow group"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Apps Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold font-display mb-8 text-center">
            Live <span className="gradient-text">Demo Apps</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {demoApps.map((app, index) => (
              <a 
                key={index}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 hover-glow group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {app.title}
                </h4>
                <p className="text-sm text-muted-foreground font-body">
                  {app.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
