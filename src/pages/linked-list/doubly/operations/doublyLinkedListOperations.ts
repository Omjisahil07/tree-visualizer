
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
    next: null,
    prev: null
  };

  const newList = [...list];

  if (newList.length === 0) {
    // Insert into empty list
    return [newNode];
  }

  if (position === 0) {
    // Insert at beginning
    newNode.next = 1;
    newNode.prev = null;
    newList.unshift(newNode);
    if (newList.length > 1) {
      newList[1].prev = 0;
    }
  } else if (position === newList.length) {
    // Insert at end
    newNode.next = null;
    newNode.prev = newList.length - 1;
    newList.push(newNode);
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
      newList[i].next = null;
    }
    
    if (i > 0) {
      newList[i].prev = i - 1;
    } else {
      newList[i].prev = null;
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

  // Update next and prev pointers
  for (let i = 0; i < newList.length; i++) {
    if (i < newList.length - 1) {
      newList[i].next = i + 1;
    } else {
      newList[i].next = null;
    }
    
    if (i > 0) {
      newList[i].prev = i - 1;
    } else {
      newList[i].prev = null;
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
      next: i < size - 1 ? i + 1 : null,
      prev: i > 0 ? i - 1 : null
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
  
  while (currentIndex !== null) {
    const currentNode = list[currentIndex];
    await callback(currentNode, currentIndex);
    
    if (currentNode.next === null) {
      break;
    }
    
    currentIndex = currentNode.next;
  }
};

export const traverseListReverse = async (
  list: LinkedListNode[],
  callback: TraversalCallback
) => {
  if (list.length === 0) return;
  
  let currentIndex = list.length - 1;
  
  while (currentIndex !== null && currentIndex >= 0) {
    const currentNode = list[currentIndex];
    await callback(currentNode, currentIndex);
    
    if (currentNode.prev === null) {
      break;
    }
    
    currentIndex = currentNode.prev;
  }
};
