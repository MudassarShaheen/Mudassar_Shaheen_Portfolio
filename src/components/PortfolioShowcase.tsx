import FeaturedProjects from "./FeaturedProjects";
import HyperCasualGallery from "./HyperCasualGallery";
import AISoloDevShowcase from "./AISoloDevShowcase";
import YouTubeSection from "./YouTubeSection";

/**
 * Orchestrates the project-related sections in one continuous flow:
 * the major featured builds, the mobile/hypercasual gallery, the AI solo
 * R&D prototypes, and the YouTube/tutorials community work.
 */
const PortfolioShowcase = () => {
  return (
    <>
      <FeaturedProjects />
      <AISoloDevShowcase />
      <HyperCasualGallery />
      <YouTubeSection />
    </>
  );
};

export default PortfolioShowcase;
