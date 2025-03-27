
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { calculateNodePosition, calculateCurveControlPoints } from "./circularUtils";

interface CircularCurvedArrowsProps {
  list: LinkedListNode[];
  radius: number;
  centerX: number;
  centerY: number;
  isDoubly: boolean;
  currentNode: number | null;
  lastVisitedNode: number | null;
  traversalDirection: "forward" | "reverse";
}

export const CircularCurvedArrows: React.FC<CircularCurvedArrowsProps> = ({
  list,
  radius,
  centerX,
  centerY,
  isDoubly,
  currentNode,
  lastVisitedNode,
  traversalDirection
}) => {
  if (list.length < 2) return null;
  
  const getArrowPath = (startIndex: number, endIndex: number, isReverse: boolean = false) => {
    const nodeRadius = 32; // Node radius to prevent overlap
    
    const { x: x1, y: y1, angle: angle1 } = calculateNodePosition(
      startIndex, 
      list.length, 
      radius, 
      centerX, 
      centerY
    );
    
    const { x: x2, y: y2, angle: angle2 } = calculateNodePosition(
      endIndex, 
      list.length, 
      radius, 
      centerX, 
      centerY
    );
    
    // Calculate control points for curved path with adjusted curvature
    const { cx, cy } = calculateCurveControlPoints(
      angle1, 
      angle2, 
      radius, 
      centerX, 
      centerY, 
      isReverse
    );
    
    // Calculate start and end points slightly outside the node to prevent overlap
    const startAngle = Math.atan2(cy - y1, cx - x1);
    const endAngle = Math.atan2(y2 - cy, x2 - cx);
    
    const startX = x1 + (nodeRadius * 0.8) * Math.cos(startAngle);
    const startY = y1 + (nodeRadius * 0.8) * Math.sin(startAngle);
    
    const endX = x2 - (nodeRadius * 0.8) * Math.cos(endAngle);
    const endY = y2 - (nodeRadius * 0.8) * Math.sin(endAngle);
    
    return `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
  };
  
  // Calculate if the connection between lastVisitedNode and currentNode is active
  const isActiveConnection = (fromIdx: number, toIdx: number, isReverse: boolean = false) => {
    if (lastVisitedNode === null || currentNode === null) return false;
    
    if (!isReverse && traversalDirection === "forward") {
      return lastVisitedNode === fromIdx && currentNode === toIdx;
    } else if (isReverse && traversalDirection === "reverse") {
      return lastVisitedNode === fromIdx && currentNode === toIdx;
    }
    
    return false;
  };
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      <defs>
        {/* Forward arrow marker */}
        <marker
          id="forwardArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
        
        {/* Active forward arrow marker */}
        <marker
          id="activeForwardArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
        </marker>
        
        {/* Reverse arrow marker for doubly linked lists */}
        {isDoubly && (
          <>
            <marker
              id="reverseArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
            
            <marker
              id="activeReverseArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
            </marker>
          </>
        )}
      </defs>

      {/* Forward connections (next pointers) */}
      {list.map((node, index) => {
        // Calculate the next node index
        const nextIndex = node.next !== null ? node.next : 0;
        
        // Skip null next pointers
        if (node.next === null && !isDoubly) return null;
        
        const active = isActiveConnection(index, nextIndex);
        
        return (
          <path
            key={`next-${index}-${nextIndex}`}
            d={getArrowPath(index, nextIndex)}
            fill="none"
            stroke={active ? "#0ea5e9" : "#64748b"}
            strokeWidth={active ? "2.5" : "2"}
            markerEnd={active ? "url(#activeForwardArrow)" : "url(#forwardArrow)"}
            className={active ? "animate-pulse" : ""}
          />
        );
      })}
      
      {/* Reverse connections for doubly linked lists (prev pointers) */}
      {isDoubly && list.map((node, index) => {
        if (node.prev === null) return null;
        
        const prevIndex = node.prev;
        const active = isActiveConnection(index, prevIndex, true);
        
        return (
          <path
            key={`prev-${index}-${prevIndex}`}
            d={getArrowPath(index, prevIndex, true)}
            fill="none"
            stroke={active ? "#0ea5e9" : "#94a3b8"}
            strokeWidth={active ? "2.5" : "1.5"}
            strokeDasharray={active ? "0" : "4"}
            opacity={active ? "1" : "0.7"}
            markerEnd={active ? "url(#activeReverseArrow)" : "url(#reverseArrow)"}
            className={active ? "animate-pulse" : ""}
          />
        );
      })}
    </svg>
  );
};
