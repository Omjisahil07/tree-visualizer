
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
      // Insert as left child
      if (position === 'left') {
        node.children[0] = {
          value,
          children: [
            { value: null, children: [] },
            { value: null, children: [] }
          ]
        };
      }
      // Insert as right child
      else if (position === 'right') {
        node.children[1] = {
          value,
          children: [
            { value: null, children: [] },
            { value: null, children: [] }
          ]
        };
      }
      return node;
    }

    // Continue searching in children
    node.children = node.children.map(child => findAndInsert({ ...child }));
    return node;
  };

  return findAndInsert(newTree);
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
      return newTree;
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
      return newTree;
    }
    queue.enqueue(current.children[1]);
  }

  return newTree;
};

export const insertNode = (
  tree: BinaryTreeNode,
  value: number,
  position: InsertPosition = 'auto',
  parentValue?: number
): BinaryTreeNode => {
  // Create a new tree instance to ensure state updates
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
    return insertAtSpecificPosition(newTree, value, parentValue, position);
  }

  return newTree;
};
