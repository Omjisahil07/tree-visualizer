
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
    <div className="mt-16 mb-8 flex justify-center gap-6 items-center">
      <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
        {isDoubly ? <RefreshCcw className="h-5 w-5 text-slate-600" /> : <RotateCcw className="h-5 w-5 text-slate-600" />}
        <span className="text-xs font-medium text-slate-600 mx-1">
          {isDoubly ? "Double Circular Connection" : "Circular Connection"}
        </span>
      </div>
      <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
        {traversalDirection === "forward" ? <ArrowRight className="h-5 w-5 text-blue-600" /> : <ArrowLeft className="h-5 w-5 text-blue-600" />}
        <span className="text-xs font-medium text-blue-600 mx-1">
          {traversalDirection === "forward" ? "Forward Traversal" : "Reverse Traversal"}
        </span>
      </div>
    </div>
  );
};
