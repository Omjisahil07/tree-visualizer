
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { ArrowRight, Code, Zap, Trees, BookOpen, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Different Data Structures
        </h2>
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

      {/* Added Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Students & Educators Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  "This visualization tool has completely transformed how I understand data structures. Being able to see the algorithms in action makes complex concepts click instantly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    CS
                  </div>
                  <div>
                    <p className="font-medium">Corey Smith</p>
                    <p className="text-sm text-muted-foreground">Computer Science Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  "As a professor, I've integrated this tool into my curriculum. The interactive visualizations help students grasp concepts faster than traditional teaching methods alone."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    JL
                  </div>
                  <div>
                    <p className="font-medium">Dr. Jennifer Lee</p>
                    <p className="text-sm text-muted-foreground">CS Professor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  "The ability to visualize algorithms step-by-step helped me prepare for technical interviews. I can now explain complex data structures with confidence."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    MJ
                  </div>
                  <div>
                    <p className="font-medium">Michael Johnson</p>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Added How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our data structure visualizer makes complex concepts simple through interactive learning
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Choose a Structure</h3>
              <p className="text-muted-foreground">
                Select from graphs, trees, linked lists and other data structures to begin your learning journey
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Explore Operations</h3>
              <p className="text-muted-foreground">
                Watch how different algorithms manipulate the structure, with step-by-step visualization
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Master the Concept</h3>
              <p className="text-muted-foreground">
                Practice by interacting with the structure, reinforcing your understanding through hands-on learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Added CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Trees className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to master data structures?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start visualizing algorithms today and transform the way you understand computer science fundamentals.
          </p>
          <Button size="lg" asChild>
            <Link to="/tree" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
