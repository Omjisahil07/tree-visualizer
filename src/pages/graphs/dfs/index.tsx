
import { useState, useCallback } from "react";
import { Graph, GraphNode } from "../types/GraphTypes";
import { DFSVisualization } from "./components/DFSVisualization";
import { DFSControls } from "./components/DFSControls";
import { DFSPseudocode } from "./components/DFSPseudocode";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { dfsTraversal } from "./operations/DFSOperations";

const DFS = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [startNode, setStartNode] = useState<number | null>(null);

  const handleTraversalStep = useCallback(async (nodeId: number, step: string) => {
    setCurrentNode(nodeId);
    setCurrentStep(step);
    setVisitedNodes(prev => !prev.includes(nodeId) ? [...prev, nodeId] : prev);
    setCurrentLine(prev => prev + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
  }, []);

  const addNode = (value: number) => {
    const newNode: GraphNode = {
      id: graph.nodes.length,
      value,
      neighbors: []
    };
    setGraph(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
    toast.success(`Added node with value ${value}`);
  };

  const addEdge = (from: number, to: number) => {
    if (from === to) {
      toast.error("Cannot create self-loop");
      return;
    }
    if (graph.edges.some(([f, t]) => (f === from && t === to) || (f === to && t === from))) {
      toast.error("Edge already exists");
      return;
    }
    setGraph(prev => ({
      ...prev,
      edges: [...prev.edges, [from, to]],
      nodes: prev.nodes.map(node => {
        if (node.id === from) {
          return { ...node, neighbors: [...node.neighbors, to] };
        }
        if (node.id === to) {
          return { ...node, neighbors: [...node.neighbors, from] };
        }
        return node;
      })
    }));
    toast.success(`Added edge from ${from} to ${to}`);
  };

  const startTraversal = async () => {
    if (startNode === null) {
      toast.error("Please select a start node");
      return;
    }
    setIsTraversing(true);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentLine(0);
    await dfsTraversal(graph, startNode, handleTraversalStep);
    setIsTraversing(false);
    setCurrentLine(-1);
    setCurrentStep("Traversal complete");
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Depth First Search (DFS)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <DFSVisualization
            graph={graph}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
          />
        </div>

        <div className="space-y-6">
          <DFSControls
            onAddNode={(value) => addNode(parseInt(value))}
            onAddEdge={(from, to) => addEdge(parseInt(from), parseInt(to))}
            onStartTraversal={startTraversal}
            isTraversing={isTraversing}
            nodes={graph.nodes}
            startNode={startNode}
            onStartNodeChange={setStartNode}
          />

          <DFSPseudocode
            currentStep={currentStep}
            currentLine={currentLine}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DFS;
