
import { BinaryTreeNode, InsertPosition } from "../../types/BinaryTreeTypes";
import { Queue } from "../queue/Queue";

const insertAtSpecificPosition = (
  tree: BinaryTreeNode,
  value: number,
  parentValue: number,
  position: InsertPosition
): BinaryTreeNode => {
  const findAndInsert = (node: BinaryTreeNode): BinaryTreeNode => {
    if (!node || node.value === null) {
      return node;
    }

    if (node.value === parentValue) {
      const leftChild = node.children[0];
      const rightChild = node.children[1];

      if (position === 'left' && leftChild.value === null) {
        return {
          ...node,
          children: [
            {
              value,
              children: [
                { value: null, children: [] },
                { value: null, children: [] }
              ]
            },
            rightChild
          ]
        };
      } else if (position === 'right' && rightChild.value === null) {
        return {
          ...node,
          children: [
            leftChild,
            {
              value,
              children: [
                { value: null, children: [] },
                { value: null, children: [] }
              ]
            }
          ]
        };
      }
      return node;
    }

    const newChildren = node.children.map(child => findAndInsert({ ...child }));
    return {
      ...node,
      children: newChildren
    };
  };

  return findAndInsert({ ...tree });
};

const insertAutomatic = (tree: BinaryTreeNode, value: number): BinaryTreeNode => {
  const queue = new Queue<BinaryTreeNode>();
  queue.enqueue({ ...tree });
  
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
      return tree;
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
      return tree;
    }
    queue.enqueue(current.children[1]);
  }

  return tree;
};

export const insertNode = (
  tree: BinaryTreeNode,
  value: number,
  position: InsertPosition = 'auto',
  parentValue?: number
): BinaryTreeNode => {
  if (tree.value === null) {
    return {
      value,
      children: [
        { value: null, children: [] },
        { value: null, children: [] }
      ]
    };
  }

  if (parentValue !== undefined) {
    return insertAtSpecificPosition(tree, value, parentValue, position);
  }

  return insertAutomatic(tree, value);
};
