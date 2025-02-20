
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Graph, GraphNode } from "../../types/GraphTypes";
import { useState } from "react";

interface BFSControlsProps {
  onStartTraversal: (value: number) => void;
  isTraversing: boolean;
  graph: Graph;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
}

export const BFSControls = ({
  onStartTraversal,
  isTraversing,
  graph,
  setGraph
}: BFSControlsProps) => {
  const [nodeValue, setNodeValue] = useState("");
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [startNode, setStartNode] = useState<number | null>(null);

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (nodeValue) {
      const newNode: GraphNode = {
        id: graph.nodes.length,
        value: parseInt(nodeValue),
        neighbors: []
      };
      setGraph(prev => ({
        ...prev,
        nodes: [...prev.nodes, newNode]
      }));
      setNodeValue("");
    }
  };

  const handleAddEdge = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromNode && toNode) {
      const from = parseInt(fromNode);
      const to = parseInt(toNode);
      setGraph(prev => ({
        ...prev,
        edges: [...prev.edges, [from, to]],
        nodes: prev.nodes.map(node => {
          if (node.id === from) {
            return { ...node, neighbors: [...node.neighbors, to] };
          }
          return node;
        })
      }));
      setFromNode("");
      setToNode("");
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <h3 className="text-lg font-medium mb-4">Add Node</h3>
        <form onSubmit={handleAddNode} className="flex gap-2">
          <Input
            type="number"
            placeholder="Node value"
            value={nodeValue}
            onChange={(e) => setNodeValue(e.target.value)}
          />
          <Button type="submit">Add Node</Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Add Edge</h3>
        <form onSubmit={handleAddEdge} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="From node"
              value={fromNode}
              onChange={(e) => setFromNode(e.target.value)}
            />
            <Input
              type="number"
              placeholder="To node"
              value={toNode}
              onChange={(e) => setToNode(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Add Edge</Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Start Traversal</h3>
        <div className="space-y-2">
          <Select
            value={startNode?.toString()}
            onValueChange={(value) => setStartNode(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select start node" />
            </SelectTrigger>
            <SelectContent>
              {graph.nodes.map((node) => (
                <SelectItem key={node.id} value={node.id.toString()}>
                  Node {node.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            className="w-full" 
            onClick={() => startNode !== null && onStartTraversal(startNode)}
            disabled={isTraversing || startNode === null}
          >
            {isTraversing ? "Traversing..." : "Start BFS"}
          </Button>
        </div>
      </div>
    </div>
  );
};
