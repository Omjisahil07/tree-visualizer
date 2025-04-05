
import { Layout } from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Data Structure Visualizer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An interactive platform for visualizing and understanding complex data structures
          </p>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              We believe that visual learning is one of the most effective ways to understand complex concepts. 
              Our mission is to make data structures and algorithms more accessible through interactive 
              visualizations, helping students, educators, and professionals to better understand these 
              fundamental computer science concepts.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-xl font-semibold mb-2">Tree Visualizations</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Binary Trees</li>
                  <li>Binary Search Trees (BST)</li>
                  <li>AVL Trees</li>
                  <li>B+ Trees</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-xl font-semibold mb-2">Graph Algorithms</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Depth-First Search (DFS)</li>
                  <li>Breadth-First Search (BFS)</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-xl font-semibold mb-2">Linked Lists</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Singly Linked Lists</li>
                  <li>Doubly Linked Lists</li>
                  <li>Circular Linked Lists</li>
                  <li>Double Circular Linked Lists</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-xl font-semibold mb-2">Interactive Features</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Step-by-step visualizations</li>
                  <li>Custom data structure creation</li>
                  <li>Algorithm animations</li>
                  <li>Educational explanations</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="text-muted-foreground mb-4">
              Built with modern web technologies including React, TypeScript, and D3.js, our platform
              provides smooth, interactive visualizations that work across devices. We're continuously 
              improving our tools and adding new features to enhance your learning experience.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">For Educators</h2>
            <p className="text-muted-foreground mb-4">
              Our visualizer is a valuable teaching tool that can be used in classrooms to demonstrate 
              data structure concepts. It provides a hands-on approach to learning that complements 
              traditional teaching methods and helps students grasp complex concepts more easily.
            </p>
          </section>
          
          <section className="text-center border-t pt-8 mt-8">
            <h2 className="text-xl font-bold mb-4">Have suggestions or feedback?</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking to improve our platform based on user feedback.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Send Us Feedback
            </a>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
