
import React from "react";
import { LinkedListType } from "../../types/LinkedListTypes";

interface ListInfoPanelProps {
  type: LinkedListType;
  list: Array<{ value: number }>;
}

export const ListInfoPanel: React.FC<ListInfoPanelProps> = ({ type, list }) => {
  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="text-sm font-medium mb-2">List Info:</h3>
      <ul className="text-sm text-muted-foreground">
        <li>• Type: {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")} Linked List</li>
        <li>• Length: {list.length} node{list.length !== 1 ? 's' : ''}</li>
        {list.length > 0 && (
          <>
            <li>• Head: Node 0 (value: {list[0].value})</li>
            <li>• Tail: Node {list.length - 1} (value: {list[list.length - 1].value})</li>
          </>
        )}
      </ul>
    </div>
  );
};
