
import React from "react";
import { LinkedListNode, LinkedListType } from "../types/LinkedListTypes";
import { LinkedListNodeComponent } from "./LinkedListNode";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkedListVisualizationProps {
  list: LinkedListNode[];
  currentNode: number | null;
  visitedNodes: number[];
  type: LinkedListType;
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
  
  // Display circular linked lists in a circle layout
  if (isCircular) {
    const radius = list.length <= 4 ? 120 : list.length <= 8 ? 150 : 180;
    const centerX = radius + 20; // add padding
    const centerY = radius + 20; // add padding
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        <div 
          className="relative mx-auto" 
          style={{ 
            width: (radius * 2) + 40, 
            height: (radius * 2) + 40 
          }}
        >
          {list.map((node, index) => {
            // Calculate position on the circle
            const angle = (index / list.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 32; // Adjust for node width
            const y = centerY + radius * Math.sin(angle) - 32; // Adjust for node height
            
            // Calculate next node position for arrow
            const nextIdx = node.next !== null ? node.next : 0;
            const nextAngle = (nextIdx / list.length) * 2 * Math.PI;
            const nextX = centerX + radius * Math.cos(nextAngle);
            const nextY = centerY + radius * Math.sin(nextAngle);
            
            // Calculate arrow direction angle
            const arrowAngle = Math.atan2(nextY - (y + 32), nextX - (x + 32));
            
            // For doubly circular, calculate prev node position
            let prevX, prevY, prevArrowAngle;
            if (isDoubly && node.prev !== null) {
              const prevIdx = node.prev;
              const prevAngle = (prevIdx / list.length) * 2 * Math.PI;
              prevX = centerX + radius * Math.cos(prevAngle);
              prevY = centerY + radius * Math.sin(prevAngle);
              prevArrowAngle = Math.atan2(prevY - (y + 32), prevX - (x + 32));
            }
            
            return (
              <React.Fragment key={index}>
                {/* Node */}
                <div
                  className="absolute"
                  style={{
                    left: x,
                    top: y,
                  }}
                >
                  <LinkedListNodeComponent
                    value={node.value}
                    index={index}
                    isHighlighted={currentNode === index}
                    isVisited={visitedNodes.includes(index)}
                  />
                </div>
                
                {/* Next pointer arrow */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ zIndex: -1 }}
                >
                  <defs>
                    <marker
                      id={`arrowhead-${index}`}
                      markerWidth="10"
                      markerHeight="7"
                      refX="10"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                  </defs>
                  <line
                    x1={x + 32}
                    y1={y + 32}
                    x2={nextX - (Math.cos(arrowAngle) * 25)}
                    y2={nextY - (Math.sin(arrowAngle) * 25)}
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray={currentNode === index ? "4" : "0"}
                    markerEnd={`url(#arrowhead-${index})`}
                    className={cn(
                      currentNode === index ? "stroke-primary" : "stroke-slate-500"
                    )}
                  />
                </svg>
                
                {/* Prev pointer arrow for doubly linked */}
                {isDoubly && node.prev !== null && (
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ zIndex: -1 }}
                  >
                    <defs>
                      <marker
                        id={`prev-arrowhead-${index}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="10"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                      </marker>
                    </defs>
                    <line
                      x1={x + 32}
                      y1={y + 32}
                      x2={prevX - (Math.cos(prevArrowAngle) * 25)}
                      y2={prevY - (Math.sin(prevArrowAngle) * 25)}
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="3"
                      markerEnd={`url(#prev-arrowhead-${index})`}
                    />
                  </svg>
                )}
              </React.Fragment>
            );
          })}
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
  }
  
  // Linear display for singly and doubly linked lists
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
