
import React from "react";
import { LinkedListNode } from "../types/LinkedListTypes";
import { LinkedListNodeComponent } from "./LinkedListNode";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

interface LinkedListVisualizationProps {
  list: LinkedListNode[];
  currentNode: number | null;
  visitedNodes: number[];
  type: "singly" | "doubly" | "circular" | "double-circular";
}

export const LinkedListVisualization: React.FC<LinkedListVisualizationProps> = ({
  list,
  currentNode,
  visitedNodes,
  type
}) => {
  if (list.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 text-center">
        <p className="text-muted-foreground">Empty list. Add nodes to visualize.</p>
      </div>
    );
  }

  const isDoubly = type === "doubly" || type === "double-circular";
  const isCircular = type === "circular" || type === "double-circular";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-center flex-wrap">
        {list.map((node, index) => (
          <React.Fragment key={index}>
            {/* Prev pointer for doubly linked lists */}
            {isDoubly && index > 0 && (
              <div className="flex items-center mx-1">
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            
            <LinkedListNodeComponent
              value={node.value}
              index={index}
              isHighlighted={currentNode === index}
              isVisited={visitedNodes.includes(index)}
            />
            
            {/* Next pointer */}
            {index < list.length - 1 && (
              <div className="flex items-center mx-1">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            
            {/* Circular connection from last to first node */}
            {isCircular && index === list.length - 1 && (
              <div className="flex flex-col items-center mx-1">
                <RotateCcw className="h-5 w-5 text-muted-foreground transform rotate-180" />
                <div className="text-xs text-muted-foreground">to start</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-8 border-t pt-4">
        <h3 className="text-sm font-medium mb-2">List Info:</h3>
        <ul className="text-sm text-muted-foreground">
          <li>• Type: {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")} Linked List</li>
          <li>• Length: {list.length} node{list.length !== 1 ? 's' : ''}</li>
          {list.length > 0 && (
            <>
              <li>• Head: Node 0 (value: {list[0].value})</li>
              <li>• Tail: Node {list.length - 1} (value: {list[list.length - 1].value})</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
