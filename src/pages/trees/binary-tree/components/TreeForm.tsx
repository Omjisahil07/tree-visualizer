
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { InsertPosition } from "../types/BinaryTreeTypes";

interface TreeFormProps {
  onInsert: (value: number, position: InsertPosition, parentValue?: number) => void;
  onUpdate: (oldValue: number, newValue: number) => void;
  selectedNode: number | null;
}

export const TreeForm = ({ onInsert, onUpdate, selectedNode }: TreeFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [insertPosition, setInsertPosition] = useState<InsertPosition>("auto");

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    onInsert(value, insertPosition, selectedNode || undefined);
    setInputValue("");
    toast.success(`Node ${value} inserted successfully`);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNode === null) {
      toast.error("Please select a node to update");
      return;
    }
    const newValue = parseInt(updateValue);
    if (isNaN(newValue)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    onUpdate(selectedNode, newValue);
    setUpdateValue("");
    toast.success(`Node updated from ${selectedNode} to ${newValue}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Controls</h2>
        <form onSubmit={handleInsert} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nodeValue">Node Value</Label>
            <Input
              id="nodeValue"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insertPosition">Insert Position</Label>
            <Select value={insertPosition} onValueChange={(value: InsertPosition) => setInsertPosition(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
            {selectedNode !== null && (
              <p className="text-sm text-gray-600 mt-1">
                Selected parent node: {selectedNode}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            {selectedNode !== null ? `Insert Node as Child of ${selectedNode}` : 'Insert Node'}
          </Button>
        </form>
      </div>

      {selectedNode !== null && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Update Node</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="updateValue">New Value for Node {selectedNode}</Label>
              <Input
                id="updateValue"
                type="number"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                placeholder="Enter new value"
              />
            </div>
            <Button type="submit" className="w-full">
              Update Node
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
