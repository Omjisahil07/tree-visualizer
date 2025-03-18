
export interface LinkedListNode {
  value: number;
  next: number | null;
  prev?: number | null;
}

export enum LinkedListOperations {
  INSERT_AT_BEGINNING = "insertAtBeginning",
  INSERT_AT_END = "insertAtEnd",
  INSERT_AT_POSITION = "insertAtPosition",
  DELETE_FROM_BEGINNING = "deleteFromBeginning",
  DELETE_FROM_END = "deleteFromEnd",
  DELETE_FROM_POSITION = "deleteFromPosition",
  UPDATE = "update"
}

export type LinkedListType = "singly" | "doubly" | "circular" | "double-circular";

export type TraversalCallback = (node: LinkedListNode, index: number) => Promise<void>;
