import ProjectCard from "./ProjectCard";
import { Glasses } from "lucide-react";

const vrProjects = [
  {
    title: "Immersive Meditation",
    description: "A calming VR experience designed for Meta Quest that guides users through peaceful environments with guided meditation sessions and biofeedback integration.",
    tags: ["Meta Quest", "Wellness", "VR", "Oculus"],
  },
  {
    title: "VR Physics Interactions",
    description: "Technical demonstration of advanced physics-based interactions in VR, featuring realistic object manipulation, hand tracking, and haptic feedback systems.",
    tags: ["Meta Quest", "Physics", "Hand Tracking", "Oculus"],
  },
];

const VRProjects = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="section-container relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
            <Glasses className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              VR & <span className="gradient-text">Metaverse Experiences</span>
            </h2>
            <p className="text-muted-foreground font-body">Meta Quest and Oculus VR development</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {vrProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* VR Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "VR Projects", value: "10+" },
            { label: "Meta Quest Apps", value: "5" },
            { label: "Hand Tracking", value: "Expert" },
            { label: "Spatial Audio", value: "Yes" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl border border-border/50 bg-card/30">
              <div className="text-2xl font-bold font-display text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VRProjects;
