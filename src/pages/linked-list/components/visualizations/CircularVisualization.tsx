
import React from "react";
import { LinkedListNode, LinkedListType } from "../../types/LinkedListTypes";
import { CircularGuide } from "./circular/CircularGuide";
import { CircularConnections } from "./circular/CircularConnections";
import { CircularNodes } from "./circular/CircularNodes";
import { CircularCurvedArrows } from "./circular/CircularCurvedArrows";

interface CircularVisualizationProps {
  list: LinkedListNode[];
  currentNode: number | null;
  visitedNodes: number[];
  type: LinkedListType;
  lastVisitedNode: number | null;
  traversalDirection?: "forward" | "reverse";
}

export const CircularVisualization: React.FC<CircularVisualizationProps> = ({
  list,
  currentNode,
  visitedNodes,
  type,
  lastVisitedNode,
  traversalDirection = "forward"
}) => {
  if (list.length === 0) {
    return null;
  }
  
  const isDoubly = type === "doubly" || type === "double-circular";
  
  // Calculate radius based on number of nodes
  const radius = list.length <= 4 ? 120 : list.length <= 8 ? 150 : 180;
  const centerX = radius + 50; // increase padding
  const centerY = radius + 50; // increase padding
  
  return (
    <div 
      className="relative mx-auto mt-8 mb-16" 
      style={{ 
        width: (radius * 2) + 100,  // increase width for better spacing
        height: (radius * 2) + 100  // increase height for better spacing
      }}
    >
      {/* Circle guide and index numbers */}
      <CircularGuide 
        radius={radius} 
        centerX={centerX} 
        centerY={centerY} 
        nodeCount={list.length} 
      />
      
      {/* Connection arrows */}
      <CircularConnections
        list={list}
        radius={radius}
        centerX={centerX}
        centerY={centerY}
        isDoubly={isDoubly}
        currentNode={currentNode}
        lastVisitedNode={lastVisitedNode}
        visitedNodes={visitedNodes}
        traversalDirection={traversalDirection}
      />
      
      {/* Curved arrows for better visual representation */}
      <CircularCurvedArrows
        list={list}
        radius={radius}
        centerX={centerX}
        centerY={centerY}
        isDoubly={isDoubly}
        currentNode={currentNode}
        lastVisitedNode={lastVisitedNode}
        traversalDirection={traversalDirection}
      />
      
      {/* Nodes */}
      <CircularNodes
        list={list}
        radius={radius}
        centerX={centerX}
        centerY={centerY}
        isDoubly={isDoubly}
        currentNode={currentNode}
        visitedNodes={visitedNodes}
      />
    </div>
  );
};
