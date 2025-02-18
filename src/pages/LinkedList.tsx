
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LinkedList = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Linked List Visualizations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/linked-list/singly" className="transition-transform hover:scale-105">
            <Card>
              <CardHeader>
                <CardTitle>Singly Linked List</CardTitle>
                <CardDescription>
                  A linear data structure where each node points to the next node in the sequence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                  alt="Singly Linked List" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>

          <Link to="/linked-list/doubly" className="transition-transform hover:scale-105">
            <Card>
              <CardHeader>
                <CardTitle>Doubly Linked List</CardTitle>
                <CardDescription>
                  Each node contains references to both next and previous nodes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1487252665478-49b61b47f302" 
                  alt="Doubly Linked List" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkedList;
