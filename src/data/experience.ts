export interface Milestone {
  index: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
}

/** Real career history, taken directly from Mudassar's résumé. */
export const milestones: Milestone[] = [
  {
    index: "01",
    role: "Unity Game Developer",
    company: "Ingenious Concepts",
    location: "Lahore, Pakistan",
    period: "Mar 2018 — Dec 2019",
    description:
      "Built a multiplayer card game for a UK-based client, working closely with one fellow developer.",
  },
  {
    index: "02",
    role: "Unity Game Developer",
    company: "Anabitech",
    location: "Lahore, Pakistan",
    period: "Jan 2020 — Dec 2023",
    description:
      "Joined a mixed-reality and promotional-games studio as an early hire and helped grow the development team to three. Developed 2D and 3D games for Android and Apple, shipping 20+ products across the App Store and Google Play.",
  },
  {
    index: "03",
    role: "Senior Unity Developer",
    company: "ArgonTeq",
    location: "Lahore, Pakistan",
    period: "Feb 2024 — 2024",
    description:
      "Delivered Unity development for a services-based studio, working directly with client requirements on long-running builds — including Wenet (an AI-powered English-learning game with real-time voice-to-voice NPC conversations), a Solana blockchain integration, and a VR painting application.",
  },
  {
    index: "04",
    role: "Technical Project Manager",
    company: "ArgonTeq",
    location: "Lahore, Pakistan",
    period: "2025 — Present",
    description:
      "Promoted to lead technical delivery across client engagements — scoping architecture, coordinating development teams, and owning projects end-to-end from planning through production and delivery.",
  },
];
