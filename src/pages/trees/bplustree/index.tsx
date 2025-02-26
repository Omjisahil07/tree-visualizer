
import { BPlusTreePseudocode } from "./components/BPlusTreePseudocode";
import { BPlusTreeVisualization } from "./components/BPlusTreeVisualization";
import { BPlusTreeTraversalControls } from "./components/BPlusTreeTraversalControls";
import { BPlusTreeControls } from "./components/BPlusTreeControls";
import { BPlusTreeHeader } from "./components/BPlusTreeHeader";
import { useState, useCallback } from "react";
import { Footer } from "@/components/Footer";
import { BPlusTreeNode, TraversalType } from "./types/BPlusTreeTypes";
import { BPlusTreeOperations } from "./operations/BPlusTreeOperations";
import { toast } from "sonner";

const BPlusTree = () => {
  const [tree, setTree] = useState<BPlusTreeNode>({
    keys: [],
    isLeaf: true,
    children: [],
    next: null
  });
  const [treeOperations, setTreeOperations] = useState<BPlusTreeOperations | null>(null);
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

  const handleSetDegree = (degree: number) => {
    setTreeOperations(new BPlusTreeOperations(degree));
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
    toast.success("Generated new random B+ tree");
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!treeOperations) {
      toast.error("Please set the B+ tree degree first");
      return;
    }

    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }

    const updatedTree = treeOperations.insertNode(tree, value);
    setTree(updatedTree);
    toast.success(`Inserted node with value ${value}`);
    setInputValue("");
  };

  return (
    <div className="container mx-auto py-12">
      <BPlusTreeHeader
        onGenerateRandom={generateRandomBPlusTree}
        onSetDegree={handleSetDegree}
        isConfigured={treeOperations !== null}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BPlusTreeVisualization
            tree={tree}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <BPlusTreeTraversalControls
              onStart={() => {
                if (!treeOperations) {
                  toast.error("Please set the B+ tree degree first");
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
          </div>
        </div>

        <div className="space-y-6">
          <BPlusTreeControls
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleInsert}
            disabled={!treeOperations}
          />

          <BPlusTreePseudocode
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

export default BPlusTree;
