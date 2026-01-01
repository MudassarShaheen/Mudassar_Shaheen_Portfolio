const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-xl font-bold">
            <span className="text-foreground">MUDASSAR SHAHEEN</span>
            <span className="text-primary">.</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} All rights reserved. Built with passion for games.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
