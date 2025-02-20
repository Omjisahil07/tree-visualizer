
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const linkedListOperations = [
  {
    name: "Singly Linked List",
    description: "A linear data structure where each node points to the next node in the sequence",
    route: "/linked-list/singly",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  },
  {
    name: "Doubly Linked List",
    description: "Each node contains references to both next and previous nodes",
    route: "/linked-list/doubly",
    image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302"
  },
  {
    name: "Circular Linked List",
    description: "The last node points back to the first node, creating a circle",
    route: "/linked-list/circular",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5"
  },
  {
    name: "Double Circular Linked List",
    description: "Combines features of doubly linked list and circular linked list",
    route: "/linked-list/double-circular",
    image: "https://images.unsplash.com/photo-1557683311-eac922347aa1"
  }
];

const LinkedList = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Linked List Visualizations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {linkedListOperations.map((operation, index) => (
            <Link 
              key={index} 
              to={operation.route}
              className="transition-transform hover:scale-105"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{operation.name}</CardTitle>
                  <CardDescription>{operation.description}</CardDescription>
                </CardHeader>
                <CardContent>
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
      </div>
    </div>
  );
};

export default LinkedList;
