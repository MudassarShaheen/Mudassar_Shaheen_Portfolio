import { useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import SteamProjects from "./SteamProjects";
import VRProjects from "./VRProjects";
import HyperCasualGallery from "./HyperCasualGallery";
import YouTubeSection from "./YouTubeSection";

const categories = [
  { id: "all", label: "All" },
  { id: "client", label: "Client Projects" },
  { id: "hypercasual", label: "Hypercasual" },
  { id: "puzzle", label: "Puzzle" },
  { id: "steam", label: "Steam/PC" },
  { id: "vr", label: "VR/AR" },
  { id: "tutorials", label: "Tutorials" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const PortfolioShowcase = () => {
  const [active, setActive] = useState<CategoryId>("all");

  const show = (id: CategoryId) => active === "all" || active === id;

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="section-container">
        <div className="mb-12">
          <span className="text-primary font-display text-sm uppercase tracking-widest">
            Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-display mt-4">
            Portfolio Showcase
          </h2>
          <p className="text-lg text-muted-foreground font-body mt-4 max-w-2xl">
            A curated selection of game development work spanning multiple years,
            engines, and platform specializations.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-4 overflow-x-auto">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-xl">
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-display text-xs md:text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-secondary text-secondary-foreground shadow-[0_0_30px_hsl(var(--secondary)/0.4)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {show("client") && <FeaturedProjects />}
        {(show("hypercasual") || active === "puzzle") && <HyperCasualGallery />}
        {show("steam") && <SteamProjects />}
        {show("vr") && <VRProjects />}
        {show("tutorials") && <YouTubeSection />}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
