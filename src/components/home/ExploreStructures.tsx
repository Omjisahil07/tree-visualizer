
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const structures = [
  {
    title: "Graph Visualization",
    description: "Explore graph algorithms like BFS and DFS with interactive visualizations",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80",
    link: "/graph"
  },
  {
    title: "Tree Structures",
    description: "Visualize and understand different types of tree data structures",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
    link: "/tree"
  },
  {
    title: "Linked Lists",
    description: "Learn about different types of linked list implementations",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    link: "/linked-list"
  }
];

export const ExploreStructures = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Different Data Structures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {structures.map((structure, index) => (
          <Link key={index} to={structure.link} className="transition-transform hover:scale-105">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>{structure.title}</CardTitle>
                <CardDescription>
                  {structure.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <img 
                  src={structure.image} 
                  alt={structure.title} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
