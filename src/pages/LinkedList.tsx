
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const linkedListOperations = [
  {
    name: "Singly Linked List",
    description: "A linear data structure where each node points to the next node in the sequence",
    route: "/linked-list/singly",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
  },
  {
    name: "Doubly Linked List",
    description: "Each node contains references to both next and previous nodes",
    route: "/linked-list/doubly",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
  },
  {
    name: "Circular Linked List",
    description: "The last node points back to the first node, creating a circle",
    route: "/linked-list/circular",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
  },
  {
    name: "Double Circular Linked List",
    description: "Combines features of doubly linked list and circular linked list",
    route: "/linked-list/double-circular",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80"
  }
];

const LinkedList = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Linked List Visualizations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {linkedListOperations.map((operation, index) => (
            <Link 
              key={index} 
              to={operation.route}
              className="transition-transform hover:scale-105"
            >
              <Card className="h-full shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-lg">{operation.name}</CardTitle>
                  <CardDescription className="text-xs">{operation.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <img 
                    src={operation.image} 
                    alt={operation.name} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedList;
