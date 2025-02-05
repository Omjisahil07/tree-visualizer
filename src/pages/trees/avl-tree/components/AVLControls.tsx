import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AVLControlsProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  updateValue: string;
  setUpdateValue: (value: string) => void;
  selectedNode: number | null;
  handleInsert: (e: React.FormEvent) => void;
  handleUpdate: (e: React.FormEvent) => void;
}

export const AVLControls = ({
  inputValue,
  setInputValue,
  updateValue,
  setUpdateValue,
  selectedNode,
  handleInsert,
  handleUpdate,
}: AVLControlsProps) => {
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
          <Button type="submit" className="w-full">
            Insert Node
          </Button>
        </form>
      </div>

      {selectedNode !== null && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">
            Update Node {selectedNode}
          </h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="updateValue">New Value</Label>
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