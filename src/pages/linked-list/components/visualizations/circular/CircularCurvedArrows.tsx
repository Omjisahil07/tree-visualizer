
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { calculateNodePosition } from "./circularUtils";

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
  
  // Calculate the position for curve control points
  const calculateControlPoints = (fromIdx: number, toIdx: number, isReverse = false) => {
    const { x: x1, y: y1, angle: angle1 } = calculateNodePosition(
      fromIdx, 
      list.length, 
      radius, 
      centerX, 
      centerY
    );
    
    const { x: x2, y: y2, angle: angle2 } = calculateNodePosition(
      toIdx, 
      list.length, 
      radius, 
      centerX, 
      centerY
    );
    
    // Calculate angle between the two points
    let midAngle = (angle1 + angle2) / 2;
    
    // Adjust for when the shortest path crosses the 0/2π boundary
    const angleDiff = Math.abs(angle2 - angle1);
    if (angleDiff > Math.PI) {
      midAngle += Math.PI;
    }
    
    // Control point distance from center
    const controlFactor = isReverse ? 0.5 : 1.5; // Inner curve for reverse, outer for forward
    const controlDistance = radius * controlFactor;
    
    // Calculate control point position
    const cx = centerX + controlDistance * Math.cos(midAngle);
    const cy = centerY + controlDistance * Math.sin(midAngle);
    
    return { 
      path: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
      midX: (x1 + x2) / 2,
      midY: (y1 + y2) / 2,
      controlX: cx,
      controlY: cy
    };
  };
  
  // Determine if a connection is active in the current traversal
  const isActiveConnection = (fromIdx: number, toIdx: number, direction: string) => {
    if (lastVisitedNode === null || currentNode === null) return false;
    
    if (direction === "forward") {
      return lastVisitedNode === fromIdx && currentNode === toIdx && traversalDirection === "forward";
    } else if (direction === "reverse") {
      return lastVisitedNode === fromIdx && currentNode === toIdx && traversalDirection === "reverse";
    }
    
    return false;
  };
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <defs>
        {/* Forward arrow marker */}
        <marker
          id="forwardCurvedArrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
        
        {/* Active forward arrow marker */}
        <marker
          id="activeCurvedForwardArrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
        </marker>
        
        {/* Reverse arrow markers (for doubly linked lists) */}
        {isDoubly && (
          <>
            <marker
              id="reverseCurvedArrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
            
            <marker
              id="activeCurvedReverseArrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
            </marker>
          </>
        )}
      </defs>
      
      {/* Draw next pointers (forward connections) */}
      {list.map((node, index) => {
        if (node.next === null) return null;
        
        const nextIndex = node.next;
        const active = isActiveConnection(index, nextIndex, "forward");
        const { path } = calculateControlPoints(index, nextIndex);
        
        return (
          <path
            key={`forward-${index}-${nextIndex}`}
            d={path}
            fill="none"
            stroke={active ? "#0ea5e9" : "#64748b"}
            strokeWidth={active ? "3" : "2"}
            strokeLinecap="round"
            markerEnd={active ? "url(#activeCurvedForwardArrow)" : "url(#forwardCurvedArrow)"}
            className={active ? "animate-pulse" : ""}
          />
        );
      })}
      
      {/* Draw prev pointers (reverse connections) for doubly linked lists */}
      {isDoubly && list.map((node, index) => {
        if (node.prev === null) return null;
        
        const prevIndex = node.prev;
        const active = isActiveConnection(index, prevIndex, "reverse");
        const { path } = calculateControlPoints(index, prevIndex, true);
        
        return (
          <path
            key={`reverse-${index}-${prevIndex}`}
            d={path}
            fill="none"
            stroke={active ? "#0ea5e9" : "#94a3b8"}
            strokeWidth={active ? "3" : "1.5"}
            strokeDasharray={active ? "0" : "4"}
            strokeLinecap="round"
            opacity={active ? "1" : "0.7"}
            markerEnd={active ? "url(#activeCurvedReverseArrow)" : "url(#reverseCurvedArrow)"}
            className={active ? "animate-pulse" : ""}
          />
        );
      })}
    </svg>
  );
};
