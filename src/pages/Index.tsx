import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import PortalScene from "@/components/PortalScene";
import MouseLiquid from "@/components/MouseLiquid";
import AudioControls from "@/components/AudioControls";
import { useUiSounds } from "@/hooks/use-ui-sounds";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Skills from "@/components/Skills";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import Experience from "@/components/Experience";
import TechWall from "@/components/TechWall";
import AutomationSection from "@/components/AutomationSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useUiSounds();

  // Lazy-loaded iframes (YouTube embeds) and web fonts settling in shift
  // page layout after ScrollTrigger has already measured everything,
  // which drifts every trigger below that point — most noticeable on the
  // last items far down the page (e.g. the final Experience milestone).
  // Refreshing after the window fully loads, and again shortly after,
  // recalculates every trigger against the final layout.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }
    const t = setTimeout(refresh, 1500);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <main className="min-h-screen text-foreground overflow-x-hidden">
      <LoadingScreen />
      <PortalScene />
      <MouseLiquid />
      <div className="grain-overlay" />
      <CustomCursor />
      <ScrollIndicator />
      <AudioControls />
      <Navbar />
      <Hero />
      <section id="about">
        <Introduction />
      </section>
      <Skills />
      <PortfolioShowcase />
      <Experience />
      <TechWall />
      <section id="automation">
        <AutomationSection />
      </section>
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
