
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { LinkedListNodeComponent } from "../../LinkedListNode";
import { calculateNodePosition } from "./circularUtils";

interface CircularNodesProps {
  list: LinkedListNode[];
  radius: number;
  centerX: number;
  centerY: number;
  isDoubly: boolean;
  currentNode: number | null;
  visitedNodes: number[];
}

export const CircularNodes: React.FC<CircularNodesProps> = ({
  list,
  radius,
  centerX,
  centerY,
  isDoubly,
  currentNode,
  visitedNodes
}) => {
  return (
    <>
      {list.map((node, index) => {
        // Calculate position on the circle
        const { x, y } = calculateNodePosition(index, list.length, radius, centerX, centerY);
        const nodeX = x - 32; // Adjust for node width
        const nodeY = y - 32; // Adjust for node height
        
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: nodeX,
              top: nodeY,
            }}
          >
            <LinkedListNodeComponent
              value={node.value}
              index={index}
              isHighlighted={currentNode === index}
              isVisited={visitedNodes.includes(index)}
              nextAddress={node.next}
              prevAddress={isDoubly ? node.prev : undefined}
            />
          </div>
        );
      })}
    </>
  );
};
