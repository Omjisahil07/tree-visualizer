import { useState, useCallback } from "react";
import { AVLVisualization } from "./components/AVLVisualization";
import { AVLPseudocode } from "./components/AVLPseudocode";
import { AVLNode, TraversalType } from "./types/AVLTypes";
import { insertNode, deleteNode, updateNode, traverseInOrder, traversePreOrder, traversePostOrder, traverseLevelOrder } from "./operations/AVLOperations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";

const AVLTree = () => {
  const [tree, setTree] = useState<AVLNode>({
    value: null,
    children: [],
    height: 0,
    balanceFactor: 0
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

  const handleTraversalStep = useCallback(async (value: number | null, step: string) => {
    if (isPaused) return;
    setCurrentNode(value);
    setCurrentStep(step);
    setVisitedNodes(prev =>
      value !== null && !prev.includes(value) ? [...prev, value] : prev
    );
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [isPaused]);

  const startTraversal = async () => {
    setIsTraversing(true);
    setIsPaused(false);
    setVisitedNodes([]);
    setCurrentNode(null);
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
      setCurrentStep("Traversal complete");
    }
  };

  const generateRandomAVL = () => {
    let newTree: AVLNode = { value: null, children: [], height: 0, balanceFactor: 0 };
    const numberOfNodes = Math.floor(Math.random() * 5) + 3; // Generate 3-7 nodes
    const usedValues = new Set<number>();
    
    while (usedValues.size < numberOfNodes) {
      const value = Math.floor(Math.random() * 50) + 1;
      if (!usedValues.has(value)) {
        usedValues.add(value);
        newTree = insertNode(newTree, value);
      }
    }
    
    setTree(newTree);
    toast.success(`Generated a random AVL tree with ${numberOfNodes} nodes`);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">AVL Tree Visualization</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Available Operations</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Enter a number to insert a new node (tree will auto-balance)</li>
          <li>• Click on a node to select it for updating</li>
          <li>• Double click on a node to delete it</li>
          <li>• Watch the balance factors update automatically</li>
          <li>• Use traversal controls to visualize the algorithm</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-end mb-4">
            <Button
              onClick={generateRandomAVL}
              variant="outline"
              className="gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Random Tree
            </Button>
          </div>
          
          <AVLVisualization
            tree={tree}
            onNodeDelete={handleDelete}
            onNodeClick={handleNodeClick}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <Select
                value={traversalType}
                onValueChange={(value) => setTraversalType(value as TraversalType)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select traversal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inorder">Inorder</SelectItem>
                  <SelectItem value="preorder">Preorder</SelectItem>
                  <SelectItem value="postorder">Postorder</SelectItem>
                  <SelectItem value="levelorder">Level Order</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="space-x-2">
                {!isTraversing ? (
                  <Button onClick={startTraversal} size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={() => {
                    setIsPaused(true);
                    setIsTraversing(false);
                  }} size="sm" variant="secondary">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setIsTraversing(false);
                    setIsPaused(false);
                    setVisitedNodes([]);
                    setCurrentNode(null);
                    setCurrentStep("");
                  }}
                  size="sm"
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <AVLPseudocode
              traversalType={traversalType}
              currentStep={currentStep}
              currentLine={visitedNodes.length - 1}
            />

            {visitedNodes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Visitation Sequence:</h3>
                <div className="flex flex-wrap gap-2">
                  {visitedNodes.map((value, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
              <Button type="submit" className="w-full">
                Insert Node
              </Button>
            </form>
          </div>

          {selectedNode !== null && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4">
                Update Node {selectedNode}
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="updateValue">New Value</Label>
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

          {currentStep && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Current Operation</h3>
              <p className="text-sm text-primary">{currentStep}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AVLTree;