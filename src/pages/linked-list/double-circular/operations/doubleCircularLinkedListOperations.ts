
import { DoubleCircularNode } from "../../types/LinkedListTypes";

// Create a new double circular linked list node
export const createNode = <T>(value: T): DoubleCircularNode<T> => {
  const node: DoubleCircularNode<T> = {
    value,
    next: null,
    prev: null
  };
  return node;
};

// Insert a node at the beginning of the list
export const insertAtHead = <T>(
  head: DoubleCircularNode<T> | null,
  value: T
): DoubleCircularNode<T> => {
  const newNode = createNode(value);

  if (!head) {
    newNode.next = newNode; // Point to itself
    newNode.prev = newNode;
    return newNode;
  }

  // Find the last node
  const last = head.prev!;
  
  // Connect newNode with head and last
  newNode.next = head;
  newNode.prev = last;
  
  // Update head.prev and last.next
  head.prev = newNode;
  last.next = newNode;
  
  return newNode;
};

// Insert a node at the end of the list
export const insertAtTail = <T>(
  head: DoubleCircularNode<T> | null,
  value: T
): DoubleCircularNode<T> => {
  if (!head) {
    return insertAtHead(null, value);
  }

  const newNode = createNode(value);
  const last = head.prev!;
  
  // Connect newNode with head and last
  newNode.next = head;
  newNode.prev = last;
  
  // Update head.prev and last.next
  head.prev = newNode;
  last.next = newNode;
  
  return head;
};

// Insert a node at a specific position (0-based index)
export const insertAtPosition = <T>(
  head: DoubleCircularNode<T> | null,
  value: T,
  position: number
): DoubleCircularNode<T> => {
  if (position < 0) {
    throw new Error("Position must be non-negative");
  }

  if (position === 0 || !head) {
    return insertAtHead(head, value);
  }

  let current = head;
  let index = 0;

  do {
    if (index === position - 1) {
      const newNode = createNode(value);
      
      newNode.next = current.next;
      newNode.prev = current;
      
      current.next!.prev = newNode;
      current.next = newNode;
      
      return head;
    }
    
    current = current.next!;
    index++;
  } while (current !== head);

  // If we reach here, the position is beyond the size of the list
  // Insert at the end
  return insertAtTail(head, value);
};

// Delete the node at the beginning of the list
export const deleteHead = <T>(
  head: DoubleCircularNode<T> | null
): DoubleCircularNode<T> | null => {
  if (!head) {
    return null;
  }

  if (head.next === head) {
    // Only one node in the list
    return null;
  }

  const last = head.prev!;
  const newHead = head.next!;
  
  // Connect new head with last
  newHead.prev = last;
  last.next = newHead;
  
  return newHead;
};

// Delete the node at the end of the list
export const deleteTail = <T>(
  head: DoubleCircularNode<T> | null
): DoubleCircularNode<T> | null => {
  if (!head) {
    return null;
  }

  if (head.next === head) {
    // Only one node in the list
    return null;
  }

  const last = head.prev!;
  const newLast = last.prev!;
  
  // Connect new last with head
  newLast.next = head;
  head.prev = newLast;
  
  return head;
};

// Delete a node at a specific position (0-based index)
export const deleteAtPosition = <T>(
  head: DoubleCircularNode<T> | null,
  position: number
): DoubleCircularNode<T> | null => {
  if (!head || position < 0) {
    return head;
  }

  if (position === 0) {
    return deleteHead(head);
  }

  let current = head;
  let index = 0;

  do {
    if (index === position) {
      // Remove current node
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
      
      return head;
    }
    
    current = current.next!;
    index++;
  } while (current !== head);

  // If we reach here, the position is beyond the size of the list
  return head;
};

// Update the value of a node at a specific position
export const updateAtPosition = <T>(
  head: DoubleCircularNode<T> | null,
  position: number,
  value: T
): DoubleCircularNode<T> | null => {
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
  head: DoubleCircularNode<T> | null
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
): DoubleCircularNode<T> | null => {
  if (arr.length === 0) {
    return null;
  }

  let head = createNode(arr[0]);
  head.next = head;
  head.prev = head;
  
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    const newNode = createNode(arr[i]);
    
    newNode.prev = current;
    newNode.next = head;
    
    current.next = newNode;
    head.prev = newNode;
    
    current = newNode;
  }

  return head;
};

// Generate a random linked list
export const generateRandomList = (
  length: number
): DoubleCircularNode<number> | null => {
  if (length <= 0) {
    return null;
  }

  const values = Array.from({ length }, () => Math.floor(Math.random() * 100));
  return fromArray(values);
};
