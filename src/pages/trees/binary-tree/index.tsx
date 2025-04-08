
import { toast } from "sonner";
import { BinaryTreeHeader } from "./components/BinaryTreeHeader";
import { BinaryTreeInstructions } from "./components/BinaryTreeInstructions";
import { BinaryTreeVisualizationPanel } from "./components/BinaryTreeVisualizationPanel";
import { BinaryTreeControlPanel } from "./components/BinaryTreeControlPanel";
import { useBinaryTree } from "./hooks/useBinaryTree";
import { Footer } from "@/components/Footer";

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
      <BinaryTreeHeader onGenerateRandomTree={handleGenerateRandomTree} />
      
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
        
        <BinaryTreeControlPanel
          onInsertNode={handleInsertNode}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BinaryTree;
