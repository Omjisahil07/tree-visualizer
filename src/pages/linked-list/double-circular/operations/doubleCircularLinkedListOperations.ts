
import { LinkedListNode, TraversalCallback } from "../../types/LinkedListTypes";

export const insertNode = (
  list: LinkedListNode[],
  value: number,
  position: number
): LinkedListNode[] => {
  // Validate position
  if (position < 0 || position > list.length) {
    position = list.length; // Default to insert at end if position is invalid
  }

  const newNode: LinkedListNode = {
    value,
    next: 0, // In circular list, it points back to the first element
    prev: position > 0 ? position - 1 : list.length > 0 ? list.length : 0
  };

  const newList = [...list];

  if (newList.length === 0) {
    // Insert into empty list
    newNode.next = 0; // Points to itself
    newNode.prev = 0; // Points to itself
    return [newNode];
  }

  if (position === 0) {
    // Insert at beginning
    newNode.next = 1;
    newNode.prev = newList.length - 1; // Head's prev points to tail
    newList.unshift(newNode);
    // Update the prev pointer of the old head
    if (newList.length > 1) {
      newList[1].prev = 0;
    }
    // Update the next pointer of the tail
    newList[newList.length - 1].next = 0;
  } else if (position === newList.length) {
    // Insert at end
    newNode.next = 0; // Points back to head
    newNode.prev = newList.length - 1;
    newList.push(newNode);
    // Update the prev pointer of the head
    newList[0].prev = newList.length - 1;
  } else {
    // Insert at position
    newNode.next = position + 1;
    newNode.prev = position - 1;
    newList.splice(position, 0, newNode);
  }

  // Update next and prev pointers
  for (let i = 0; i < newList.length; i++) {
    if (i < newList.length - 1) {
      newList[i].next = i + 1;
    } else {
      newList[i].next = 0; // Last node points to the first node
    }
    
    if (i > 0) {
      newList[i].prev = i - 1;
    } else {
      newList[i].prev = newList.length - 1; // First node points to the last node
    }
  }

  return newList;
};

export const deleteNode = (
  list: LinkedListNode[],
  position: number
): LinkedListNode[] => {
  if (list.length === 0 || position < 0 || position >= list.length) {
    return list;
  }

  const newList = [...list];
  newList.splice(position, 1);

  if (newList.length === 0) {
    return newList;
  }

  // Update next and prev pointers
  for (let i = 0; i < newList.length; i++) {
    if (i < newList.length - 1) {
      newList[i].next = i + 1;
    } else {
      newList[i].next = 0; // Last node points to the first node
    }
    
    if (i > 0) {
      newList[i].prev = i - 1;
    } else {
      newList[i].prev = newList.length - 1; // First node points to the last node
    }
  }

  return newList;
};

export const updateNode = (
  list: LinkedListNode[],
  position: number,
  value: number
): LinkedListNode[] => {
  if (list.length === 0 || position < 0 || position >= list.length) {
    return list;
  }

  const newList = [...list];
  newList[position] = { ...newList[position], value };

  return newList;
};

export const generateRandomList = (size: number): LinkedListNode[] => {
  const list: LinkedListNode[] = [];

  for (let i = 0; i < size; i++) {
    list.push({
      value: Math.floor(Math.random() * 100),
      next: i < size - 1 ? i + 1 : 0, // Last node points to the first node
      prev: i > 0 ? i - 1 : size - 1   // First node's prev points to the last node
    });
  }

  return list;
};

export const traverseList = async (
  list: LinkedListNode[],
  callback: TraversalCallback
) => {
  if (list.length === 0) return;

  let currentIndex = 0;
  const visitedIndices = new Set<number>();
  
  while (!visitedIndices.has(currentIndex)) {
    visitedIndices.add(currentIndex);
    const currentNode = list[currentIndex];
    await callback(currentNode, currentIndex);
    currentIndex = currentNode.next!;
  }
};

export const traverseListReverse = async (
  list: LinkedListNode[],
  callback: TraversalCallback
) => {
  if (list.length === 0) return;
  
  let currentIndex = 0;
  const visitedIndices = new Set<number>();
  
  // Start from the head node but go backwards
  currentIndex = list[0].prev!;
  
  while (!visitedIndices.has(currentIndex)) {
    visitedIndices.add(currentIndex);
    const currentNode = list[currentIndex];
    await callback(currentNode, currentIndex);
    currentIndex = currentNode.prev!;
  }
};
