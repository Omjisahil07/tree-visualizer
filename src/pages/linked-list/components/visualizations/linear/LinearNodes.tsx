
import React from "react";
import { LinkedListNode } from "../../../types/LinkedListTypes";
import { LinkedListNodeComponent } from "../../LinkedListNode";

interface LinearNodesProps {
  list: LinkedListNode[];
  currentNode: number | null;
  visitedNodes: number[];
  isDoubly: boolean;
}

export const LinearNodes: React.FC<LinearNodesProps> = ({
  list,
  currentNode,
  visitedNodes,
  isDoubly
}) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-3 my-8">
      {list.map((node, index) => (
        <LinkedListNodeComponent
          key={index}
          value={node.value}
          index={index}
          isHighlighted={currentNode === index}
          isVisited={visitedNodes.includes(index)}
          nextAddress={node.next}
          prevAddress={isDoubly ? node.prev : undefined}
        />
      ))}
    </div>
  );
};
