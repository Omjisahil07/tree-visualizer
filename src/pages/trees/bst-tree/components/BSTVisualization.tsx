import React from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BSTNode } from "../types/BSTTypes";

interface BSTVisualizationProps {
  tree: BSTNode;
  onNodeDelete: (value: number) => void;
  onNodeClick: (value: number) => void;
  currentNode: number | null;
  visitedNodes: number[];
}

export const BSTVisualization: React.FC<BSTVisualizationProps> = ({
  tree,
  onNodeDelete,
  onNodeClick,
  currentNode,
  visitedNodes,
}) => {
  const renderNode = (node: BSTNode, x: number, y: number, level: number) => {
    if (!node.value) return null;

    const isHighlighted = currentNode === node.value;
    const isVisited = visitedNodes.includes(node.value);
    const spacing = 80 / (level + 1);

    return (
      <g key={`${x}-${y}`}>
        {node.children.map((child, index) => {
          if (child.value) {
            const childX = x + (index === 0 ? -spacing : spacing);
            const childY = y + 10;
            return (
              <line
                key={`${x}-${y}-${index}`}
                x1={x}
                y1={y}
                x2={childX}
                y2={childY}
                stroke="gray"
                strokeWidth="2"
              />
            );
          }
          return null;
        })}
        
        <circle
          cx={x}
          cy={y}
          r="4"
          fill={isHighlighted ? "yellow" : isVisited ? "green" : "hsl(var(--primary))"}
          className="cursor-pointer"
          onClick={() => onNodeClick(node.value!)}
        />
        
        <text
          x={x}
          y={y - 1}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="3"
          className="cursor-pointer select-none"
          onClick={() => onNodeClick(node.value!)}
        >
          {node.value}
        </text>
        
        <g transform={`translate(${x + 3}, ${y - 3})`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            onClick={(e) => {
              e.stopPropagation();
              onNodeDelete(node.value!);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </g>

        {node.children.map((child, index) =>
          child.value
            ? renderNode(
                child,
                x + (index === 0 ? -spacing : spacing),
                y + 10,
                level + 1
              )
            : null
        )}
      </g>
    );
  };

  return (
    <div className="w-full aspect-video bg-white rounded-lg shadow-lg p-4">
      <svg
        viewBox="0 0 100 60"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {renderNode(tree, 50, 10, 1)}
      </svg>
    </div>
  );
};