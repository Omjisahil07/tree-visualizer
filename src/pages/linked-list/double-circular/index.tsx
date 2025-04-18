
import { useState } from "react";
import { LinkedListNode, LinkedListOperations } from "../types/LinkedListTypes";
import { LinkedListVisualization } from "../components/LinkedListVisualization";
import { LinkedListControls } from "../components/LinkedListControls";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { insertNode, deleteNode, updateNode, generateRandomList, traverseList, traverseListReverse } from "./operations/doubleCircularLinkedListOperations";
import { Footer } from "@/components/Footer";

const DoubleCircularLinkedList = () => {
  const [list, setList] = useState<LinkedListNode[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [visitSequence, setVisitSequence] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseDirection, setTraverseDirection] = useState<"forward" | "reverse">("forward");
  const isMobile = useIsMobile();

  const handleInsert = (value: number, position: number) => {
    const newList = insertNode(list, value, position);
    setList(newList);
    toast.success(`Inserted ${value} at position ${position}`);
  };

  const handleDelete = (position: number) => {
    if (list.length === 0) {
      toast.error("List is empty");
      return;
    }
    if (position < 0 || position >= list.length) {
      toast.error("Invalid position");
      return;
    }
    const newList = deleteNode(list, position);
    setList(newList);
    toast.success(`Deleted node at position ${position}`);
  };

  const handleUpdate = (position: number, value: number) => {
    if (list.length === 0) {
      toast.error("List is empty");
      return;
    }
    if (position < 0 || position >= list.length) {
      toast.error("Invalid position");
      return;
    }
    const newList = updateNode(list, position, value);
    setList(newList);
    toast.success(`Updated node at position ${position} to ${value}`);
  };

  const handleGenerateRandom = () => {
    const size = Math.floor(Math.random() * 5) + 3; // 3-7 nodes
    const newList = generateRandomList(size);
    setList(newList);
    setVisitSequence([]);
    toast.success(`Generated random double circular linked list with ${size} nodes`);
  };

  const handleTraverse = async () => {
    if (list.length === 0) {
      toast.error("List is empty");
      return;
    }
    setIsTraversing(true);
    setVisitedNodes([]);
    setVisitSequence([]);
    setCurrentNode(null);
    const newVisitSequence: number[] = [];
    
    if (traverseDirection === "forward") {
      await traverseList(list, async (node, index) => {
        setCurrentNode(index);
        setVisitedNodes(prev => [...prev, index]);
        newVisitSequence.push(node.value);
        setVisitSequence([...newVisitSequence]);
        await new Promise(resolve => setTimeout(resolve, 500));
      });
    } else {
      await traverseListReverse(list, async (node, index) => {
        setCurrentNode(index);
        setVisitedNodes(prev => [...prev, index]);
        newVisitSequence.push(node.value);
        setVisitSequence([...newVisitSequence]);
        await new Promise(resolve => setTimeout(resolve, 500));
      });
    }
    
    setIsTraversing(false);
    setCurrentNode(null);
    toast.success("Traversal completed (1 cycle)");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Double Circular Linked List</h1>
        <p className="text-muted-foreground text-base mb-3">Combines features of doubly linked list and circular linked list</p>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <Button 
            onClick={() => setTraverseDirection("forward")} 
            variant={traverseDirection === "forward" ? "default" : "outline"} 
            size="sm" 
            className="h-8"
          >
            Forward Traversal
          </Button>
          <Button 
            onClick={() => setTraverseDirection("reverse")} 
            variant={traverseDirection === "reverse" ? "default" : "outline"} 
            size="sm" 
            className="h-8"
          >
            Reverse Traversal
          </Button>
        </div>
        <Button onClick={handleGenerateRandom} variant="outline" className="gap-1">
          <Wand2 className="w-4 h-4" />
          Generate Random List
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          <LinkedListVisualization 
            list={list} 
            currentNode={currentNode} 
            visitedNodes={visitedNodes} 
            type="double-circular" 
            traversalDirection={traverseDirection}
            visitSequence={visitSequence}
          />
        </div>
        
        <div className="lg:col-span-4">
          <LinkedListControls 
            onInsert={handleInsert} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate} 
            onTraverse={handleTraverse} 
            isTraversing={isTraversing} 
            listLength={list.length} 
            operations={[
              LinkedListOperations.INSERT_AT_BEGINNING, 
              LinkedListOperations.INSERT_AT_END, 
              LinkedListOperations.INSERT_AT_POSITION, 
              LinkedListOperations.DELETE_FROM_BEGINNING, 
              LinkedListOperations.DELETE_FROM_END, 
              LinkedListOperations.DELETE_FROM_POSITION, 
              LinkedListOperations.UPDATE
            ]} 
          />
        </div>
      </div>
    </div>
  );
};

export default DoubleCircularLinkedList;
