
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { calculateNodePosition, getAdjacentIndices } from "./circularUtils";

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
  // Get the currently active connection for highlighting
  const activeConnection = getAdjacentIndices(
    lastVisitedNode, 
    currentNode, 
    visitedNodes, 
    list, 
    traversalDirection, 
    isDoubly
  );
  
  // Draw the circular guide shape based on the list's nature
  const drawCircleGuide = () => {
    const points: string[] = [];
    
    // Create points for the guide circle
    for (let i = 0; i < list.length; i++) {
      const { x, y } = calculateNodePosition(i, list.length, radius, centerX, centerY);
      points.push(`${x},${y}`);
    }
    
    return (
      <>
        {/* Draw a light circle to show the overall structure */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      </>
    );
  };
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
      {/* Draw circle guide */}
      {drawCircleGuide()}
    </svg>
  );
};
