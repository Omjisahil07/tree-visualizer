
import React from "react";
import { LinkedListNode, LinkedListType } from "../../types/LinkedListTypes";
import { LinkedListNodeComponent } from "../LinkedListNode";
import { ArrowRight, ArrowLeft, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinearVisualizationProps {
  list: LinkedListNode[];
  currentNode: number | null;
  visitedNodes: number[];
  type: LinkedListType;
  lastVisitedNode: number | null;
  traversalDirection?: "forward" | "reverse";
}

export const LinearVisualization: React.FC<LinearVisualizationProps> = ({
  list,
  currentNode,
  visitedNodes,
  type,
  lastVisitedNode,
  traversalDirection = "forward"
}) => {
  if (list.length === 0) {
    return null;
  }
  
  const isDoubly = type === "doubly" || type === "double-circular";
  const isCircular = type === "circular" || type === "double-circular";
  
  const getAdjacentIndices = () => {
    if (lastVisitedNode === null || currentNode === null || visitedNodes.length < 2) return [];
    
    // Get active connection based on traversal direction
    if (traversalDirection === "forward") {
      if (list[lastVisitedNode].next === currentNode) {
        return [lastVisitedNode, currentNode];
      }
    } else if (isDoubly && traversalDirection === "reverse") {
      if (list[lastVisitedNode].prev === currentNode) {
        return [lastVisitedNode, currentNode];
      }
    }
    
    return [];
  };
  
  const activeConnection = getAdjacentIndices();
  
  return (
    <div className="flex items-center justify-center flex-wrap">
      {list.map((node, index) => (
        <React.Fragment key={index}>
          {/* Prev pointer for doubly linked lists */}
          {isDoubly && index > 0 && (
            <div className="flex items-center mx-1">
              <ArrowLeft 
                className={cn(
                  "h-4 w-4", 
                  activeConnection.length === 2 && 
                  activeConnection[0] === index && 
                  activeConnection[1] === index - 1 && 
                  traversalDirection === "reverse"
                    ? "text-primary animate-pulse" 
                    : "text-muted-foreground"
                )} 
              />
            </div>
          )}
          
          <LinkedListNodeComponent
            value={node.value}
            index={index}
            isHighlighted={currentNode === index}
            isVisited={visitedNodes.includes(index)}
            nextAddress={node.next}
            prevAddress={isDoubly ? node.prev : undefined}
          />
          
          {/* Next pointer */}
          {index < list.length - 1 && (
            <div className="flex items-center mx-1">
              <ArrowRight 
                className={cn(
                  "h-4 w-4", 
                  activeConnection.length === 2 && 
                  activeConnection[0] === index && 
                  activeConnection[1] === index + 1 && 
                  traversalDirection === "forward"
                    ? "text-primary animate-pulse" 
                    : "text-muted-foreground"
                )} 
              />
            </div>
          )}
          
          {/* Circular connection from last to first node */}
          {isCircular && index === list.length - 1 && (
            <div className="flex flex-col items-center mx-1">
              <div 
                className={cn(
                  "rounded-full p-1", 
                  activeConnection.length === 2 && 
                  activeConnection[0] === list.length - 1 && 
                  activeConnection[1] === 0
                    ? "bg-blue-100 animate-pulse" 
                    : "bg-gray-100"
                )}
              >
                <RotateCw 
                  className={cn(
                    "h-5 w-5", 
                    activeConnection.length === 2 && 
                    activeConnection[0] === list.length - 1 && 
                    activeConnection[1] === 0
                      ? "text-primary" 
                      : "text-slate-600"
                  )} 
                />
              </div>
              <div className="text-xs text-muted-foreground">to start</div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
