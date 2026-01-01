import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import FeaturedProjects from "@/components/FeaturedProjects";
import SteamProjects from "@/components/SteamProjects";
import VRProjects from "@/components/VRProjects";
import AutomationSection from "@/components/AutomationSection";
import HyperCasualGallery from "@/components/HyperCasualGallery";
import YouTubeSection from "@/components/YouTubeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <section id="about">
        <Introduction />
      </section>
      <FeaturedProjects />
      <section id="steam">
        <SteamProjects />
      </section>
      <section id="vr">
        <VRProjects />
      </section>
      <HyperCasualGallery />
      <section id="automation">
        <AutomationSection />
      </section>
      <YouTubeSection />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
