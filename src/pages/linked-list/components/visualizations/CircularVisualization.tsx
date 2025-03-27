
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
  const nodeCount = list.length;
  // Adjust radius based on node count to ensure proper spacing
  const radius = nodeCount <= 4 ? 130 : 
                 nodeCount <= 6 ? 160 : 
                 nodeCount <= 8 ? 190 : 220;
  
  // Add more padding for larger lists
  const padding = nodeCount <= 4 ? 60 : 
                 nodeCount <= 6 ? 70 : 
                 nodeCount <= 8 ? 80 : 90;
  
  const centerX = radius + padding; 
  const centerY = radius + padding;
  
  const containerWidth = (radius * 2) + (padding * 2);
  const containerHeight = (radius * 2) + (padding * 2);
  
  return (
    <div 
      className="relative mx-auto mt-8 mb-4" 
      style={{ 
        width: containerWidth,
        height: containerHeight
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
