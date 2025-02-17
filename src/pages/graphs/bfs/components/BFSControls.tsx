import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraphNode } from "../../types/GraphTypes";
import { useState } from "react";

interface BFSControlsProps {
  onAddNode: (value: string) => void;
  onAddEdge: (from: string, to: string) => void;
  onStartTraversal: () => void;
  isTraversing: boolean;
  nodes: GraphNode[];
  startNode: number | null;
  onStartNodeChange: (value: number) => void;
}

export const BFSControls = ({
  onAddNode,
  onAddEdge,
  onStartTraversal,
  isTraversing,
  nodes,
  startNode,
  onStartNodeChange
}: BFSControlsProps) => {
  const [nodeValue, setNodeValue] = useState("");
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (nodeValue) {
      onAddNode(nodeValue);
      setNodeValue("");
    }
  };

  const handleAddEdge = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromNode && toNode) {
      onAddEdge(fromNode, toNode);
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
            onValueChange={(value) => onStartNodeChange(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select start node" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((node) => (
                <SelectItem key={node.id} value={node.id.toString()}>
                  Node {node.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            className="w-full" 
            onClick={onStartTraversal}
            disabled={isTraversing || startNode === null}
          >
            {isTraversing ? "Traversing..." : "Start BFS"}
          </Button>
        </div>
      </div>
    </div>
  );
};
