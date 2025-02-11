
import { BinaryTreeNode, InsertPosition } from "../../types/BinaryTreeTypes";
import { Queue } from "../queue/Queue";

const insertAtSpecificPosition = (
  tree: BinaryTreeNode,
  value: number,
  parentValue: number,
  position: InsertPosition
): BinaryTreeNode => {
  // Create a deep copy of the tree to ensure immutability
  const newTree = JSON.parse(JSON.stringify(tree));

  const findAndInsert = (node: BinaryTreeNode): BinaryTreeNode => {
    if (!node || node.value === null) {
      return node;
    }

    // Found the parent node where we want to insert
    if (node.value === parentValue) {
      // Insert as left child if position is left and the spot is available
      if (position === 'left' && (!node.children[0] || node.children[0].value === null)) {
        node.children[0] = {
          value,
          children: [
            { value: null, children: [] },
            { value: null, children: [] }
          ]
        };
        return { ...node }; // Return new reference for the modified node
      }
      // Insert as right child if position is right and the spot is available
      else if (position === 'right' && (!node.children[1] || node.children[1].value === null)) {
        node.children[1] = {
          value,
          children: [
            { value: null, children: [] },
            { value: null, children: [] }
          ]
        };
        return { ...node }; // Return new reference for the modified node
      }
    }

    // Continue searching in children and create new references
    const updatedChildren = node.children.map(child => findAndInsert({ ...child }));
    return {
      ...node,
      children: updatedChildren
    };
  };

  const updatedTree = findAndInsert(newTree);
  return { ...updatedTree }; // Return a new reference for the entire tree
};

const insertAutomatic = (tree: BinaryTreeNode, value: number): BinaryTreeNode => {
  // Create a deep copy of the tree
  const newTree = JSON.parse(JSON.stringify(tree));
  
  if (newTree.value === null) {
    return {
      value,
      children: [
        { value: null, children: [] },
        { value: null, children: [] }
      ]
    };
  }

  const queue = new Queue<BinaryTreeNode>();
  queue.enqueue(newTree);
  
  while (queue.length > 0) {
    const current = queue.dequeue();
    if (!current) continue;

    if (current.children[0].value === null) {
      current.children[0] = {
        value,
        children: [
          { value: null, children: [] },
          { value: null, children: [] }
        ]
      };
      return { ...newTree }; // Return new reference
    }
    queue.enqueue(current.children[0]);

    if (current.children[1].value === null) {
      current.children[1] = {
        value,
        children: [
          { value: null, children: [] },
          { value: null, children: [] }
        ]
      };
      return { ...newTree }; // Return new reference
    }
    queue.enqueue(current.children[1]);
  }

  return { ...newTree }; // Return new reference
};

export const insertNode = (
  tree: BinaryTreeNode,
  value: number,
  position: InsertPosition = 'auto',
  parentValue?: number
): BinaryTreeNode => {
  // Create a deep copy of the tree to ensure immutability
  const newTree = JSON.parse(JSON.stringify(tree));

  if (newTree.value === null) {
    return {
      value,
      children: [
        { value: null, children: [] },
        { value: null, children: [] }
      ]
    };
  }

  if (position === 'auto') {
    return insertAutomatic(newTree, value);
  }

  if (parentValue !== undefined && (position === 'left' || position === 'right')) {
    const updatedTree = insertAtSpecificPosition(newTree, value, parentValue, position);
    // Return a completely new reference to ensure React detects the change
    return JSON.parse(JSON.stringify(updatedTree));
  }

  return { ...newTree };
};
