
import { toast } from "sonner";
import { BinaryTreeInstructions } from "./components/BinaryTreeInstructions";
import { BinaryTreeVisualizationPanel } from "./components/BinaryTreeVisualizationPanel";
import { useBinaryTree } from "./hooks/useBinaryTree";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TraversalPseudocode } from "./components/TraversalPseudocode";

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
  } = useBinaryTree();

  const handleGenerateRandomTree = () => {
    const nodeCount = generateRandomTree();
    toast.success(`Generated a random tree with ${nodeCount} nodes`);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Binary Tree Visualization</h1>
      
      <BinaryTreeInstructions />
      
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleGenerateRandomTree}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Wand2 className="w-4 h-4" />
          Generate Random Tree
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visualization - 8 columns */}
        <div className="lg:col-span-8">
          <Card className="shadow-sm">
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        </div>
        
        {/* Pseudocode - 4 columns */}
        <div className="lg:col-span-4">
          <Card className="shadow-sm h-full">
            <CardContent className="p-4">
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
