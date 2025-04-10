
import { BPlusTreePseudocode } from "./components/BPlusTreePseudocode";
import { BPlusTreeVisualization } from "./components/BPlusTreeVisualization";
import { BPlusTreeTraversalControls } from "./components/BPlusTreeTraversalControls";
import { BPlusTreeNodeInsertForm } from "./components/BPlusTreeNodeInsertForm";
import { BPlusTreeConfigForm } from "./components/BPlusTreeConfigForm";
import { BPlusTreeActions } from "./components/BPlusTreeActions";
import { useState, useCallback } from "react";
import { Footer } from "@/components/Footer";
import { BPlusTreeNode, TraversalType } from "./types/BPlusTreeTypes";
import { BPlusTreeOperations } from "./operations/BPlusTreeOperations";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const BPlusTree = () => {
  const [tree, setTree] = useState<BPlusTreeNode | null>(null);
  const [treeOperations, setTreeOperations] = useState<BPlusTreeOperations | null>(null);
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [traversalType, setTraversalType] = useState<TraversalType>("inorder");
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const handleSetDegree = (degree: number) => {
    setTreeOperations(new BPlusTreeOperations(degree));
    // Initialize an empty tree
    setTree({
      keys: [],
      children: [],
      isLeaf: true,
      next: null
    });
    toast.success(`B+ Tree initialized with degree ${degree}`);
  };

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

  const generateRandomBPlusTree = () => {
    if (!treeOperations) {
      toast.error("Please set the B+ tree degree first");
      return;
    }

    const numNodes = Math.floor(Math.random() * 8) + 3;
    const numbers = new Set<number>();
    
    while (numbers.size < numNodes) {
      numbers.add(Math.floor(Math.random() * 100) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    let currentTree: BPlusTreeNode = {
      keys: [],
      children: [],
      isLeaf: true,
      next: null
    };

    sortedNumbers.forEach(num => {
      currentTree = treeOperations.insertNode(currentTree, num);
    });

    setTree(currentTree);
    setVisitedNodes([]);
    setCurrentNode(null);
    toast.success("Generated new random B+ tree");
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!treeOperations || !tree) {
      toast.error("Please set the B+ tree degree first");
      return;
    }

    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (treeOperations.searchNode(tree, value)) {
      toast.error(`Value ${value} already exists in the tree`);
      return;
    }

    const updatedTree = treeOperations.insertNode(tree, value);
    setTree(updatedTree);
    setVisitedNodes([]);
    setCurrentNode(null);
    toast.success(`Inserted node with value ${value}`);
    setInputValue("");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">B+ Tree Visualization</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Available Operations</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Set the B+ tree degree first, then insert nodes or generate a random tree.</li>
          <li>• Enter a number to insert a new node in the B+ tree.</li>
          <li>• B+ Trees store keys in both <strong>internal nodes</strong> and <strong>leaf nodes</strong>.</li>
          <li>• Leaf nodes are connected by <strong>next pointers</strong> for efficient range queries.</li>
          <li>• Use the traversal controls to visualize different ways to navigate the tree.</li>
          <li>• Watch the pseudocode highlight as the traversal progresses.</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main visualization panel - 8 columns */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <BPlusTreeVisualization
                tree={tree}
                currentNode={currentNode}
                visitedNodes={visitedNodes}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <BPlusTreeTraversalControls
                onStart={() => {
                  if (!treeOperations || !tree || tree.keys.length === 0) {
                    toast.error("Please create a B+ tree with at least one node first");
                    return;
                  }
                  setIsTraversing(true);
                  setIsPaused(false);
                  setVisitedNodes([]);
                  setCurrentNode(null);
                  setCurrentLine(0);
                  setCurrentStep("");

                  const traversalFunction = {
                    inorder: treeOperations.traverseInOrder.bind(treeOperations),
                    preorder: treeOperations.traversePreOrder.bind(treeOperations),
                    postorder: treeOperations.traversePostOrder.bind(treeOperations),
                    levelorder: treeOperations.traverseLevelOrder.bind(treeOperations),
                  }[traversalType];

                  if (!traversalFunction) return;

                  traversalFunction(tree, handleTraversalStep).then(() => {
                    if (!isPaused) {
                      setIsTraversing(false);
                      setCurrentLine(-1);
                      setCurrentStep("Traversal complete");
                    }
                  });
                }}
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
            </CardContent>
          </Card>
        </div>
        
        {/* Controls and pseudocode panel - 4 columns */}
        <div className="lg:col-span-4 space-y-4">
          {!treeOperations ? (
            <BPlusTreeConfigForm onSetDegree={handleSetDegree} />
          ) : (
            <>
              <BPlusTreeActions 
                onGenerateRandom={generateRandomBPlusTree}
                isConfigured={treeOperations !== null}
              />
              
              <BPlusTreeNodeInsertForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleInsert={handleInsert}
                disabled={!treeOperations}
              />
            </>
          )}
          
          <BPlusTreePseudocode
            currentStep={currentStep}
            currentLine={currentLine}
            traversalType={traversalType}
          />
        </div>
      </div>
    </div>
  );
};

export default BPlusTree;
