
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Trees, List, GitGraph } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to master data structures?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start visualizing algorithms today and transform the way you understand computer science fundamentals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
          <Button asChild variant="outline" className="flex items-center gap-2 bg-white hover:bg-primary/10">
            <Link to="/tree">
              <Trees className="w-5 h-5 text-primary" />
              <span>Explore Trees</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="flex items-center gap-2 bg-white hover:bg-primary/10">
            <Link to="/linked-list">
              <List className="w-5 h-5 text-primary" />
              <span>Discover Linked Lists</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="flex items-center gap-2 bg-white hover:bg-primary/10">
            <Link to="/graph">
              <GitGraph className="w-5 h-5 text-primary" />
              <span>Visualize Graphs</span>
            </Link>
          </Button>
        </div>
        
      </div>
    </section>
  );
};
