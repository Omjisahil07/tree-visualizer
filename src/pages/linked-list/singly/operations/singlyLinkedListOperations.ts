
import { SinglyNode } from "../../types/LinkedListTypes";

// Create a new singly linked list node
export const createNode = <T>(value: T): SinglyNode<T> => {
  return {
    value,
    next: null
  };
};

// Insert a node at the beginning of the list
export const insertAtHead = <T>(
  head: SinglyNode<T> | null,
  value: T
): SinglyNode<T> => {
  const newNode = createNode(value);
  newNode.next = head;
  return newNode;
};

// Insert a node at the end of the list
export const insertAtTail = <T>(
  head: SinglyNode<T> | null,
  value: T
): SinglyNode<T> => {
  const newNode = createNode(value);

  if (!head) {
    return newNode;
  }

  let current = head;
  while (current.next) {
    current = current.next;
  }
  current.next = newNode;
  return head;
};

// Insert a node at a specific position (0-based index)
export const insertAtPosition = <T>(
  head: SinglyNode<T> | null,
  value: T,
  position: number
): SinglyNode<T> => {
  if (position < 0) {
    throw new Error("Position must be non-negative");
  }

  if (position === 0 || !head) {
    return insertAtHead(head, value);
  }

  let current = head;
  let index = 0;

  while (current.next && index < position - 1) {
    current = current.next;
    index++;
  }

  const newNode = createNode(value);
  newNode.next = current.next;
  current.next = newNode;

  return head;
};

// Delete the node at the beginning of the list
export const deleteHead = <T>(
  head: SinglyNode<T> | null
): SinglyNode<T> | null => {
  if (!head) {
    return null;
  }
  return head.next;
};

// Delete the node at the end of the list
export const deleteTail = <T>(
  head: SinglyNode<T> | null
): SinglyNode<T> | null => {
  if (!head) {
    return null;
  }

  if (!head.next) {
    return null;
  }

  let current = head;
  while (current.next && current.next.next) {
    current = current.next;
  }
  current.next = null;
  return head;
};

// Delete a node at a specific position (0-based index)
export const deleteAtPosition = <T>(
  head: SinglyNode<T> | null,
  position: number
): SinglyNode<T> | null => {
  if (!head || position < 0) {
    return head;
  }

  if (position === 0) {
    return deleteHead(head);
  }

  let current = head;
  let index = 0;

  while (current.next && index < position - 1) {
    current = current.next;
    index++;
  }

  if (!current.next) {
    return head;
  }

  current.next = current.next.next;
  return head;
};

// Update the value of a node at a specific position
export const updateAtPosition = <T>(
  head: SinglyNode<T> | null,
  position: number,
  value: T
): SinglyNode<T> | null => {
  if (!head || position < 0) {
    return head;
  }

  let current = head;
  let index = 0;

  while (current && index < position) {
    current = current.next;
    index++;
  }

  if (!current) {
    return head;
  }

  current.value = value;
  return head;
};

// Convert a list to an array for visualization
export const toArray = <T>(
  head: SinglyNode<T> | null
): T[] => {
  const result: T[] = [];
  let current = head;

  while (current) {
    result.push(current.value);
    current = current.next;
  }

  return result;
};

// Convert an array to a linked list
export const fromArray = <T>(
  arr: T[]
): SinglyNode<T> | null => {
  if (arr.length === 0) {
    return null;
  }

  let head = createNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = createNode(arr[i]);
    current = current.next;
  }

  return head;
};

// Generate a random linked list
export const generateRandomList = (
  length: number
): SinglyNode<number> | null => {
  if (length <= 0) {
    return null;
  }

  const values = Array.from({ length }, () => Math.floor(Math.random() * 100));
  return fromArray(values);
};
