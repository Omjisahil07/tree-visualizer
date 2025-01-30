import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { TreeVisualization } from "./TreeVisualization";
import { TreeNode } from "./TreeNode";
import { insertNode, deleteNode, updateNode, traverseInOrder, traversePreOrder, traversePostOrder } from "./TreeOperations";
import { toast } from "sonner";
import { TraversalPseudocode } from "./components/TraversalPseudocode";
import { VisitationSequence } from "./components/VisitationSequence";
import { TraversalControls } from "./components/TraversalControls";
import { Instructions } from "./components/Instructions";

const BinaryTree = () => {
  const [tree, setTree] = useState<TreeNode>({ value: null, children: [] });
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [traversalType, setTraversalType] = useState("inorder");

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    setTree(prevTree => insertNode(prevTree, value));
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
    
    setTree(prevTree => updateNode(prevTree, selectedNode, newValue));
    setUpdateValue("");
    setSelectedNode(null);
    toast.success(`Node updated from ${selectedNode} to ${newValue}`);
  };

  const handleDelete = (value: number) => {
    setTree(prevTree => deleteNode(prevTree, value));
    if (selectedNode === value) {
      setSelectedNode(null);
      setUpdateValue("");
    }
    toast.success(`Node ${value} deleted successfully`);
  };

  const handleTraversalStep = useCallback((value: number | null, step: string) => {
    setCurrentNode(value);
    setCurrentStep(step);
  }, []);

  const startTraversal = async () => {
    setIsTraversing(true);
    setIsPaused(false);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentLine(0);

    const traversalFunction = {
      inorder: traverseInOrder,
      preorder: traversePreOrder,
      postorder: traversePostOrder
    }[traversalType];

    await traversalFunction(tree, handleTraversalStep);
    
    if (!isPaused) {
      setIsTraversing(false);
      setCurrentLine(-1);
      setCurrentStep("Traversal complete");
    }
  };

  const pauseTraversal = () => {
    setIsPaused(true);
    setIsTraversing(false);
  };

  const resetTraversal = () => {
    setIsTraversing(false);
    setIsPaused(false);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentLine(-1);
    setCurrentStep("");
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualization</h1>
      
      <Instructions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TreeVisualization
            tree={tree}
            onNodeDelete={handleDelete}
            onNodeClick={handleNodeClick}
            onNodeHighlight={setCurrentNode}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <TraversalControls
              onStart={startTraversal}
              onPause={pauseTraversal}
              onReset={resetTraversal}
              isTraversing={isTraversing}
              traversalType={traversalType}
              onTraversalTypeChange={setTraversalType}
            />
            
            <div className="mt-4">
              <VisitationSequence sequence={visitedNodes} />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Controls</h2>
            <form onSubmit={handleInsert} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nodeValue">Node Value</Label>
                <Input
                  id="nodeValue"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Insert Node
              </Button>
            </form>
          </div>

          {selectedNode !== null && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4">Update Node</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="updateValue">New Value for Node {selectedNode}</Label>
                  <Input
                    id="updateValue"
                    type="number"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                    placeholder="Enter new value"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update Node
                </Button>
              </form>
            </div>
          )}

          <TraversalPseudocode
            currentStep={currentStep}
            currentLine={currentLine}
          />
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;