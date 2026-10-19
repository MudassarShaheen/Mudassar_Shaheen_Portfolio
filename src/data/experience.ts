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
      "Joined a mixed-reality and promotional-games studio as an early hire and helped build out its development team. Developed 2D and 3D games for Android and iOS, shipping 20+ products across the App Store and Google Play.",
  },
  {
    index: "03",
    role: "Senior Unity Developer",
    company: "ArgonTeq",
    location: "Lahore, Pakistan",
    period: "Feb 2024 — 2025",
    description:
      "Delivered Unity development for a services-based studio, working directly with client requirements on long-running game builds. Built a long-term kids' road-trip game with live map-based location tracking, a car wash and customization system, and multiple embedded mini-games. Shipped a blockchain integration using the Solana SDK and a VR painting application for Meta Quest.",
  },
  {
    index: "04",
    role: "Technical Project Manager",
    company: "ArgonTeq",
    location: "Lahore, Pakistan",
    period: "2025 — Present",
    description:
      "Scope and plan client engagements, coordinate development across the team, and own delivery from architecture through launch. Led delivery of Wenet, an AI-powered English-learning game, and Zanthalar, a real-time multiplayer card game built on Unity with a custom Node.js / Socket.IO backend — matchmaking, persistent profiles and low-latency networking.",
  },
];
