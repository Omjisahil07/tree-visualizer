
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/graph" className="transition-transform hover:scale-105">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>Graph Visualization</CardTitle>
                <CardDescription>
                  Explore graph algorithms like BFS and DFS with interactive visualizations
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <img 
                  src="https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80" 
                  alt="Graph" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>

          <Link to="/tree" className="transition-transform hover:scale-105">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>Tree Structures</CardTitle>
                <CardDescription>
                  Visualize and understand different types of tree data structures
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
                  alt="Tree" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>

          <Link to="/linked-list" className="transition-transform hover:scale-105">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>Linked Lists</CardTitle>
                <CardDescription>
                  Learn about different types of linked list implementations
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80" 
                  alt="Linked List" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
