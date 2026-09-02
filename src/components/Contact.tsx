import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(14_78%_57%_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />
      
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary font-display text-sm uppercase tracking-widest">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold font-display mt-4 mb-6">
            Let's Build the Next
            <span className="gradient-text block mt-2">Immersive Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body mb-12">
            Whether you need a game developer, VR specialist, or automation expert, 
            I'm ready to bring your vision to life.
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" asChild className="mb-16">
            <a href="mailto:mudasar.cr@gmail.com">
              Start a Conversation
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>

          {/* Contact Links */}
          <div className="grid sm:grid-cols-3 gap-4">
            <a 
              href="mailto:mudasar.cr@gmail.com"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Mail className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">Email</span>
              <span className="text-sm text-muted-foreground font-body">mudasar.cr@gmail.com</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/mudassar-shaheen-49145451/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Linkedin className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">LinkedIn</span>
              <span className="text-sm text-muted-foreground font-body">Connect with me</span>
            </a>
            
            <a 
              href="https://github.com/MudassarShaheen"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Github className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">GitHub</span>
              <span className="text-sm text-muted-foreground font-body">View my code</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
