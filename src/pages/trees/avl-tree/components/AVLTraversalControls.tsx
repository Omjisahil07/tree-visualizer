import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause, RotateCcw } from "lucide-react";
import { TraversalType } from "../types/AVLTypes";

interface AVLTraversalControlsProps {
  traversalType: TraversalType;
  setTraversalType: (type: TraversalType) => void;
  isTraversing: boolean;
  startTraversal: () => void;
  stopTraversal: () => void;
  resetTraversal: () => void;
}

export const AVLTraversalControls = ({
  traversalType,
  setTraversalType,
  isTraversing,
  startTraversal,
  stopTraversal,
  resetTraversal,
}: AVLTraversalControlsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Select
        value={traversalType}
        onValueChange={(value) => setTraversalType(value as TraversalType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select traversal type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inorder">Inorder</SelectItem>
          <SelectItem value="preorder">Preorder</SelectItem>
          <SelectItem value="postorder">Postorder</SelectItem>
          <SelectItem value="levelorder">Level Order</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="space-x-2">
        {!isTraversing ? (
          <Button onClick={startTraversal} size="sm">
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button onClick={stopTraversal} size="sm" variant="secondary">
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
        )}
        <Button
          onClick={resetTraversal}
          size="sm"
          variant="outline"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};