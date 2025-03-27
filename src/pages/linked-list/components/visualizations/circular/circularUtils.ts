
import { LinkedListNode } from "../../../types/LinkedListTypes";

// Calculates node position on a circle
export const calculateNodePosition = (index: number, totalNodes: number, radius: number, centerX: number, centerY: number) => {
  const angle = (index / totalNodes) * 2 * Math.PI;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  
  return { angle, x, y };
};

// Find adjacent nodes in the traversal
export const getAdjacentIndices = (
  lastVisitedNode: number | null, 
  currentNode: number | null, 
  visitedNodes: number[], 
  list: LinkedListNode[], 
  traversalDirection: "forward" | "reverse", 
  isDoubly: boolean
) => {
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

// Calculates the control points for curved paths between nodes
export const calculateCurveControlPoints = (
  fromAngle: number, 
  toAngle: number, 
  radius: number, 
  centerX: number, 
  centerY: number, 
  isInnerCurve: boolean = false
) => {
  // Determine if we're going clockwise or counterclockwise
  const isClockwise = ((toAngle - fromAngle + 2 * Math.PI) % (2 * Math.PI)) < Math.PI;
  
  // Calculate midpoint angle
  let midAngle = (fromAngle + toAngle) / 2;
  
  // Adjust midpoint for better curves when angles are far apart
  if (Math.abs(toAngle - fromAngle) > Math.PI) {
    midAngle += Math.PI;
  }
  
  // Control point distance from center
  let controlDistance;
  
  if (isInnerCurve) {
    // Inner curves (for prev pointers in doubly linked lists)
    controlDistance = radius * 0.5; // Move control point closer to center
  } else {
    // Outer curves (for next pointers)
    controlDistance = radius * 1.5; // Move control point away from center
  }
  
  // Calculate control point position
  const cx = centerX + controlDistance * Math.cos(midAngle);
  const cy = centerY + controlDistance * Math.sin(midAngle);
  
  return { cx, cy };
};
