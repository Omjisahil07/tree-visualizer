
import { useState, useCallback } from "react";
import { Graph, GraphNode } from "../types/GraphTypes";
import { DFSVisualization } from "./components/DFSVisualization";
import { DFSControls } from "./components/DFSControls";
import { DFSPseudocode } from "./components/DFSPseudocode";
import { VisitationSequence } from "../components/VisitationSequence";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { dfsTraversal } from "./operations/DFSOperations";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";

const DFS = () => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [startNode, setStartNode] = useState<number | null>(null);
  const [isDirected, setIsDirected] = useState(true);

  const generateRandomGraph = () => {
    const numNodes = Math.floor(Math.random() * 4) + 3; // 3-6 nodes
    const newNodes: GraphNode[] = [];
    const newEdges: [number, number][] = [];
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      newNodes.push({
        id: i,
        value: Math.floor(Math.random() * 100),
        neighbors: []
      });
    }
    
    // Create random edges (ensuring connected graph)
    for (let i = 1; i < numNodes; i++) {
      const targetNode = Math.floor(Math.random() * i);
      newEdges.push([i, targetNode]);
      newNodes[i].neighbors.push(targetNode);
      newNodes[targetNode].neighbors.push(i);
    }
    
    // Add a few more random edges
    for (let i = 0; i < numNodes; i++) {
      if (Math.random() < 0.3) {
        let target = Math.floor(Math.random() * numNodes);
        if (target !== i && !newNodes[i].neighbors.includes(target)) {
          newEdges.push([i, target]);
          newNodes[i].neighbors.push(target);
          newNodes[target].neighbors.push(i);
        }
      }
    }
    
    setGraph({ nodes: newNodes, edges: newEdges });
    setStartNode(0);
    toast.success("Generated random graph");
  };

  const handleTraversalStep = useCallback(async (nodeId: number, step: string) => {
    setCurrentNode(nodeId);
    setCurrentStep(step);
    setVisitedNodes(prev => !prev.includes(nodeId) ? [...prev, nodeId] : prev);
    setCurrentLine(prev => {
      if (step.includes("Visiting node")) return 1;
      if (step.includes("Moving to neighbor")) return 3;
      if (step.includes("Backtracking")) return 4;
      return prev;
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
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
    toast.success(`Added node with value ${value}. Node ID: ${newNode.id}`);
  };

  const addEdge = (from: number, to: number) => {
    // Validate that nodes exist
    if (!graph.nodes.find(n => n.id === from) || !graph.nodes.find(n => n.id === to)) {
      toast.error(`Invalid node IDs. Available IDs: ${graph.nodes.map(n => n.id).join(', ')}`);
      return;
    }

    if (from === to) {
      toast.error("Cannot create self-loop");
      return;
    }

    // Check if edge already exists
    if (graph.edges.some(([f, t]) => (f === from && t === to) || (f === to && t === from))) {
      toast.error("Edge already exists");
      return;
    }

    // Add edge safely with proper tuple type
    setGraph(prev => {
      const newEdge: [number, number] = [from, to];
      const newNodes = prev.nodes.map(node => {
        if (node.id === from) {
          return { ...node, neighbors: [...node.neighbors, to] };
        }
        if (node.id === to) {
          return { ...node, neighbors: [...node.neighbors, from] };
        }
        return node;
      });
      return {
        nodes: newNodes,
        edges: [...prev.edges, newEdge]
      };
    });

    toast.success(`Added edge from node ${from} to node ${to}`);
  };

  const startTraversal = async () => {
    if (graph.nodes.length === 0) {
      toast.error("Please add nodes to the graph first");
      return;
    }
    setIsTraversing(true);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentLine(-1);
    await dfsTraversal(graph, startNode || 0, handleTraversalStep);
    setIsTraversing(false);
    setCurrentLine(-1);
    setCurrentStep("Traversal complete");
  };

  const deleteNode = (nodeId: number) => {
    setGraph(prev => {
      // Remove all edges connected to this node
      const newEdges = prev.edges.filter(([from, to]) => 
        from !== nodeId && to !== nodeId
      );

      // Remove the node and update neighbors of remaining nodes
      const newNodes = prev.nodes
        .filter(node => node.id !== nodeId)
        .map(node => ({
          ...node,
          neighbors: node.neighbors.filter(n => n !== nodeId)
        }));

      return {
        nodes: newNodes,
        edges: newEdges
      };
    });

    // Reset start node if it was deleted
    if (startNode === nodeId) {
      setStartNode(null);
    }

    toast.success(`Deleted node ${nodeId}`);
  };

  const updateNode = (nodeId: number, newValue: number) => {
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === nodeId
          ? { ...node, value: newValue }
          : node
      )
    }));
    toast.success(`Updated node ${nodeId} to value ${newValue}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3">Depth First Search (DFS)</h1>
        <p className="text-muted-foreground text-lg mb-3">
          DFS explores as far as possible along each branch before backtracking.
        </p>
        <div className="bg-muted p-4 rounded-lg max-w-2xl mx-auto text-sm">
          <strong>Instructions:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1 text-left">
            <li>Add nodes to the graph using the controls</li>
            <li>Connect nodes by adding edges between them</li>
            <li>Click "Start DFS" to visualize the traversal</li>
            <li>Or use "Generate Random Graph" for a quick demo</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Toggle
          pressed={isDirected}
          onPressedChange={setIsDirected}
          className="gap-2"
        >
          {isDirected ? "Directed Graph" : "Undirected Graph"}
        </Toggle>
        <Button
          onClick={generateRandomGraph}
          variant="outline"
          className="gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Generate Random Graph
        </Button>
      </div>
      
      {/* Updated layout - main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main visualization panel */}
        <div className="lg:col-span-6">
          <Card className="shadow-sm mb-4">
            <CardContent className="p-4">
              <DFSVisualization
                graph={graph}
                currentNode={currentNode}
                visitedNodes={visitedNodes}
                isDirected={isDirected}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <VisitationSequence sequence={visitedNodes.map(nodeId => {
                const node = graph.nodes.find(n => n.id === nodeId);
                return node?.value || nodeId;
              })} />
            </CardContent>
          </Card>
        </div>

        {/* Pseudocode Panel - Now in the middle */}
        <div className="lg:col-span-3">
          <Card className="shadow-sm h-full">
            <CardContent className="p-4">
              <DFSPseudocode
                currentStep={currentStep}
                currentLine={currentLine}
              />
            </CardContent>
          </Card>
        </div>

        {/* Controls panel */}
        <div className="lg:col-span-3">
          <DFSControls
            onAddNode={(value) => addNode(parseInt(value))}
            onAddEdge={(from, to) => addEdge(parseInt(from), parseInt(to))}
            onDeleteNode={deleteNode}
            onUpdateNode={updateNode}
            onStartTraversal={startTraversal}
            isTraversing={isTraversing}
            nodes={graph.nodes}
            startNode={startNode}
            onStartNodeChange={setStartNode}
          />
        </div>
      </div>
    </div>
  );
};

export default DFS;
