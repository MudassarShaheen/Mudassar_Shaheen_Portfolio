import {
  Boxes,
  Glasses,
  Gamepad2,
  Network,
  Sparkles,
  Gauge,
  Wrench,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export interface Skill {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  {
    title: "Unity Development",
    description:
      "Unity 3D & C# architecture — from prototypes to production-ready, maintainable codebases.",
    icon: Boxes,
  },
  {
    title: "VR / XR Development",
    description:
      "Immersive experiences for Meta Quest and Oculus, with natural hand tracking and physics-based interaction.",
    icon: Glasses,
  },
  {
    title: "Mobile & Hypercasual Games",
    description:
      "Lightweight, addictive mobile game loops built for fast iteration and broad reach.",
    icon: Smartphone,
  },
  {
    title: "Gameplay Systems",
    description:
      "Core mechanics, progression, and interaction systems designed for clarity and feel.",
    icon: Gamepad2,
  },
  {
    title: "Multiplayer",
    description:
      "Real-time multiplayer with custom socket-based backends, matchmaking, and low-latency sync.",
    icon: Network,
  },
  {
    title: "AI Integration",
    description:
      "AI-driven gameplay and tooling — from adaptive learning experiences to AI-augmented solo development.",
    icon: Sparkles,
  },
  {
    title: "Optimization",
    description:
      "Profiling and performance tuning so experiences stay smooth across devices.",
    icon: Gauge,
  },
  {
    title: "Tools & Automation",
    description:
      "n8n workflows, CI/CD pipelines, and custom tooling that keep production moving.",
    icon: Wrench,
  },
];
