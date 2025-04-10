
import { BookOpen, Code, Zap } from "lucide-react";

const steps = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "1. Choose a Structure",
    description: "Select from graphs, trees, linked lists and other data structures to begin your learning journey"
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "2. Explore Operations",
    description: "Watch how different algorithms manipulate the structure, with step-by-step visualization"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "3. Master the Concept",
    description: "Practice by interacting with the structure, reinforcing your understanding through hands-on learning"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          How It Works
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Our data structure visualizer makes complex concepts simple through interactive learning
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
