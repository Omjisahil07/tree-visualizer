
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraphNode } from "../../types/GraphTypes";
import { useState } from "react";
import { toast } from "sonner";

interface DFSControlsProps {
  onAddNode: (value: string) => void;
  onAddEdge: (from: string, to: string) => void;
  onDeleteNode: (id: number) => void;
  onUpdateNode: (id: number, newValue: number) => void;
  onStartTraversal: () => void;
  isTraversing: boolean;
  nodes: GraphNode[];
  startNode: number | null;
  onStartNodeChange: (value: number) => void;
}

export const DFSControls = ({
  onAddNode,
  onAddEdge,
  onDeleteNode,
  onUpdateNode,
  onStartTraversal,
  isTraversing,
  nodes,
  startNode,
  onStartNodeChange
}: DFSControlsProps) => {
  const [nodeValue, setNodeValue] = useState("");
  const [fromNodeValue, setFromNodeValue] = useState("");
  const [toNodeValue, setToNodeValue] = useState("");
  const [selectedNode, setSelectedNode] = useState<string>("");
  const [newValue, setNewValue] = useState("");

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (nodeValue) {
      onAddNode(nodeValue);
      setNodeValue("");
    }
  };

  const handleAddEdge = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromNodeValue && toNodeValue) {
      // Find nodes by their values
      const fromNode = nodes.find(n => n.value === parseInt(fromNodeValue));
      const toNode = nodes.find(n => n.value === parseInt(toNodeValue));
      
      if (!fromNode || !toNode) {
        toast.error("One or both nodes not found");
        return;
      }

      onAddEdge(fromNode.id.toString(), toNode.id.toString());
      setFromNodeValue("");
      setToNodeValue("");
      toast.success(`Added edge from ${fromNodeValue} to ${toNodeValue}`);
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      const node = nodes.find(n => n.value === parseInt(selectedNode));
      if (node) {
        onDeleteNode(node.id);
        setSelectedNode("");
        toast.success(`Deleted node with value ${selectedNode}`);
      }
    }
  };

  const handleUpdateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNode && newValue) {
      const node = nodes.find(n => n.value === parseInt(selectedNode));
      if (node) {
        onUpdateNode(node.id, parseInt(newValue));
        setNewValue("");
        toast.success(`Updated node ${selectedNode} to ${newValue}`);
      }
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
              placeholder="From node value"
              value={fromNodeValue}
              onChange={(e) => setFromNodeValue(e.target.value)}
            />
            <Input
              type="number"
              placeholder="To node value"
              value={toNodeValue}
              onChange={(e) => setToNodeValue(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Add Edge</Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Delete Node</h3>
        <div className="space-y-2">
          <Select
            value={selectedNode}
            onValueChange={setSelectedNode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select node to delete" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((node) => (
                <SelectItem key={node.id} value={node.value.toString()}>
                  Node {node.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleDeleteNode} 
            className="w-full"
            variant="destructive"
            disabled={!selectedNode}
          >
            Delete Node
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Update Node</h3>
        <form onSubmit={handleUpdateNode} className="space-y-2">
          <Select
            value={selectedNode}
            onValueChange={setSelectedNode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select node to update" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((node) => (
                <SelectItem key={node.id} value={node.value.toString()}>
                  Node {node.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="New value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={!selectedNode || !newValue}
          >
            Update Node
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Start Traversal</h3>
        <div className="space-y-2">
          <Select
            value={startNode !== null ? nodes.find(n => n.id === startNode)?.value.toString() : ""}
            onValueChange={(value) => {
              const node = nodes.find(n => n.value === parseInt(value));
              if (node) onStartNodeChange(node.id);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select start node" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((node) => (
                <SelectItem key={node.id} value={node.value.toString()}>
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
            {isTraversing ? "Traversing..." : "Start DFS"}
          </Button>
        </div>
      </div>
    </div>
  );
};
