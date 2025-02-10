
import { useState, useCallback } from "react";
import { TreeVisualization } from "./TreeVisualization";
import { BinaryTreeNode, InsertPosition } from "./types/BinaryTreeTypes";
import { insertNode } from "./operations/insert/insertNode";
import { deleteNode } from "./operations/delete/deleteNode";
import { updateNode } from "./operations/update/updateNode";
import { 
  traverseInOrder,
  traversePreOrder,
  traversePostOrder 
} from "./operations/traversal/traversalOperations";
import { TraversalPseudocode } from "./components/TraversalPseudocode";
import { VisitationSequence } from "./components/VisitationSequence";
import { TraversalControls } from "./components/TraversalControls";
import { Instructions } from "./components/Instructions";
import { TreeForm } from "./components/TreeForm";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";

const BinaryTree = () => {
  const [tree, setTree] = useState<BinaryTreeNode>({ value: null, children: [] });
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [traversalType, setTraversalType] = useState("inorder");

  const handleTraversalStep = useCallback(async (value: number | null, step: string) => {
    setCurrentNode(value);
    setCurrentStep(step);
    setVisitedNodes(prev => (value !== null && !prev.includes(value) ? [...prev, value] : prev));
    setCurrentLine(prev => prev + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
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
  };

  const handleDelete = (value: number) => {
    setTree(prevTree => deleteNode(prevTree, value));
    if (selectedNode === value) {
      setSelectedNode(null);
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

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualization</h1>
      
      <Instructions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-end mb-4">
            <Button
              onClick={generateRandomTree}
              variant="outline"
              className="gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Random Tree
            </Button>
          </div>
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
          <TreeForm
            onInsert={(value, position) => setTree(prevTree => insertNode(prevTree, value, position))}
            onUpdate={(oldValue, newValue) => {
              setTree(prevTree => updateNode(prevTree, oldValue, newValue));
              setSelectedNode(null);
            }}
            selectedNode={selectedNode}
          />

          <TraversalPseudocode
            currentStep={currentStep}
            currentLine={currentLine}
            traversalType={traversalType}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BinaryTree;
