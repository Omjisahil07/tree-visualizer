import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TraversalControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isTraversing: boolean;
  traversalType: string;
  onTraversalTypeChange: (type: string) => void;
}

export const TraversalControls = ({
  onStart,
  onPause,
  onReset,
  isTraversing,
  traversalType,
  onTraversalTypeChange,
}: TraversalControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={traversalType} onValueChange={onTraversalTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select traversal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inorder">Inorder Traversal</SelectItem>
            <SelectItem value="preorder">Preorder Traversal</SelectItem>
            <SelectItem value="postorder">Postorder Traversal</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={isTraversing ? onPause : onStart}
          className="gap-2"
        >
          {isTraversing ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start Traversal
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};