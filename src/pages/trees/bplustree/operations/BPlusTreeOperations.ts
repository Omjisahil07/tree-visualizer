import { BPlusTreeNode } from "../types/BPlusTreeTypes";

export class BPlusTreeOperations {
  private degree: number;

  constructor(degree: number) {
    this.degree = degree;
  }

  insertNode(root: BPlusTreeNode | null, value: number): BPlusTreeNode {
    if (!root) {
      return {
        keys: [value],
        children: [],
        isLeaf: true,
        next: null
      };
    }

    // Simple insert for now - we'll implement splitting later
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
      root.children[index] = this.insertNode(root.children[index], value);
    }
    return root;
  }

  deleteNode(root: BPlusTreeNode | null, value: number): BPlusTreeNode | null {
    if (!root) return null;

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
      root.children[index] = this.deleteNode(root.children[index], value) || root.children[index];
      return root;
    }
  }

  updateNode(root: BPlusTreeNode | null, oldValue: number, newValue: number): BPlusTreeNode | null {
    root = this.deleteNode(root, oldValue);
    return root ? this.insertNode(root, newValue) : null;
  }

  searchNode(root: BPlusTreeNode | null, value: number): boolean {
    if (!root) return false;

    if (root.isLeaf) {
      return root.keys.includes(value);
    }

    let index = root.keys.length;
    for (let i = 0; i < root.keys.length; i++) {
      if (value < root.keys[i]) {
        index = i;
        break;
      }
    }
    return this.searchNode(root.children[index], value);
  }

  async traverseInOrder(node: BPlusTreeNode | null, visit: (value: number, step: string) => Promise<void>) {
    if (!node) return;

    if (node.isLeaf) {
      for (const key of node.keys) {
        await visit(key, "Visiting leaf node");
      }
    } else {
      for (let i = 0; i < node.keys.length; i++) {
        await this.traverseInOrder(node.children[i], visit);
        await visit(node.keys[i], "Visiting internal node");
      }
      await this.traverseInOrder(node.children[node.keys.length], visit);
    }
  }

  async traversePreOrder(
    node: BPlusTreeNode | null,
    visit: (value: number, step: string) => Promise<void>
  ) {
    if (!node) return;

    for (const key of node.keys) {
      await visit(key, "Visiting node");
    }

    for (const child of node.children) {
      await this.traversePreOrder(child, visit);
    }
  }

  async traversePostOrder(
    node: BPlusTreeNode | null,
    visit: (value: number, step: string) => Promise<void>
  ) {
    if (!node) return;

    for (const child of node.children) {
      await this.traversePostOrder(child, visit);
    }

    for (const key of node.keys) {
      await visit(key, "Visiting node");
    }
  }

  async traverseLevelOrder(
    root: BPlusTreeNode | null,
    visit: (value: number, step: string) => Promise<void>
  ) {
    if (!root) return;
    
    const queue: BPlusTreeNode[] = [];
    queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        for (const key of node.keys) {
          await visit(key, "Visiting node");
        }
        for (const child of node.children) {
          if (child) queue.push(child);
        }
      }
    }
  }
}
