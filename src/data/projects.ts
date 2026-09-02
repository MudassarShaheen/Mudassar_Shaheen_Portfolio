export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  videoUrl: string;
  /** Portrait (9:16) clips render differently than 16:9 embeds. */
  aspect?: "video" | "portrait";
  featured?: boolean;
}

/**
 * Every project below is pulled directly from the existing portfolio
 * content (FeaturedProjects, SteamProjects, VRProjects, HyperCasualGallery,
 * AISoloDevShowcase) — nothing here is invented.
 */
export const projects: Project[] = [
  {
    title: "Wenet — AI-Powered English Learning Game",
    category: "AI-Powered Learning",
    description:
      "A Unity 3D game where players hold real-time voice-to-voice conversations with AI-driven NPCs to practice English. Built the full speaking pipeline — voice capture, speech-to-text, AI pronunciation scoring, and lip-synced AI-generated replies — plus a backend-driven quiz engine spanning five task types, shipped with four-language localization.",
    tags: ["Unity", "AI Voice", "EdTech", "Localization"],
    videoUrl: "https://www.youtube.com/embed/FJ5CewpYzHE",
    featured: true,
  },
  {
    title: "Zanthalar — Multiplayer Card Game",
    category: "Multiplayer",
    description:
      "A real-time online multiplayer card game built with Unity and a custom Node.js socket-based backend. Strategic card battles, matchmaking, persistent profiles, and low-latency networking for competitive play.",
    tags: ["Unity", "Multiplayer", "Socket.IO", "Custom Backend"],
    videoUrl: "https://www.youtube.com/embed/ybfDXeDwyZc",
    featured: true,
  },
  {
    title: "Fracture Fables",
    category: "PC / Steam RPG",
    description:
      "A professional RPG featuring rich storytelling, complex character progression, and immersive world-building — developed for Steam with AAA-quality mechanics and production values.",
    tags: ["Unity", "RPG", "Steam", "PC"],
    videoUrl: "https://www.youtube.com/embed/2hyubtj3m0o",
    featured: true,
  },
  {
    title: "Car Paint Project",
    category: "Technical Art",
    description:
      "Technical showcase demonstrating advanced shader programming and realistic paint simulation systems.",
    tags: ["Unity", "Shaders", "Technical Art"],
    videoUrl: "https://www.youtube.com/embed/kdRgFFxWmk4",
    featured: true,
  },
  {
    title: "Royal Champs",
    category: "Multiplayer Mobile",
    description:
      "A competitive multiplayer game featuring royal battle mechanics with strategic gameplay elements.",
    tags: ["Unity", "Multiplayer", "Mobile"],
    videoUrl: "https://drive.google.com/file/d/1snmlPrDNJZBrBlRuCaOMWgm_r_G4G2IN/preview",
  },
  {
    title: "Kids Game Project",
    category: "Educational",
    description:
      "Engaging educational games designed specifically for children with colorful visuals and intuitive controls.",
    tags: ["Unity", "Educational", "Kids"],
    videoUrl: "https://drive.google.com/file/d/137Ty4nBKqdfnLHL5Sra5ULowBcw6YSbs/preview",
  },
  {
    title: "Immersive Meditation in VR",
    category: "VR / Meta Quest",
    description:
      "A calming VR experience for Meta Quest that guides users through peaceful environments with guided meditation sessions.",
    tags: ["Meta Quest", "VR", "Wellness"],
    videoUrl: "https://www.youtube.com/embed/VrpOE-4iQU8",
  },
  {
    title: "VR Physics & Rigidbody Interaction",
    category: "VR / Physics",
    description:
      "Technical demonstration of advanced physics-based interaction in VR, featuring realistic object manipulation with physical hands.",
    tags: ["Meta Quest", "Physics", "Hand Tracking"],
    videoUrl: "https://www.youtube.com/embed/UKLCynXzaf8",
  },
  {
    title: "Unity VR Physics Interaction",
    category: "VR / Metaverse",
    description:
      "VR physics interaction development for Metaverse and Oculus Quest 2 environments.",
    tags: ["Unity", "VR Development", "Metaverse"],
    videoUrl: "https://www.youtube.com/embed/e3kWlnI2eLU",
  },
  {
    title: "Meta Quest Hand Interactions",
    category: "VR / Hand Tracking",
    description:
      "Unity Meta Quest / Oculus 2 hand interactions showcasing natural hand tracking and gesture controls.",
    tags: ["Meta Quest", "Hand Tracking"],
    videoUrl: "https://www.youtube.com/embed/yuKlAclu2uo",
  },
];

export interface AISoloBuild {
  title: string;
  videoUrl: string;
}

/** Solo R&D prototypes built end-to-end with Claude Code + Unity MCP. */
export const aiSoloBuilds: AISoloBuild[] = [
  { title: "Gameplay Prototype #1", videoUrl: "https://www.youtube.com/embed/NizVCQeQjzo" },
  { title: "Gameplay Prototype #2", videoUrl: "https://www.youtube.com/embed/lcW3cdFKDdc" },
  { title: "Gameplay Prototype #3", videoUrl: "https://www.youtube.com/embed/9DzZKBVYcPU" },
];

export interface MobileGame {
  name: string;
  videos: string[];
}

export const hyperCasualGames: MobileGame[] = [
  { name: "SkinCare", videos: ["https://drive.google.com/file/d/1FfMIwz4FrLhHXio9hsf21zQUaBousql0/preview", "https://drive.google.com/file/d/1FdNPb_bc31I2dQf-R-_rYqNtK6fOLIMl/preview"] },
  { name: "MagicMaster", videos: ["https://drive.google.com/file/d/1RIWUbyLqBS4zN45Bws3HLK8MXz2V9Mur/preview"] },
  { name: "Prisoner Escape", videos: ["https://drive.google.com/file/d/1AoDpziTDPSbuzsNAai6-MFXrpNJrAPgA/preview"] },
  { name: "SchoolRush3D", videos: ["https://drive.google.com/file/d/17BLYD6fgtAid-zJeq5IfaAT9yQDCc2rg/preview"] },
  { name: "SurvivalRush", videos: ["https://drive.google.com/file/d/1LWwaxWjnajrlLQAxSxouKD3l31rQDwCj/preview"] },
  { name: "Boomerang", videos: ["https://drive.google.com/file/d/1Ch-GwtEYWIwa4XKviFWXGBSgpHRBCGd_/preview", "https://drive.google.com/file/d/1-WjnJxGkrH2kd7fqke_NUErvORm8yGVl/preview"] },
  { name: "DigitRun", videos: ["https://drive.google.com/file/d/1icB9QEC3kjdaA--HbkrEderjFv8FkmK3/preview"] },
  { name: "TrainRush", videos: ["https://drive.google.com/file/d/1D8Ym1CqBoXdfjay8z3nJM2LLdSFHFNDa/preview"] },
  { name: "TailorMasterIdle", videos: ["https://drive.google.com/file/d/1gDZsoMXL-aCWovgtXrdhWsGcd26ZEqOk/preview"] },
  { name: "Water Park", videos: ["https://drive.google.com/file/d/1xoGOVFBOvSeWxv9se2mAifCJRfGtgVGI/preview"] },
];

export const puzzleGames: MobileGame[] = [
  { name: "Traffic Jam", videos: ["https://drive.google.com/file/d/1-8lXtzitCIQJBIWxvKT21zrIgDVU4KDP/preview"] },
  { name: "Number Puzzle", videos: ["https://drive.google.com/file/d/1dOdoUD9ti7xdXeOk5V3dHe_ufJTx5gdb/preview"] },
];

export interface Tutorial {
  title: string;
  description: string;
  videoUrl: string;
}

export const tutorials: Tutorial[] = [
  {
    title: "Vector3 Techniques for Unity",
    description: "Top Game Developer Reveals Best Vector3 Techniques for Unity — a deep dive into Vector3 operations and transformations.",
    videoUrl: "https://www.youtube.com/embed/RQpWAN8-1bg",
  },
  {
    title: "Lerp vs Slerp Explained",
    description: "Unity Movement MISTAKES: Lerp vs Slerp EXPOSED — understanding the differences between linear and spherical interpolation.",
    videoUrl: "https://www.youtube.com/embed/KXgyGR03uSw",
  },
  {
    title: "Raycast Types in Unity",
    description: "Raycast vs CapsuleCast — the #1 physics mistake game developers make. A comprehensive guide to raycasting.",
    videoUrl: "https://www.youtube.com/embed/oNHwBn3CnNU",
  },
];
