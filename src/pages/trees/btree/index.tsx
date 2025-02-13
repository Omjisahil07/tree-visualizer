import { BTreePseudocode } from "./components/BTreePseudocode";
import { BTreeVisualization } from "./components/BTreeVisualization";
import { BTreeTraversalControls } from "./components/BTreeTraversalControls";
import { useState, useCallback } from "react";
import { Footer } from "@/components/Footer";
import { BTreeNode, TraversalType } from "./types/BTreeTypes";
import { traverseInOrder, traversePreOrder, traversePostOrder, traverseLevelOrder } from "./operations/BTreeOperations";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Wand2 } from "lucide-react";

const BTree = () => {
  const [tree, setTree] = useState<BTreeNode>({
    keys: [10],
    isLeaf: false,
    children: [
      {
        keys: [5],
        isLeaf: false,
        children: [
          {
            keys: [3, 4],
            isLeaf: true,
            children: []
          },
          {
            keys: [6, 7],
            isLeaf: true,
            children: []
          }
        ]
      },
      {
        keys: [15],
        isLeaf: false,
        children: [
          {
            keys: [11, 12],
            isLeaf: true,
            children: []
          },
          {
            keys: [16, 17],
            isLeaf: true,
            children: []
          }
        ]
      }
    ]
  });
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [traversalType, setTraversalType] = useState<TraversalType>("inorder");
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleTraversalStep = useCallback(async (value: number, step: string) => {
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

  const handleNodeClick = (value: number) => {
    setSelectedNode(value);
    setUpdateValue(value.toString());
  };

  const handleDelete = (value: number) => {
    // Since full B-tree deletion is complex, we'll just show a toast for now
    toast.info("B-tree deletion requires rebalancing which is not implemented in this demo");
  };

  const generateRandomBTree = () => {
    // For demo purposes, we'll keep the current tree structure
    toast.info("Random B-tree generation would require complex balancing rules");
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">B-Tree Visualization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-end mb-4">
            <Button
              onClick={generateRandomBTree}
              variant="outline"
              className="gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Random Tree
            </Button>
          </div>
          
          <BTreeVisualization
            tree={tree}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <BTreeTraversalControls
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
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Controls</h2>
            <form className="space-y-4">
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
              <Button type="submit" className="w-full gap-2" disabled>
                <Plus className="h-4 w-4" />
                Insert Node
              </Button>
            </form>
          </div>

          <BTreePseudocode
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

export default BTree;
