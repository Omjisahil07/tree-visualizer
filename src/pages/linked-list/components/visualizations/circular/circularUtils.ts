
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
  const midAngle = (fromAngle + toAngle) / 2;
  const controlDistance = radius * (isInnerCurve ? 0.4 : 0.5);
  
  // Calculate direction vector perpendicular to radius
  const dx = isInnerCurve ? Math.sin(midAngle) : -Math.sin(midAngle);
  const dy = isInnerCurve ? -Math.cos(midAngle) : Math.cos(midAngle);
  
  // Control point
  const distanceFromCenter = isInnerCurve ? (radius - controlDistance) : (radius + controlDistance);
  const cx = centerX + distanceFromCenter * Math.cos(midAngle) + dx * controlDistance;
  const cy = centerY + distanceFromCenter * Math.sin(midAngle) + dy * controlDistance;
  
  return { cx, cy };
};
