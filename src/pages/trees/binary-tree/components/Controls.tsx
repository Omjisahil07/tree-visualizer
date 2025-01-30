import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface ControlsProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  updateValue: string;
  setUpdateValue: (value: string) => void;
  selectedNode: number | null;
  handleInsert: (e: React.FormEvent) => void;
  handleUpdate: (e: React.FormEvent) => void;
  handleTraversal: (type: 'inorder' | 'preorder' | 'postorder') => void;
  isTraversing: boolean;
}

const Controls = ({
  inputValue,
  setInputValue,
  updateValue,
  setUpdateValue,
  selectedNode,
  handleInsert,
  handleUpdate,
  handleTraversal,
  isTraversing
}: ControlsProps) => {
  return (
    <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
      <div>
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
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Update Node</h3>
          <form onSubmit={handleUpdate} className="space-y-2">
            <Label htmlFor="updateValue">New Value for Node {selectedNode}</Label>
            <Input
              id="updateValue"
              type="number"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder="Enter new value"
            />
            <Button type="submit" className="w-full">
              Update Node
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Traversal Controls</h3>
        <div className="grid grid-cols-1 gap-2">
          <Button 
            onClick={() => handleTraversal('inorder')}
            disabled={isTraversing}
            variant="outline"
          >
            In-order Traversal
          </Button>
          <Button 
            onClick={() => handleTraversal('preorder')}
            disabled={isTraversing}
            variant="outline"
          >
            Pre-order Traversal
          </Button>
          <Button 
            onClick={() => handleTraversal('postorder')}
            disabled={isTraversing}
            variant="outline"
          >
            Post-order Traversal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Controls;