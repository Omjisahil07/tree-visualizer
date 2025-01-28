import { Tree, Share2, Zap, Code } from "lucide-react";

const features = [
  {
    icon: <Tree className="w-6 h-6" />,
    title: "Interactive Visualization",
    description: "See your data structures come to life with real-time visual representation"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Multiple Data Structures",
    description: "Support for trees, graphs, linked lists, and more"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Updates",
    description: "Watch changes reflect instantly as you modify your data structure"
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Easy Sharing",
    description: "Share your visualizations with others through simple links"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to master data structures
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};