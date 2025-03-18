
import React, { useEffect, useState } from "react";
import { LinkedListNode, LinkedListType } from "../types/LinkedListTypes";
import { LinkedListNodeComponent } from "./LinkedListNode";
import { ArrowRight, ArrowLeft, RotateCcw, RotateCw, RefreshCcw, RefreshCw } from "lucide-react";
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
  
  // Track the current traversal path to highlight the correct arrows
  useEffect(() => {
    if (currentNode !== null) {
      setLastVisitedNode(currentNode);
    }
  }, [currentNode]);

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
    
    // Find adjacent nodes in the traversal
    const getAdjacentIndices = () => {
      if (lastVisitedNode === null || currentNode === null || visitedNodes.length < 2) return [];
      
      // Get active connection based on traversal direction and list type
      if (traversalDirection === "forward") {
        // Forward traversal - check for next connections
        if (list[lastVisitedNode].next === currentNode) {
          return [lastVisitedNode, currentNode];
        }
      } else if (isDoubly && traversalDirection === "reverse") {
        // Reverse traversal - check for prev connections (only for doubly linked lists)
        if (list[lastVisitedNode].prev === currentNode) {
          return [lastVisitedNode, currentNode];
        }
      }
      
      return [];
    };
    
    const activeConnection = getAdjacentIndices();
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        <div 
          className="relative mx-auto" 
          style={{ 
            width: (radius * 2) + 40, 
            height: (radius * 2) + 40 
          }}
        >
          {/* Circle guide */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={radius} 
              stroke="#f1f5f9" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Circular connection arrows */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
            <defs>
              <marker
                id="circularArrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
              
              <marker
                id="activeArrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
              </marker>
              
              {isDoubly && (
                <>
                  <marker
                    id="reverseArrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                  
                  <marker
                    id="activeReverseArrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
                  </marker>
                </>
              )}
            </defs>
            
            {/* Draw connecting paths between each node */}
            {list.map((node, index) => {
              // Calculate position on the circle
              const angle = (index / list.length) * 2 * Math.PI;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              
              // Calculate next node position for arrow
              const nextIdx = node.next !== null ? node.next : 0;
              const nextAngle = (nextIdx / list.length) * 2 * Math.PI;
              const nextX = centerX + radius * Math.cos(nextAngle);
              const nextY = centerY + radius * Math.sin(nextAngle);
              
              // Calculate control points for curved path
              const midAngle = (angle + nextAngle) / 2;
              const controlDistance = radius * 0.5; // Adjust this value to control curve
              
              // Calculate direction vector perpendicular to radius
              const dx = -Math.sin(midAngle); 
              const dy = Math.cos(midAngle);
              
              // Control point
              const cx = centerX + (radius + controlDistance) * Math.cos(midAngle) + dx * controlDistance;
              const cy = centerY + (radius + controlDistance) * Math.sin(midAngle) + dy * controlDistance;
              
              // Check if this connection is the active one in the traversal
              const isActiveConnection = activeConnection.length === 2 && 
                                        activeConnection[0] === index && 
                                        activeConnection[1] === nextIdx &&
                                        traversalDirection === "forward";
              
              return (
                <path
                  key={`next-${index}`}
                  d={`M ${x} ${y} Q ${cx} ${cy} ${nextX} ${nextY}`}
                  fill="none"
                  stroke={isActiveConnection ? "#0ea5e9" : currentNode === index ? "#0ea5e9" : "#64748b"}
                  strokeWidth={isActiveConnection ? "4" : currentNode === index ? "3" : "2"}
                  strokeDasharray={isActiveConnection ? "0" : currentNode === index ? "0" : "0"}
                  markerEnd={isActiveConnection ? "url(#activeArrowhead)" : "url(#circularArrowhead)"}
                  className={isActiveConnection ? "animate-pulse" : ""}
                />
              );
            })}
            
            {/* Draw reverse connections for doubly linked lists */}
            {isDoubly && list.map((node, index) => {
              if (node.prev === null) return null;
              
              // Calculate position on the circle
              const angle = (index / list.length) * 2 * Math.PI;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              
              // Calculate prev node position for arrow
              const prevIdx = node.prev;
              const prevAngle = (prevIdx / list.length) * 2 * Math.PI;
              const prevX = centerX + radius * Math.cos(prevAngle);
              const prevY = centerY + radius * Math.sin(prevAngle);
              
              // Calculate control points for curved path (inside the circle)
              const midAngle = (angle + prevAngle) / 2;
              const controlDistance = radius * 0.4; // Smaller control distance for inner curve
              
              // Calculate direction vector perpendicular to radius (opposite direction)
              const dx = Math.sin(midAngle); 
              const dy = -Math.cos(midAngle);
              
              // Control point closer to center
              const cx = centerX + (radius - controlDistance) * Math.cos(midAngle) + dx * controlDistance;
              const cy = centerY + (radius - controlDistance) * Math.sin(midAngle) + dy * controlDistance;
              
              // Check if this connection is the active one in the traversal
              const isActiveConnection = activeConnection.length === 2 && 
                                        activeConnection[0] === index && 
                                        activeConnection[1] === prevIdx &&
                                        traversalDirection === "reverse";
              
              return (
                <path
                  key={`prev-${index}`}
                  d={`M ${x} ${y} Q ${cx} ${cy} ${prevX} ${prevY}`}
                  fill="none"
                  stroke={isActiveConnection ? "#0ea5e9" : "#94a3b8"}
                  strokeWidth={isActiveConnection ? "4" : "1.5"}
                  strokeDasharray={isActiveConnection ? "0" : "4"}
                  opacity={isActiveConnection ? "1" : "0.8"}
                  markerEnd={isActiveConnection ? "url(#activeReverseArrowhead)" : "url(#reverseArrowhead)"}
                  className={isActiveConnection ? "animate-pulse" : ""}
                />
              );
            })}
            
            {/* Add small index numbers outside the circle */}
            {list.map((node, index) => {
              const angle = (index / list.length) * 2 * Math.PI;
              const outerDistance = radius + 40;
              const x = centerX + outerDistance * Math.cos(angle);
              const y = centerY + outerDistance * Math.sin(angle);
              
              return (
                <text
                  key={`index-${index}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#94a3b8"
                >
                  {index}
                </text>
              );
            })}
          </svg>
          
          {/* Nodes */}
          {list.map((node, index) => {
            // Calculate position on the circle
            const angle = (index / list.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 32; // Adjust for node width
            const y = centerY + radius * Math.sin(angle) - 32; // Adjust for node height
            
            return (
              <div
                key={index}
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
            );
          })}
        </div>
        
        {/* Visual indicator for circular connection */}
        {list.length > 0 && (
          <div className="mt-6 flex justify-center gap-2 items-center">
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              {isDoubly ? (
                <RefreshCcw className="h-5 w-5 text-slate-600" />
              ) : (
                <RotateCcw className="h-5 w-5 text-slate-600" />
              )}
              <span className="text-xs font-medium text-slate-600">
                {isDoubly ? "Double Circular Connection" : "Circular Connection"}
              </span>
            </div>
            {traversalDirection && (
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
            )}
          </div>
        )}
        
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
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
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
      
      {/* Add traversal direction indicator */}
      {traversalDirection && (
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
