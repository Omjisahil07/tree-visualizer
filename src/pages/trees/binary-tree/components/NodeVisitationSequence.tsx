
import React from "react";

interface NodeVisitationSequenceProps {
  visitedNodes: number[];
}

export const NodeVisitationSequence = ({ visitedNodes }: NodeVisitationSequenceProps) => {
  if (visitedNodes.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Visitation Sequence:</h3>
      <div className="flex flex-wrap gap-2">
        {visitedNodes.map((value, index) => (
          <span
            key={index}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};
