
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, GitGraph } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const graphTypes = [
  {
    icon: <GitGraph className="w-12 h-12" />,
    title: "Depth First Search (DFS)",
    description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    link: "/graph/dfs"
  },
  {
    icon: <Share2 className="w-12 h-12" />,
    title: "Breadth First Search (BFS)",
    description: "A graph traversal algorithm that explores all vertices at the present depth before moving on to vertices at the next depth level.",
    link: "/graph/bfs"
  }
];

const Graph = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Graph Algorithms</h1>
        <p className="text-muted-foreground text-lg">
          Explore different graph traversal algorithms and their implementations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {graphTypes.map((graph, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-6 text-primary">
                {graph.icon}
              </div>
              <CardTitle className="text-center">{graph.title}</CardTitle>
              <CardDescription className="text-center">
                {graph.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button asChild>
                <Link to={graph.link}>Explore {graph.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Graph;
