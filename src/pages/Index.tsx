import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import AutomationSection from "@/components/AutomationSection";
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
      <PortfolioShowcase />
      <section id="automation">
        <AutomationSection />
      </section>
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
