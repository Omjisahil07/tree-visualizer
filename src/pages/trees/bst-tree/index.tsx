
import { useState, useCallback } from "react";
import { BSTVisualization } from "./components/BSTVisualization";
import { BSTTraversalControls } from "./components/BSTTraversalControls";
import { BSTVisitationSequence } from "./components/BSTVisitationSequence";
import { BSTPseudocode } from "./components/BSTPseudocode";
import { BSTNodeInsertForm } from "./components/BSTNodeInsertForm";
import { BSTNodeUpdateForm } from "./components/BSTNodeUpdateForm";
import { BSTNode, TraversalType } from "./types/BSTTypes";
import { 
  insertNode, 
  deleteNode, 
  updateNode, 
  traverseInOrder, 
  traversePreOrder, 
  traversePostOrder, 
  traverseLevelOrder 
} from "./operations/BSTOperations";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wand2, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BSTTree = () => {
  const [tree, setTree] = useState<BSTNode>({
    value: null,
    children: [
      { value: null, children: [] },
      { value: null, children: [] },
    ],
  });
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [traversalType, setTraversalType] = useState<TraversalType>("inorder");
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);

  const handleTraversalStep = useCallback(async (value: number | null, step: string) => {
    if (isPaused) return;
    setCurrentNode(value);
    setCurrentStep(step);
    setVisitedNodes(prev =>
      value !== null && !prev.includes(value) ? [...prev, value] : prev
    );
    setCurrentLine(prev => prev + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [isPaused]);

  const startTraversal = async () => {
    setIsTraversing(true);
    setIsPaused(false);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentLine(0);
    setCurrentStep("");

    const traversalFunction = {
      inorder: traverseInOrder,
      preorder: traversePreOrder,
      postorder: traversePostOrder,
      levelorder: traverseLevelOrder,
    }[traversalType];

    if (!traversalFunction) return;

    await traversalFunction(tree, handleTraversalStep);
    
    if (!isPaused) {
      setIsTraversing(false);
      setCurrentLine(-1);
      setCurrentStep("Traversal complete");
    }
  };

  const generateRandomBST = () => {
    let newTree: BSTNode = { value: null, children: [] };
    const numberOfNodes = Math.floor(Math.random() * 5) + 3; // Generate 3-7 nodes
    const usedValues = new Set<number>();
    
    // Generate unique values for BST
    while (usedValues.size < numberOfNodes) {
      const value = Math.floor(Math.random() * 50) + 1;
      if (!usedValues.has(value)) {
        usedValues.add(value);
        newTree = insertNode(newTree, value);
      }
    }
    
    setTree(newTree);
    toast.success(`Generated a random BST with ${numberOfNodes} nodes`);
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    setTree((prevTree) => insertNode(prevTree, value));
    setInputValue("");
    toast.success(`Node ${value} inserted successfully`);
  };

  const handleNodeClick = (value: number) => {
    setSelectedNode(value);
    setUpdateValue(value.toString());
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNode === null) {
      toast.error("Please select a node to update");
      return;
    }
    const newValue = parseInt(updateValue);
    if (isNaN(newValue)) {
      toast.error("Please enter a valid number");
      return;
    }
    setTree((prevTree) => updateNode(prevTree, selectedNode, newValue));
    setUpdateValue("");
    setSelectedNode(null);
    toast.success(`Node updated from ${selectedNode} to ${newValue}`);
  };

  const handleDelete = (value: number) => {
    setTree((prevTree) => deleteNode(prevTree, value));
    if (selectedNode === value) {
      setSelectedNode(null);
      setUpdateValue("");
    }
    toast.success(`Node ${value} deleted successfully`);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Binary Search Tree Visualization</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Available Operations</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Enter a number to insert a new node in the BST</li>
          <li>• Click on a node to select it for updating</li>
          <li>• Double click on a node to delete it</li>
          <li>• Select a traversal type (Preorder, Inorder, Postorder, or Level Order)</li>
          <li>• Use traversal controls to visualize the algorithm step by step</li>
          <li>• Watch the pseudocode highlight as the traversal progresses</li>
          <li>• View the sequence of visited nodes in real-time</li>
        </ul>
      </div>
      
      <div className="flex justify-end mb-2">
        <Button
          onClick={generateRandomBST}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Wand2 className="w-4 h-4" />
          Generate Random Tree
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main visualization panel - 8 columns */}
        <div className="lg:col-span-8">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <BSTVisualization
                tree={tree}
                onNodeDelete={handleDelete}
                onNodeClick={handleNodeClick}
                currentNode={currentNode}
                visitedNodes={visitedNodes}
              />
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <BSTTraversalControls
                  onStart={startTraversal}
                  onPause={() => {
                    setIsPaused(true);
                    setIsTraversing(false);
                  }}
                  onReset={() => {
                    setIsTraversing(false);
                    setIsPaused(false);
                    setVisitedNodes([]);
                    setCurrentNode(null);
                    setCurrentLine(-1);
                    setCurrentStep("");
                  }}
                  isTraversing={isTraversing}
                  traversalType={traversalType}
                  onTraversalTypeChange={setTraversalType}
                />
                
                <BSTVisitationSequence sequence={visitedNodes} />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Controls and pseudocode panel - 4 columns */}
        <div className="lg:col-span-4 space-y-4">
          <BSTNodeInsertForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleInsert={handleInsert}
          />
          
          {selectedNode !== null && (
            <BSTNodeUpdateForm
              selectedNode={selectedNode}
              updateValue={updateValue}
              setUpdateValue={setUpdateValue}
              handleUpdate={handleUpdate}
            />
          )}
          
          <BSTPseudocode
            currentStep={currentStep}
            currentLine={currentLine}
            traversalType={traversalType}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BSTTree;
