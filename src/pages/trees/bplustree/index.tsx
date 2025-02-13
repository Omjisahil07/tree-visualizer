
import { BPlusTreePseudocode } from "./components/BPlusTreePseudocode";
import { BPlusTreeVisualization } from "./components/BPlusTreeVisualization";
import { BPlusTreeTraversalControls } from "./components/BPlusTreeTraversalControls";
import { BPlusTreeControls } from "./components/BPlusTreeControls";
import { BPlusTreeHeader } from "./components/BPlusTreeHeader";
import { useState, useCallback } from "react";
import { Footer } from "@/components/Footer";
import { BPlusTreeNode, TraversalType } from "./types/BPlusTreeTypes";
import { traverseInOrder, traversePreOrder, traversePostOrder, traverseLevelOrder, insertNode } from "./operations/BPlusTreeOperations";
import { toast } from "sonner";

const BPlusTree = () => {
  const [tree, setTree] = useState<BPlusTreeNode>({
    keys: [10],
    isLeaf: false,
    next: null,
    children: [
      {
        keys: [5],
        isLeaf: false,
        next: null,
        children: [
          {
            keys: [3, 4],
            isLeaf: true,
            next: null,
            children: []
          },
          {
            keys: [6, 7],
            isLeaf: true,
            next: null,
            children: []
          }
        ]
      },
      {
        keys: [15],
        isLeaf: false,
        next: null,
        children: [
          {
            keys: [11, 12],
            isLeaf: true,
            next: null,
            children: []
          },
          {
            keys: [16, 17],
            isLeaf: true,
            next: null,
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

  const generateRandomBPlusTree = () => {
    const newTree: BPlusTreeNode = {
      keys: [],
      children: [],
      isLeaf: true,
      next: null
    };

    // Generate random numbers between 1 and 100
    const numNodes = Math.floor(Math.random() * 8) + 3; // 3 to 10 nodes
    const numbers = new Set<number>();
    
    while (numbers.size < numNodes) {
      numbers.add(Math.floor(Math.random() * 100) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    let currentTree = newTree;

    sortedNumbers.forEach(num => {
      currentTree = insertNode(currentTree, num) as BPlusTreeNode;
    });

    setTree(currentTree);
    toast.success("Generated new random B+ tree");
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }

    try {
      const updatedTree = insertNode(tree, value);
      setTree(updatedTree as BPlusTreeNode);
      toast.success(`Inserted node with value ${value}`);
      setInputValue("");
    } catch (error) {
      toast.error("Failed to insert node");
    }
  };

  return (
    <div className="container mx-auto py-12">
      <BPlusTreeHeader onGenerateRandom={generateRandomBPlusTree} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BPlusTreeVisualization
            tree={tree}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <BPlusTreeTraversalControls
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
          <BPlusTreeControls
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleInsert}
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
