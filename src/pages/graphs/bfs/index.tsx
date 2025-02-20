
import { useState } from "react";
import { Graph } from "../types/GraphTypes";
import { BFSVisualization } from "./components/BFSVisualization";
import { BFSControls } from "./components/BFSControls";
import { BFSPseudocode } from "./components/BFSPseudocode";
import { VisitationSequence } from "../components/VisitationSequence";
import { bfsTraversal } from "./operations/BFSOperations";
import { Footer } from "@/components/Footer";

const BFS = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(0);

  const handleTraversalStep = async (nodeId: number, step: string, line: number) => {
    setCurrentNode(nodeId);
    setCurrentStep(step);
    setCurrentLine(line);
    setVisitedNodes(prev => [...prev, nodeId]);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const startTraversal = async (startNodeId: number) => {
    setIsTraversing(true);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentLine(0);
    await bfsTraversal(graph, startNodeId, handleTraversalStep);
    setIsTraversing(false);
    setCurrentNode(null);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Breadth First Search (BFS)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BFSVisualization
            graph={graph}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="space-y-4">
            <BFSControls
              onStartTraversal={(value) => startTraversal(value)}
              isTraversing={isTraversing}
              graph={graph}
              setGraph={setGraph}
            />
            <VisitationSequence sequence={visitedNodes} />
          </div>
        </div>
        
        <div>
          <BFSPseudocode
            currentStep={currentStep}
            currentLine={currentLine}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BFS;
