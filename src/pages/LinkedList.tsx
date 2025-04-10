
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitFork, TreePine, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const linkedListOperations = [
  {
    icon: <GitFork className="w-12 h-12" />,
    name: "Singly Linked List",
    description: "A linear data structure where each node points to the next node in the sequence",
    route: "/linked-list/singly",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
  },
  {
    icon: <GitFork className="w-12 h-12" />,
    name: "Doubly Linked List",
    description: "Each node contains references to both next and previous nodes",
    route: "/linked-list/doubly",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
  },
  {
    icon: <TreePine className="w-12 h-12" />,
    name: "Circular Linked List",
    description: "The last node points back to the first node, creating a circle",
    route: "/linked-list/circular",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
  },
  {
    icon: <TreePine className="w-12 h-12" />,
    name: "Double Circular Linked List",
    description: "Combines features of doubly linked list and circular linked list",
    route: "/linked-list/double-circular",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80"
  }
];

const LinkedList = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Linked List Visualizations</h1>
        <p className="text-muted-foreground text-lg">
          Explore different types of linked list implementations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {linkedListOperations.map((operation, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-6 text-primary">
                {operation.icon}
              </div>
              <CardTitle className="text-center">{operation.name}</CardTitle>
              <CardDescription className="text-center">
                {operation.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button asChild>
                <Link to={operation.route} className="flex items-center">
                  Explore {operation.name}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LinkedList;
