
import { toast } from "sonner";
import { BinaryTreeHeader } from "./components/BinaryTreeHeader";
import { BinaryTreeInstructions } from "./components/BinaryTreeInstructions";
import { BinaryTreeVisualizationPanel } from "./components/BinaryTreeVisualizationPanel";
import { BinaryTreeControlPanel } from "./components/BinaryTreeControlPanel";
import { useBinaryTree } from "./hooks/useBinaryTree";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

const BinaryTree = () => {
  const {
    tree,
    currentNode,
    visitedNodes,
    nodeStates,
    isTraversing,
    currentStep,
    currentLine,
    traversalType,
    setTraversalType,
    startTraversal,
    pauseTraversal,
    resetTraversal,
    generateRandomTree,
    insertNodeInTree,
  } = useBinaryTree();

  const handleGenerateRandomTree = () => {
    const nodeCount = generateRandomTree();
    toast.success(`Generated a random tree with ${nodeCount} nodes`);
  };

  const handleInsertNode = (value: number) => {
    insertNodeInTree(value);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Binary Tree Visualization</h1>
      
      <BinaryTreeInstructions />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <BinaryTreeVisualizationPanel
          tree={tree}
          currentNode={currentNode}
          visitedNodes={visitedNodes}
          nodeStates={nodeStates}
          isTraversing={isTraversing}
          traversalType={traversalType}
          currentStep={currentStep}
          currentLine={currentLine}
          onStartTraversal={startTraversal}
          onPauseTraversal={pauseTraversal}
          onResetTraversal={resetTraversal}
          onTraversalTypeChange={setTraversalType}
        />
        
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-end mb-2">
            <Button
              onClick={handleGenerateRandomTree}
              variant="outline"
              size="sm"
              className="w-full gap-1"
            >
              <Wand2 className="w-4 h-4" />
              Generate Random Tree
            </Button>
          </div>
          
          <BinaryTreeControlPanel
            onInsertNode={handleInsertNode}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BinaryTree;
