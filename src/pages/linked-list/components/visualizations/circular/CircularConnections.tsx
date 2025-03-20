
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { calculateNodePosition, calculateCurveControlPoints, getAdjacentIndices } from "./circularUtils";

interface CircularConnectionsProps {
  list: LinkedListNode[];
  radius: number;
  centerX: number;
  centerY: number;
  isDoubly: boolean;
  currentNode: number | null;
  lastVisitedNode: number | null;
  visitedNodes: number[];
  traversalDirection: "forward" | "reverse";
}

export const CircularConnections: React.FC<CircularConnectionsProps> = ({
  list,
  radius,
  centerX,
  centerY,
  isDoubly,
  currentNode,
  lastVisitedNode,
  visitedNodes,
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
      
      {/* Forward connections */}
      {list.map((node, index) => {
        // Calculate positions
        const { angle } = calculateNodePosition(index, list.length, radius, centerX, centerY);
        const { x, y } = calculateNodePosition(index, list.length, radius, centerX, centerY);
        
        // Calculate next node position
        const nextIdx = node.next !== null ? node.next : 0;
        const { angle: nextAngle } = calculateNodePosition(nextIdx, list.length, radius, centerX, centerY);
        const { x: nextX, y: nextY } = calculateNodePosition(nextIdx, list.length, radius, centerX, centerY);
        
        // Control points for the curve
        const { cx, cy } = calculateCurveControlPoints(angle, nextAngle, radius, centerX, centerY);
        
        // Check if this connection is active
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
      
      {/* Reverse connections for doubly linked lists */}
      {isDoubly && list.map((node, index) => {
        if (node.prev === null) return null;
        
        // Calculate positions
        const { angle } = calculateNodePosition(index, list.length, radius, centerX, centerY);
        const { x, y } = calculateNodePosition(index, list.length, radius, centerX, centerY);
        
        // Calculate prev node position
        const prevIdx = node.prev;
        const { angle: prevAngle } = calculateNodePosition(prevIdx, list.length, radius, centerX, centerY);
        const { x: prevX, y: prevY } = calculateNodePosition(prevIdx, list.length, radius, centerX, centerY);
        
        // Control points for inner curve
        const { cx, cy } = calculateCurveControlPoints(angle, prevAngle, radius, centerX, centerY, true);
        
        // Check if this connection is active
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
    </svg>
  );
};
