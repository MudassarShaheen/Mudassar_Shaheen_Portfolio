import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollIndicator from "@/components/ScrollIndicator";
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
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="grain-overlay" />
      <CustomCursor />
      <ScrollIndicator />
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
