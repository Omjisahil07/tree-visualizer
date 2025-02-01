import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface TreeFormProps {
  onInsert: (value: number) => void;
  onUpdate: (oldValue: number, newValue: number) => void;
  selectedNode: number | null;
}

export const TreeForm = ({ onInsert, onUpdate, selectedNode }: TreeFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    onInsert(value);
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
          <Button type="submit" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Insert Node
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