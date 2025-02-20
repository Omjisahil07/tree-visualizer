
import { useState } from "react";
import { Graph } from "../types/GraphTypes";
import { DFSVisualization } from "./components/DFSVisualization";
import { DFSControls } from "./components/DFSControls";
import { DFSPseudocode } from "./components/DFSPseudocode";
import { VisitationSequence } from "../components/VisitationSequence";
import { dfsTraversal } from "./operations/DFSOperations";
import { Footer } from "@/components/Footer";

const DFS = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");

  const handleTraversalStep = async (nodeId: number, step: string) => {
    setCurrentNode(nodeId);
    setCurrentStep(step);
    setVisitedNodes(prev => [...prev, nodeId]);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const startTraversal = async (startNodeId: number) => {
    setIsTraversing(true);
    setVisitedNodes([]);
    setCurrentNode(null);
    await dfsTraversal(graph, startNodeId, handleTraversalStep);
    setIsTraversing(false);
    setCurrentNode(null);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Depth First Search (DFS)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <DFSVisualization
            graph={graph}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
          
          <div className="space-y-4">
            <DFSControls
              onStartTraversal={startTraversal}
              isTraversing={isTraversing}
              graph={graph}
              setGraph={setGraph}
            />
            <VisitationSequence sequence={visitedNodes} />
          </div>
        </div>
        
        <div>
          <DFSPseudocode
            currentStep={currentStep}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DFS;
