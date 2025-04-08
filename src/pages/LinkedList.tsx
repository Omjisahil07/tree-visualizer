
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

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
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Linked List Visualizations</h1>
        <p className="text-muted-foreground text-lg">
          Explore different types of linked list implementations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {linkedListOperations.map((operation, index) => (
          <Link 
            key={index} 
            to={operation.route}
            className="transition-transform hover:scale-105"
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>{operation.name}</CardTitle>
                <CardDescription>{operation.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <img 
                  src={operation.image} 
                  alt={operation.name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default LinkedList;
