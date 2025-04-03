
import React from "react";
import { ArrowRight, ArrowLeft, RefreshCcw, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

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
        {isDoubly ? (
          <RefreshCcw className={cn("h-4 w-4 text-slate-600", "animate-spin-slow")} />
        ) : (
          <RotateCcw className={cn("h-4 w-4 text-slate-600", "animate-spin-slow")} />
        )}
        <span className="text-xs font-medium text-slate-600">
          {isDoubly ? "Double Circular" : "Circular"}
        </span>
      </div>
      <div className={cn(
        "flex items-center gap-1 px-3 py-1 rounded-full transition-colors",
        traversalDirection === "forward" ? "bg-blue-100" : "bg-indigo-100"
      )}>
        {traversalDirection === "forward" ? (
          <ArrowRight className={cn("h-4 w-4 text-blue-600", "animate-slide-right")} />
        ) : (
          <ArrowLeft className={cn("h-4 w-4 text-indigo-600", "animate-slide-left")} />
        )}
        <span className={cn(
          "text-xs font-medium",
          traversalDirection === "forward" ? "text-blue-600" : "text-indigo-600"
        )}>
          {traversalDirection === "forward" ? "Forward Traversal" : "Reverse Traversal"}
        </span>
      </div>
    </div>
  );
};
