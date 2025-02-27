
import { useState, useEffect, useCallback } from "react";
import { LinkedListControls } from "../components/LinkedListControls";
import { LinkedListVisualization } from "../components/LinkedListVisualization";
import { SinglyNode, Step } from "../types/LinkedListTypes";
import * as operations from "./operations/singlyLinkedListOperations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const SinglyLinkedList = () => {
  const [head, setHead] = useState<SinglyNode<number> | null>(null);
  const [nodes, setNodes] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingInterval, setPlayingInterval] = useState<NodeJS.Timeout | null>(null);

  const updateVisualization = useCallback(() => {
    if (head) {
      setNodes(operations.toArray(head));
    } else {
      setNodes([]);
    }
  }, [head]);

  useEffect(() => {
    updateVisualization();
  }, [head, updateVisualization]);

  // Handle auto-playing steps
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1000);
      
      setPlayingInterval(interval);
      return () => clearInterval(interval);
    } else if (playingInterval) {
      clearInterval(playingInterval);
      setPlayingInterval(null);
    }
  }, [isPlaying, steps.length]);

  const resetSteps = useCallback(() => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const addHead = (value: number) => {
    const newHead = operations.insertAtHead(head, value);
    setHead(newHead);
    
    const newSteps = [
      { description: "Create a new node with value " + value, nodeIndices: [0] },
      { description: "Set the new node's next pointer to the current head", nodeIndices: [0, 1] },
      { description: "Update the head pointer to point to the new node", nodeIndices: [0] }
    ];
    
    setSteps(newSteps);
    setCurrentStep(0);
    toast.success(`Added node with value ${value} at the head`);
  };

  const addTail = (value: number) => {
    const newHead = operations.insertAtTail(head, value);
    setHead(newHead);
    
    const nodeArray = operations.toArray(newHead);
    const newNodeIndex = nodeArray.length - 1;
    
    const newSteps = [
      { description: "Create a new node with value " + value, nodeIndices: [newNodeIndex] },
      { description: "Traverse to the end of the list", nodeIndices: [newNodeIndex - 1] },
      { description: "Set the last node's next pointer to the new node", nodeIndices: [newNodeIndex - 1, newNodeIndex] },
      { description: "The new node is now the tail of the list", nodeIndices: [newNodeIndex] }
    ];
    
    setSteps(newSteps);
    setCurrentStep(0);
    toast.success(`Added node with value ${value} at the tail`);
  };

  const addAt = (value: number, position: number) => {
    try {
      const newHead = operations.insertAtPosition(head, value, position);
      setHead(newHead);
      
      const nodeArray = operations.toArray(newHead);
      
      let newSteps: Step[] = [];
      if (position === 0) {
        newSteps = [
          { description: "Create a new node with value " + value, nodeIndices: [0] },
          { description: "Set the new node's next pointer to the current head", nodeIndices: [0, 1] },
          { description: "Update the head pointer to point to the new node", nodeIndices: [0] }
        ];
      } else if (position >= nodeArray.length - 1) {
        const newNodeIndex = nodeArray.length - 1;
        newSteps = [
          { description: "Create a new node with value " + value, nodeIndices: [newNodeIndex] },
          { description: "Traverse to the end of the list", nodeIndices: [newNodeIndex - 1] },
          { description: "Set the last node's next pointer to the new node", nodeIndices: [newNodeIndex - 1, newNodeIndex] },
          { description: "The new node is now the tail of the list", nodeIndices: [newNodeIndex] }
        ];
      } else {
        newSteps = [
          { description: "Create a new node with value " + value, nodeIndices: [position] },
          { description: `Traverse the list to position ${position - 1}`, nodeIndices: [position - 1] },
          { description: "Set the new node's next pointer to the current node's next", nodeIndices: [position, position + 1] },
          { description: "Set the current node's next pointer to the new node", nodeIndices: [position - 1, position] },
          { description: "The new node is now inserted at position " + position, nodeIndices: [position] }
        ];
      }
      
      setSteps(newSteps);
      setCurrentStep(0);
      toast.success(`Added node with value ${value} at position ${position}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const removeHead = () => {
    if (!head) {
      toast.error("List is empty");
      return;
    }
    
    const nextNode = head.next;
    const newHead = operations.deleteHead(head);
    setHead(newHead);
    
    const newSteps = [
      { description: "Identify the current head node to remove", nodeIndices: [0] },
      { description: "Update the head pointer to the next node", nodeIndices: nextNode ? [1] : [] },
      { description: "The original head node is removed", nodeIndices: nextNode ? [0] : [] }
    ];
    
    setSteps(newSteps);
    setCurrentStep(0);
    toast.success("Removed head node");
  };

  const removeTail = () => {
    if (!head) {
      toast.error("List is empty");
      return;
    }
    
    if (!head.next) {
      // Only one node in the list
      setHead(null);
      setSteps([
        { description: "List has only one node, which is both head and tail", nodeIndices: [0] },
        { description: "Remove the head/tail node", nodeIndices: [] },
        { description: "The list is now empty", nodeIndices: [] }
      ]);
      setCurrentStep(0);
      toast.success("Removed the only node in the list");
      return;
    }
    
    const nodeArray = operations.toArray(head);
    const tailIndex = nodeArray.length - 1;
    const secondLastIndex = tailIndex - 1;
    
    const newHead = operations.deleteTail(head);
    setHead(newHead);
    
    const newSteps = [
      { description: "Identify the tail node to remove", nodeIndices: [tailIndex] },
      { description: "Traverse to the second-to-last node", nodeIndices: [secondLastIndex] },
      { description: "Set the second-to-last node's next pointer to null", nodeIndices: [secondLastIndex] },
      { description: "The tail node is removed and the second-to-last node is now the tail", nodeIndices: [secondLastIndex] }
    ];
    
    setSteps(newSteps);
    setCurrentStep(0);
    toast.success("Removed tail node");
  };

  const removeAt = (position: number) => {
    if (!head) {
      toast.error("List is empty");
      return;
    }
    
    const nodeArray = operations.toArray(head);
    if (position < 0 || position >= nodeArray.length) {
      toast.error("Invalid position");
      return;
    }
    
    let newSteps: Step[] = [];
    if (position === 0) {
      newSteps = [
        { description: "Identify the head node to remove", nodeIndices: [0] },
        { description: "Update the head pointer to the next node", nodeIndices: head.next ? [1] : [] },
        { description: "The original head node is removed", nodeIndices: [] }
      ];
    } else if (position === nodeArray.length - 1) {
      const secondLastIndex = position - 1;
      newSteps = [
        { description: "Identify the tail node to remove", nodeIndices: [position] },
        { description: "Traverse to the second-to-last node", nodeIndices: [secondLastIndex] },
        { description: "Set the second-to-last node's next pointer to null", nodeIndices: [secondLastIndex] },
        { description: "The tail node is removed", nodeIndices: [] }
      ];
    } else {
      newSteps = [
        { description: `Identify the node at position ${position} to remove`, nodeIndices: [position] },
        { description: `Traverse to the node at position ${position - 1}`, nodeIndices: [position - 1] },
        { description: "Set the previous node's next pointer to the current node's next", nodeIndices: [position - 1, position + 1] },
        { description: `The node at position ${position} is removed`, nodeIndices: [] }
      ];
    }
    
    const newHead = operations.deleteAtPosition(head, position);
    setHead(newHead);
    
    setSteps(newSteps);
    setCurrentStep(0);
    toast.success(`Removed node at position ${position}`);
  };

  const updateAt = (position: number, value: number) => {
    if (!head) {
      toast.error("List is empty");
      return;
    }
    
    const nodeArray = operations.toArray(head);
    if (position < 0 || position >= nodeArray.length) {
      toast.error("Invalid position");
      return;
    }
    
    const newHead = operations.updateAtPosition(head, position, value);
    setHead(newHead);
    
    const newSteps = [
      { description: `Identify the node at position ${position} to update`, nodeIndices: [position] },
      { description: `Traverse to position ${position}`, nodeIndices: [position] },
      { description: `Update the node's value from ${nodeArray[position]} to ${value}`, nodeIndices: [position] }
    ];
    
    setSteps(newSteps);
    setCurrentStep(0);
    toast.success(`Updated node at position ${position} to value ${value}`);
  };

  const generate = (length: number) => {
    if (length <= 0 || length > 15) {
      toast.error("Please enter a valid length (1-15)");
      return;
    }
    
    const newHead = operations.generateRandomList(length);
    setHead(newHead);
    resetSteps();
    
    toast.success(`Generated a random linked list with ${length} nodes`);
  };

  const reset = () => {
    setHead(null);
    resetSteps();
    toast.success("Reset the linked list");
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Singly Linked List</h1>
        <p className="text-muted-foreground">
          A linear data structure where each element (node) contains data and a reference to the next node in the sequence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <LinkedListVisualization
            nodes={nodes}
            currentStep={currentStep}
            steps={steps}
            isCircular={false}
            isDoublyLinked={false}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Singly Linked List</CardTitle>
              <CardDescription>A linear collection of elements where each element points to the next</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Properties:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Each node contains a value and a reference to the next node</li>
                  <li>The last node points to null</li>
                  <li>Traversal is one-directional (forward only)</li>
                  <li>Efficient for insertion and deletion at the beginning (O(1))</li>
                  <li>Access time is O(n) for arbitrary elements</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Common Operations:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><strong>Insert Head:</strong> Add a node at the beginning (O(1))</li>
                  <li><strong>Insert Tail:</strong> Add a node at the end (O(n))</li>
                  <li><strong>Delete Head:</strong> Remove the first node (O(1))</li>
                  <li><strong>Delete Tail:</strong> Remove the last node (O(n))</li>
                  <li><strong>Search:</strong> Find a node with a specific value (O(n))</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-4">
          <LinkedListControls
            onAddHead={addHead}
            onAddTail={addTail}
            onAddAt={addAt}
            onRemoveHead={removeHead}
            onRemoveTail={removeTail}
            onRemoveAt={removeAt}
            onUpdateAt={updateAt}
            onGenerate={generate}
            onReset={reset}
            onPlayPause={playPause}
            onNext={next}
            isPlaying={isPlaying}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglyLinkedList;
