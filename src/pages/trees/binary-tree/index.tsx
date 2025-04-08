
import { toast } from "sonner";
import { TreeVisualization } from "./TreeVisualization";
import { TraversalPseudocode } from "./components/TraversalPseudocode";
import { TraversalControls } from "./components/TraversalControls";
import { NodeInsertForm } from "./components/NodeInsertForm";
import { BinaryTreeInstructions } from "./components/BinaryTreeInstructions";
import { NodeVisitationSequence } from "./components/NodeVisitationSequence";
import { useBinaryTree } from "./hooks/useBinaryTree";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      
      <div className="flex justify-end mb-2">
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
        {/* Main visualization panel - 8 columns */}
        <div className="lg:col-span-8">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <TreeVisualization
                tree={tree}
                onNodeDelete={() => {}}
                onNodeClick={() => {}}
                onNodeHighlight={setCurrentNode => {}}
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
                
                <NodeVisitationSequence visitedNodes={visitedNodes} />
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
              <NodeInsertForm onInsert={handleInsertNode} />
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
