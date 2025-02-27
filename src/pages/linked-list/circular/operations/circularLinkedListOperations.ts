
import { CircularNode } from "../../types/LinkedListTypes";

// Create a new circular linked list node
export const createNode = <T>(value: T): CircularNode<T> => {
  const node: CircularNode<T> = {
    value,
    next: null
  };
  return node;
};

// Insert a node at the beginning of the list
export const insertAtHead = <T>(
  head: CircularNode<T> | null,
  value: T
): CircularNode<T> => {
  const newNode = createNode(value);

  if (!head) {
    newNode.next = newNode; // Point to itself
    return newNode;
  }

  newNode.next = head;
  
  // Find the last node (which points back to head)
  let current = head;
  while (current.next !== head) {
    current = current.next!;
  }
  current.next = newNode;
  
  return newNode;
};

// Insert a node at the end of the list
export const insertAtTail = <T>(
  head: CircularNode<T> | null,
  value: T
): CircularNode<T> => {
  const newNode = createNode(value);

  if (!head) {
    newNode.next = newNode; // Point to itself
    return newNode;
  }

  // Find the last node (which points back to head)
  let current = head;
  while (current.next !== head) {
    current = current.next!;
  }
  
  current.next = newNode;
  newNode.next = head;
  
  return head;
};

// Insert a node at a specific position (0-based index)
export const insertAtPosition = <T>(
  head: CircularNode<T> | null,
  value: T,
  position: number
): CircularNode<T> => {
  if (position < 0) {
    throw new Error("Position must be non-negative");
  }

  if (position === 0 || !head) {
    return insertAtHead(head, value);
  }

  let current = head;
  let index = 0;

  while (current.next !== head && index < position - 1) {
    current = current.next!;
    index++;
  }

  const newNode = createNode(value);
  newNode.next = current.next;
  current.next = newNode;

  return head;
};

// Delete the node at the beginning of the list
export const deleteHead = <T>(
  head: CircularNode<T> | null
): CircularNode<T> | null => {
  if (!head) {
    return null;
  }

  if (head.next === head) {
    // Only one node in the list
    return null;
  }

  // Find the last node (which points back to head)
  let current = head;
  while (current.next !== head) {
    current = current.next!;
  }

  const newHead = head.next;
  current.next = newHead;
  
  return newHead;
};

// Delete the node at the end of the list
export const deleteTail = <T>(
  head: CircularNode<T> | null
): CircularNode<T> | null => {
  if (!head) {
    return null;
  }

  if (head.next === head) {
    // Only one node in the list
    return null;
  }

  let current = head;
  let previous = null;
  
  // Find the node before the last node
  while (current.next !== head) {
    previous = current;
    current = current.next!;
  }

  previous!.next = head;
  return head;
};

// Delete a node at a specific position (0-based index)
export const deleteAtPosition = <T>(
  head: CircularNode<T> | null,
  position: number
): CircularNode<T> | null => {
  if (!head || position < 0) {
    return head;
  }

  if (position === 0) {
    return deleteHead(head);
  }

  let current = head;
  let index = 0;

  while (current.next !== head && index < position - 1) {
    current = current.next!;
    index++;
  }

  if (current.next === head) {
    return head;
  }

  current.next = current.next!.next;
  return head;
};

// Update the value of a node at a specific position
export const updateAtPosition = <T>(
  head: CircularNode<T> | null,
  position: number,
  value: T
): CircularNode<T> | null => {
  if (!head || position < 0) {
    return head;
  }

  let current = head;
  let index = 0;

  do {
    if (index === position) {
      current.value = value;
      return head;
    }
    current = current.next!;
    index++;
  } while (current !== head);

  return head;
};

// Convert a list to an array for visualization
export const toArray = <T>(
  head: CircularNode<T> | null
): T[] => {
  if (!head) {
    return [];
  }

  const result: T[] = [];
  let current = head;

  do {
    result.push(current.value);
    current = current.next!;
  } while (current !== head);

  return result;
};

// Convert an array to a linked list
export const fromArray = <T>(
  arr: T[]
): CircularNode<T> | null => {
  if (arr.length === 0) {
    return null;
  }

  let head = createNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = createNode(arr[i]);
    current = current.next;
  }

  // Make it circular by connecting the last node to the head
  current.next = head;

  return head;
};

// Generate a random linked list
export const generateRandomList = (
  length: number
): CircularNode<number> | null => {
  if (length <= 0) {
    return null;
  }

  const values = Array.from({ length }, () => Math.floor(Math.random() * 100));
  return fromArray(values);
};
