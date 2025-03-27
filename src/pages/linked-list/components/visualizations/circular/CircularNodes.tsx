
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
  // Node size for adjustment
  const nodeSize = 64;
  const halfNodeSize = nodeSize / 2;
  
  return (
    <>
      {list.map((node, index) => {
        // Calculate position on the circle
        const { x, y } = calculateNodePosition(index, list.length, radius, centerX, centerY);
        
        // Center the node on the calculated position
        const nodeX = x - halfNodeSize;
        const nodeY = y - halfNodeSize;
        
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: nodeX,
              top: nodeY,
              width: nodeSize,
              height: nodeSize,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
