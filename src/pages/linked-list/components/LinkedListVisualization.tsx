
import React, { useEffect, useState } from "react";
import { LinkedListNode, LinkedListType } from "../types/LinkedListTypes";
import { CircularVisualization } from "./visualizations/CircularVisualization";
import { LinearVisualization } from "./visualizations/LinearVisualization";
import { ListInfoPanel } from "./visualizations/ListInfoPanel";
import { TraversalIndicator } from "./visualizations/TraversalIndicator";
import { EmptyListMessage } from "./visualizations/EmptyListMessage";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkedListVisualizationProps {
  list: LinkedListNode[];
  currentNode: number | null;
  visitedNodes: number[];
  type: LinkedListType;
  traversalDirection?: "forward" | "reverse";
}

export const LinkedListVisualization: React.FC<LinkedListVisualizationProps> = ({
  list,
  currentNode,
  visitedNodes,
  type,
  traversalDirection = "forward"
}) => {
  const [lastVisitedNode, setLastVisitedNode] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Track the current traversal path to highlight the correct arrows
  useEffect(() => {
    if (currentNode !== null) {
      setIsAnimating(true);
      setLastVisitedNode(currentNode);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentNode]);

  if (list.length === 0) {
    return <EmptyListMessage />;
  }

  const isDoubly = type === "doubly" || type === "double-circular";
  const isCircular = type === "circular" || type === "double-circular";
  
  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg shadow-lg p-8 transition-all duration-300",
      isAnimating && "bg-slate-50"
    )}>
      {/* Display circular linked lists in a circle layout */}
      {isCircular ? (
        <CircularVisualization
          list={list}
          currentNode={currentNode}
          visitedNodes={visitedNodes}
          type={type}
          lastVisitedNode={lastVisitedNode}
          traversalDirection={traversalDirection}
        />
      ) : (
        <LinearVisualization
          list={list}
          currentNode={currentNode}
          visitedNodes={visitedNodes}
          type={type}
          lastVisitedNode={lastVisitedNode}
          traversalDirection={traversalDirection}
        />
      )}
      
      {/* Visual indicator for circular connection */}
      {isCircular && list.length > 0 && (
        <TraversalIndicator
          traversalDirection={traversalDirection}
          isDoubly={isDoubly}
        />
      )}
      
      {/* Add traversal direction indicator for linear lists */}
      {!isCircular && traversalDirection && (
        <div className="mt-10 mb-6 flex justify-center">
          <div className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-300",
            traversalDirection === "forward" ? "bg-blue-100" : "bg-indigo-100"
          )}>
            {traversalDirection === "forward" ? (
              <ArrowRight className={cn(
                "h-5 w-5",
                traversalDirection === "forward" ? "text-blue-600 animate-slide-right" : "text-indigo-600 animate-slide-left"
              )} />
            ) : (
              <ArrowLeft className={cn(
                "h-5 w-5",
                traversalDirection === "reverse" ? "text-indigo-600 animate-slide-left" : "text-blue-600 animate-slide-right"
              )} />
            )}
            <span className={cn(
              "text-xs font-medium",
              traversalDirection === "forward" ? "text-blue-600" : "text-indigo-600"
            )}>
              {traversalDirection === "forward" ? "Forward Traversal" : "Reverse Traversal"}
            </span>
          </div>
        </div>
      )}
      
      <ListInfoPanel type={type} list={list} />
    </div>
  );
};
