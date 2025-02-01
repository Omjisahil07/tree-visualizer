import { BSTNode, TraversalCallback } from "../types/BSTTypes";

class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T) {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  get length(): number {
    return this.items.length;
  }
}

export const insertNode = (root: BSTNode, value: number): BSTNode => {
  if (!root.value) {
    return {
      value,
      children: [{ value: null, children: [] }, { value: null, children: [] }],
    };
  }
  if (value < root.value) {
    root.children[0] = insertNode(
      root.children[0] || { value: null, children: [] },
      value
    );
  } else {
    root.children[1] = insertNode(
      root.children[1] || { value: null, children: [] },
      value
    );
  }
  return root;
};

export const deleteNode = (root: BSTNode, value: number): BSTNode => {
  if (!root.value) return root;
  if (value < root.value) {
    root.children[0] = deleteNode(root.children[0], value);
  } else if (value > root.value) {
    root.children[1] = deleteNode(root.children[1], value);
  } else {
    if (!root.children[0].value) return root.children[1];
    if (!root.children[1].value) return root.children[0];
    let minLargerNode = root.children[1];
    while (minLargerNode.children[0].value) minLargerNode = minLargerNode.children[0];
    root.value = minLargerNode.value;
    root.children[1] = deleteNode(root.children[1], minLargerNode.value);
  }
  return root;
};

export const updateNode = (
  root: BSTNode,
  oldValue: number,
  newValue: number
): BSTNode => {
  root = deleteNode(root, oldValue);
  return insertNode(root, newValue);
};

export const traverseInOrder = async (
  node: BSTNode,
  visit: TraversalCallback
) => {
  if (!node || !node.value) return;
  await traverseInOrder(node.children[0], visit);
  await visit(node.value, "Visiting node");
  await traverseInOrder(node.children[1], visit);
};

export const traversePreOrder = async (
  node: BSTNode,
  visit: TraversalCallback
) => {
  if (!node || !node.value) return;
  await visit(node.value, "Visiting node");
  await traversePreOrder(node.children[0], visit);
  await traversePreOrder(node.children[1], visit);
};

export const traversePostOrder = async (
  node: BSTNode,
  visit: TraversalCallback
) => {
  if (!node || !node.value) return;
  await traversePostOrder(node.children[0], visit);
  await traversePostOrder(node.children[1], visit);
  await visit(node.value, "Visiting node");
};

export const traverseLevelOrder = async (
  root: BSTNode,
  visit: TraversalCallback
) => {
  if (!root || !root.value) return;
  const queue = new Queue<BSTNode>();
  queue.enqueue(root);

  while (queue.length > 0) {
    const node = queue.dequeue();
    if (node) {
      await visit(node.value, "Visiting node");
      if (node.children[0] && node.children[0].value !== null)
        queue.enqueue(node.children[0]);
      if (node.children[1] && node.children[1].value !== null)
        queue.enqueue(node.children[1]);
    }
  }
};