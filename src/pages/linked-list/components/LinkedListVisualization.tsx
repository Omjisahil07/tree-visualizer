
import React, { useEffect, useState } from "react";
import { LinkedListNode, LinkedListType } from "../types/LinkedListTypes";
import { CircularVisualization } from "./visualizations/CircularVisualization";
import { LinearVisualization } from "./visualizations/LinearVisualization";
import { ListInfoPanel } from "./visualizations/ListInfoPanel";
import { TraversalIndicator } from "./visualizations/TraversalIndicator";
import { EmptyListMessage } from "./visualizations/EmptyListMessage";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
  
  // Track the current traversal path to highlight the correct arrows
  useEffect(() => {
    if (currentNode !== null) {
      setLastVisitedNode(currentNode);
    }
  }, [currentNode]);

  if (list.length === 0) {
    return <EmptyListMessage />;
  }

  const isDoubly = type === "doubly" || type === "double-circular";
  const isCircular = type === "circular" || type === "double-circular";
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
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
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
            {traversalDirection === "forward" ? (
              <ArrowRight className="h-5 w-5 text-blue-600" />
            ) : (
              <ArrowLeft className="h-5 w-5 text-blue-600" />
            )}
            <span className="text-xs font-medium text-blue-600">
              {traversalDirection === "forward" ? "Forward Traversal" : "Reverse Traversal"}
            </span>
          </div>
        </div>
      )}
      
      <ListInfoPanel type={type} list={list} />
    </div>
  );
};
