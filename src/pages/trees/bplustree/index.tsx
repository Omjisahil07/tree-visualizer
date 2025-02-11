
import { BPlusTreePseudocode } from "./components/BPlusTreePseudocode";
import { BPlusTreeVisualization } from "./components/BPlusTreeVisualization";
import { BPlusTreeTraversalControls } from "./components/BPlusTreeTraversalControls";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { BPlusTreeNode, TraversalType } from "./types/BPlusTreeTypes";

const BPlusTree = () => {
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [traversalType, setTraversalType] = useState<TraversalType>("inorder");
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);

  // Sample B+ tree for initial visualization
  const sampleTree: BPlusTreeNode = {
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
  };

  const handleStart = () => {
    setIsTraversing(true);
    // Implement traversal logic here
  };

  const handlePause = () => {
    setIsTraversing(false);
  };

  const handleReset = () => {
    setIsTraversing(false);
    setCurrentNode(null);
    setVisitedNodes([]);
    setCurrentLine(-1);
    setCurrentStep("");
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">B+ Tree Visualization</h1>
        <p className="text-muted-foreground text-lg">
          Explore B+ Tree data structure and its traversal algorithms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <BPlusTreeVisualization
              tree={sampleTree}
              currentNode={currentNode}
              visitedNodes={visitedNodes}
            />
            <div className="mt-4">
              <BPlusTreeTraversalControls
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleReset}
                isTraversing={isTraversing}
                traversalType={traversalType}
                onTraversalTypeChange={setTraversalType}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
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
