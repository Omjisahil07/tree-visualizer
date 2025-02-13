
import { BTreeNode } from "../types/BTreeTypes";

const ORDER = 3; // B-tree order (max number of children)

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

export const insertNode = (root: BTreeNode | null, value: number): BTreeNode => {
  if (!root) {
    return {
      keys: [value],
      children: [],
      isLeaf: true
    };
  }

  // Simple insert for demo - in a real B-tree, we'd need to handle splitting and rebalancing
  if (root.isLeaf) {
    root.keys.push(value);
    root.keys.sort((a, b) => a - b);
  } else {
    let index = root.keys.length;
    for (let i = 0; i < root.keys.length; i++) {
      if (value < root.keys[i]) {
        index = i;
        break;
      }
    }
    root.children[index] = insertNode(root.children[index], value);
  }
  return root;
};

export const deleteNode = (root: BTreeNode | null, value: number): BTreeNode | null => {
  if (!root) return null;

  // Simple delete for demo - in a real B-tree, we'd need to handle merging and rebalancing
  if (root.isLeaf) {
    root.keys = root.keys.filter(k => k !== value);
    return root.keys.length > 0 ? root : null;
  } else {
    let index = root.keys.length;
    for (let i = 0; i < root.keys.length; i++) {
      if (value < root.keys[i]) {
        index = i;
        break;
      }
    }
    root.children[index] = deleteNode(root.children[index], value) || root.children[index];
    return root;
  }
};

export const updateNode = (
  root: BTreeNode | null,
  oldValue: number,
  newValue: number
): BTreeNode | null => {
  root = deleteNode(root, oldValue);
  return root ? insertNode(root, newValue) : null;
};

export const traverseInOrder = async (
  node: BTreeNode | null,
  visit: (value: number, step: string) => Promise<void>
) => {
  if (!node) return;

  for (let i = 0; i < node.keys.length; i++) {
    if (node.children[i]) {
      await traverseInOrder(node.children[i], visit);
    }
    await visit(node.keys[i], "Visiting node");
  }
  
  if (node.children[node.keys.length]) {
    await traverseInOrder(node.children[node.keys.length], visit);
  }
};

export const traversePreOrder = async (
  node: BTreeNode | null,
  visit: (value: number, step: string) => Promise<void>
) => {
  if (!node) return;

  for (const key of node.keys) {
    await visit(key, "Visiting node");
  }

  for (const child of node.children) {
    await traversePreOrder(child, visit);
  }
};

export const traversePostOrder = async (
  node: BTreeNode | null,
  visit: (value: number, step: string) => Promise<void>
) => {
  if (!node) return;

  for (const child of node.children) {
    await traversePostOrder(child, visit);
  }

  for (const key of node.keys) {
    await visit(key, "Visiting node");
  }
};

export const traverseLevelOrder = async (
  root: BTreeNode | null,
  visit: (value: number, step: string) => Promise<void>
) => {
  if (!root) return;
  
  const queue = new Queue<BTreeNode>();
  queue.enqueue(root);

  while (queue.length > 0) {
    const node = queue.dequeue();
    if (node) {
      for (const key of node.keys) {
        await visit(key, "Visiting node");
      }
      for (const child of node.children) {
        if (child) queue.enqueue(child);
      }
    }
  }
};
