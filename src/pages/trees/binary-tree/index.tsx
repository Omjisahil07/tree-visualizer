import { useState, useCallback } from "react";
import { TreeVisualization } from "./TreeVisualization";
import { BinaryTreeNode, InsertPosition } from "./types/BinaryTreeTypes";
import { insertNode, deleteNode, updateNode, traverseInOrder, traversePreOrder, traversePostOrder } from "./operations/BinaryTreeOperations";
import { TraversalPseudocode } from "./components/TraversalPseudocode";
import { VisitationSequence } from "./components/VisitationSequence";
import { TraversalControls } from "./components/TraversalControls";
import { Instructions } from "./components/Instructions";
import { TreeForm } from "./components/TreeForm";
import { Footer } from "@/components/Footer";

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