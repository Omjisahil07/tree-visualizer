
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TraversalType } from "../types/BTreeTypes";

interface BTreeTraversalControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isTraversing: boolean;
  traversalType: TraversalType;
  onTraversalTypeChange: (type: TraversalType) => void;
}

export const BTreeTraversalControls = ({
  onStart,
  onPause,
  onReset,
  isTraversing,
  traversalType,
  onTraversalTypeChange,
}: BTreeTraversalControlsProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Select
          value={traversalType}
          onValueChange={(value) => onTraversalTypeChange(value as TraversalType)}
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
            <Button onClick={onStart} size="sm">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={onPause} size="sm" variant="secondary">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={onReset} size="sm" variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
