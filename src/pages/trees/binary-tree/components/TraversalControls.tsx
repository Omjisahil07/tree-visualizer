import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TraversalControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isTraversing: boolean;
}

export const TraversalControls: React.FC<TraversalControlsProps> = ({
  onStart,
  onPause,
  onReset,
  isTraversing
}) => {
  return (
    <div className="flex gap-2">
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
  );
};