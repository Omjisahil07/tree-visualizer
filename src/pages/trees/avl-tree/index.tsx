/**
 * Main AVL Tree visualization component
 */
import { useState } from "react";
import { AVLVisualization } from "./components/AVLVisualization";
import { AVLPseudocode } from "./components/AVLPseudocode";
import { AVLControls } from "./components/AVLControls";
import { AVLTraversalControls } from "./components/AVLTraversalControls";
import { TraversalType } from "./types/AVLTypes";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAVLTree } from "./hooks/useAVLTree";

const AVLTree = () => {
  const [traversalType, setTraversalType] = useState<TraversalType>("inorder");
  const {
    tree,
    selectedNode,
    inputValue,
    updateValue,
    currentNode,
    visitedNodes,
    isTraversing,
    currentStep,
    setInputValue,
    setUpdateValue,
    setIsTraversing,
    setVisitedNodes,
    setCurrentNode,
    setCurrentStep,
    handleInsert,
    handleNodeClick,
    handleUpdate,
    handleDelete,
    startTraversal,
    generateRandomTree
  } = useAVLTree();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">AVL Tree Visualization</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Available Operations</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Enter a number to insert a new node (tree will auto-balance)</li>
          <li>• Click on a node to select it for updating</li>
          <li>• Double click on a node to delete it</li>
          <li>• Watch the balance factors update automatically</li>
          <li>• Use traversal controls to visualize the algorithm</li>
        </ul>
      </div>
      
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
          
          <AVLVisualization
            tree={tree}
            onNodeDelete={handleDelete}
            onNodeClick={handleNodeClick}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AVLTraversalControls
              traversalType={traversalType}
              setTraversalType={setTraversalType}
              isTraversing={isTraversing}
              startTraversal={() => startTraversal(traversalType)}
              stopTraversal={() => setIsTraversing(false)}
              resetTraversal={() => {
                setIsTraversing(false);
                setVisitedNodes([]);
                setCurrentNode(null);
                setCurrentStep("");
              }}
            />

            {visitedNodes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Visitation Sequence:</h3>
                <div className="flex flex-wrap gap-2">
                  {visitedNodes.map((value, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <AVLControls
            inputValue={inputValue}
            setInputValue={setInputValue}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
            selectedNode={selectedNode}
            handleInsert={handleInsert}
            handleUpdate={handleUpdate}
          />

          {currentStep && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Current Operation</h3>
              <p className="text-sm text-primary">{currentStep}</p>
            </div>
          )}

          <AVLPseudocode
            traversalType={traversalType}
            currentStep={currentStep}
            currentLine={visitedNodes.length - 1}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AVLTree;