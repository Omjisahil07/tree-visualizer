
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { ArrowRight, ArrowLeft, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAdjacentIndices } from "./linearUtils";

interface LinearConnectionsProps {
  list: LinkedListNode[];
  currentNode: number | null;
  lastVisitedNode: number | null;
  visitedNodes: number[];
  isDoubly: boolean;
  isCircular: boolean;
  traversalDirection: "forward" | "reverse";
}

export const LinearConnections: React.FC<LinearConnectionsProps> = ({
  list,
  currentNode,
  lastVisitedNode,
  visitedNodes,
  isDoubly,
  isCircular,
  traversalDirection
}) => {
  const activeConnection = getAdjacentIndices(
    lastVisitedNode, 
    currentNode, 
    visitedNodes, 
    list,
    traversalDirection,
    isDoubly
  );
  
  return (
    <>
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
          
          {/* Node will be inserted between connections */}
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
    </>
  );
};
