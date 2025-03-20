
import { LinkedListNode } from "../../../types/LinkedListTypes";

// Find adjacent nodes in the traversal for linear lists
export const getAdjacentIndices = (
  lastVisitedNode: number | null, 
  currentNode: number | null, 
  visitedNodes: number[], 
  list: LinkedListNode[], 
  traversalDirection: "forward" | "reverse", 
  isDoubly: boolean
) => {
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
