
import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © 2024 Data Structure Visualizer. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a 
            href="https://github.com/yourusername/data-structure-visualizer" 
            className="text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:contact@datastructurevisualizer.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
      </div>
      <div className="mt-4 text-xs text-muted-foreground text-center">
        Built with React, TypeScript, and D3.js - Open source under MIT license.
      </div>
    </footer>
  );
};
