
import { BPlusTreeNode } from "../types/BPlusTreeTypes";

const ORDER = 3; // B+ tree order (max number of children)

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

export const insertNode = (root: BPlusTreeNode | null, value: number): BPlusTreeNode => {
  if (!root) {
    return {
      keys: [value],
      children: [],
      isLeaf: true,
      next: null
    };
  }

  // Simple insert for demo - in a real B+ tree, we'd need to handle splitting and rebalancing
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

export const deleteNode = (root: BPlusTreeNode | null, value: number): BPlusTreeNode | null => {
  if (!root) return null;

  // Simple delete for demo - in a real B+ tree, we'd need to handle merging and rebalancing
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
  root: BPlusTreeNode | null,
  oldValue: number,
  newValue: number
): BPlusTreeNode | null => {
  root = deleteNode(root, oldValue);
  return root ? insertNode(root, newValue) : null;
};

export const traverseInOrder = async (
  node: BPlusTreeNode | null,
  visit: (value: number, step: string) => Promise<void>
) => {
  if (!node) return;

  if (node.isLeaf) {
    for (const key of node.keys) {
      await visit(key, "Visiting leaf node");
    }
  } else {
    for (let i = 0; i < node.keys.length; i++) {
      await traverseInOrder(node.children[i], visit);
      await visit(node.keys[i], "Visiting internal node");
    }
    await traverseInOrder(node.children[node.keys.length], visit);
  }
};

export const traversePreOrder = async (
  node: BPlusTreeNode | null,
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
  node: BPlusTreeNode | null,
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
  root: BPlusTreeNode | null,
  visit: (value: number, step: string) => Promise<void>
) => {
  if (!root) return;
  
  const queue = new Queue<BPlusTreeNode>();
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
