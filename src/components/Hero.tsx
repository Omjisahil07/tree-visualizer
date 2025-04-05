
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Star, Trees } from "lucide-react";

export const Hero = () => {
  return (
    <div className="hero-gradient min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 text-5xl">[ ]</div>
        <div className="absolute top-40 right-20 text-6xl">{`{}`}</div>
        <div className="absolute bottom-20 left-20 text-7xl">( )</div>
        <div className="absolute top-60 left-1/2 text-5xl">&lt;&gt;</div>
        <div className="absolute bottom-40 right-20 text-6xl">[ ]</div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in z-10 py-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4 text-sm font-medium">
          <Star className="h-4 w-4" />
          <span>Open source data structure visualization tool</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Visualize & Create Data Structures
          <span className="text-primary block mt-2">With Ease</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Build, visualize, and understand complex data structures through an intuitive interface. 
          Perfect for learning, teaching, and algorithm exploration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/tree">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Try the Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              <Trees className="h-4 w-4" />
              Learn More
            </Button>
          </Link>
        </div>
        
        <div className="pt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Code className="h-4 w-4" />
          <span>Available on GitHub</span>
          <a 
            href="https://github.com/yourusername/data-structure-visualizer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Star us →
          </a>
        </div>
      </div>
    </div>
  );
};
