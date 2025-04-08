
import { useState, useCallback } from "react";
import { TreeVisualization } from "./TreeVisualization";
import { BinaryTreeNode, InsertPosition, TraversalState } from "./types/BinaryTreeTypes";
import { insertNode } from "./operations/insert/insertNode";
import { 
  traverseInOrder,
  traversePreOrder,
  traversePostOrder 
} from "./operations/traversal/traversalOperations";
import { TraversalPseudocode } from "./components/TraversalPseudocode";
import { VisitationSequence } from "./components/VisitationSequence";
import { TraversalControls } from "./components/TraversalControls";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, Plus, Info } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BinaryTree = () => {
  const [tree, setTree] = useState<BinaryTreeNode>({ value: null, children: [] });
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [nodeStates, setNodeStates] = useState<Map<number, TraversalState>>(new Map());
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [traversalType, setTraversalType] = useState("inorder");
  const [inputValue, setInputValue] = useState("");

  const handleTraversalStep = useCallback(async (value: number | null, step: string, state: TraversalState) => {
    if (value === null) return;
    
    setCurrentNode(value);
    setCurrentStep(step);
    
    // Update node state
    setNodeStates(prev => {
      const newStates = new Map(prev);
      newStates.set(value, state);
      return newStates;
    });
    
    // Add to visited nodes if not already visited
    if (state === 'visited' && !visitedNodes.includes(value)) {
      setVisitedNodes(prev => [...prev, value]);
    }
    
    setCurrentLine(prev => prev + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [visitedNodes]);

  const startTraversal = async () => {
    setIsTraversing(true);
    setIsPaused(false);
    setVisitedNodes([]);
    setNodeStates(new Map());
    setCurrentNode(null);
    setCurrentLine(0);

    const traversalFunction = {
      inorder: traverseInOrder,
      preorder: traversePreOrder,
      postorder: traversePostOrder
    }[traversalType];

    if (!traversalFunction) return;

    await traversalFunction(tree, handleTraversalStep);
    
    if (!isPaused) {
      setIsTraversing(false);
      setCurrentLine(-1);
      setCurrentStep("Traversal complete");
      // Clear node states after completion
      setTimeout(() => {
        setNodeStates(new Map());
      }, 1000);
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
    setNodeStates(new Map());
    setCurrentNode(null);
    setCurrentLine(-1);
    setCurrentStep("");
  };

  const generateRandomTree = () => {
    let newTree: BinaryTreeNode = { value: null, children: [] };
    const numberOfNodes = Math.floor(Math.random() * 5) + 3; // Generate 3-7 nodes
    
    // Insert root node first
    const rootValue = Math.floor(Math.random() * 50) + 1;
    newTree = insertNode(newTree, rootValue, "auto");
    
    // Insert remaining nodes
    for (let i = 1; i < numberOfNodes; i++) {
      const value = Math.floor(Math.random() * 50) + 1;
      newTree = insertNode(newTree, value, "auto");
    }
    
    setTree(newTree);
    toast.success(`Generated a random tree with ${numberOfNodes} nodes`);
  };

  const handleInsertNode = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    setTree(prevTree => insertNode(prevTree, value, "auto"));
    setInputValue("");
    toast.success(`Node ${value} inserted successfully`);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Binary Tree Visualization</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Available Operations</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Enter a number and select insertion position (Left, Right, or Auto)</li>
          <li>• Click "Insert Node" to add a new node at the selected position</li>
          <li>• Click on a node to select it for updating</li>
          <li>• Double click on a node to delete it</li>
          <li>• Select a traversal type (Preorder, Inorder, or Postorder)</li>
          <li>• Use traversal controls to visualize the algorithm step by step</li>
          <li>• Watch the pseudocode highlight as the traversal progresses</li>
          <li>• View the sequence of visited nodes in real-time</li>
        </ul>
      </div>
      
      <div className="flex justify-end mb-2">
        <Button
          onClick={generateRandomTree}
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
              <TreeVisualization
                tree={tree}
                onNodeDelete={() => {}}
                onNodeClick={() => {}}
                onNodeHighlight={setCurrentNode}
                currentNode={currentNode}
                visitedNodes={visitedNodes}
                nodeStates={nodeStates}
              />
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <TraversalControls
                  onStart={startTraversal}
                  onPause={pauseTraversal}
                  onReset={resetTraversal}
                  isTraversing={isTraversing}
                  traversalType={traversalType}
                  onTraversalTypeChange={setTraversalType}
                />
                
                {visitedNodes.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Visitation Sequence:</h3>
                    <div className="flex flex-wrap gap-2">
                      {visitedNodes.map((value, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Controls and pseudocode panel - 4 columns */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <form onSubmit={handleInsertNode} className="space-y-3">
                <div>
                  <Label htmlFor="nodeValue" className="text-sm">Node Value</Label>
                  <Input
                    id="nodeValue"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a number"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full gap-1" size="sm">
                  <Plus className="w-4 h-4" />
                  Insert Node
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-lg">{traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <TraversalPseudocode
                currentStep={currentStep}
                currentLine={currentLine}
                traversalType={traversalType}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BinaryTree;
