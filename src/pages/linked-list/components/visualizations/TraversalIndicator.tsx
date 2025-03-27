
import React from "react";
import { ArrowRight, ArrowLeft, RefreshCcw, RotateCcw } from "lucide-react";

interface TraversalIndicatorProps {
  traversalDirection?: "forward" | "reverse";
  isDoubly: boolean;
}

export const TraversalIndicator: React.FC<TraversalIndicatorProps> = ({
  traversalDirection,
  isDoubly
}) => {
  if (!traversalDirection) return null;
  
  return (
    <div className="mt-20 mb-10 flex justify-center gap-6 items-center">
      <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
        {isDoubly ? <RefreshCcw className="h-4 w-4 text-slate-600" /> : <RotateCcw className="h-4 w-4 text-slate-600" />}
        <span className="text-xs font-medium text-slate-600">
          {isDoubly ? "Double Circular" : "Circular"}
        </span>
      </div>
      <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
        {traversalDirection === "forward" ? <ArrowRight className="h-4 w-4 text-blue-600" /> : <ArrowLeft className="h-4 w-4 text-blue-600" />}
        <span className="text-xs font-medium text-blue-600">
          {traversalDirection === "forward" ? "Forward Traversal" : "Reverse Traversal"}
        </span>
      </div>
    </div>
  );
};
