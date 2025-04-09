
import { BPlusTreeNode } from "../types/BPlusTreeTypes";

export class BPlusTreeOperations {
  private degree: number;
  private maxKeys: number;

  constructor(degree: number) {
    this.degree = degree;
    this.maxKeys = degree - 1;
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

    if (root.isLeaf && root.keys.length >= this.maxKeys) {
      const newRoot: BPlusTreeNode = {
        keys: [],
        children: [root],
        isLeaf: false,
        next: null
      };
      
      this.splitChild(newRoot, 0);
      return this.insertNonFull(newRoot, value);
    }

    return this.insertNonFull(root, value);
  }

  private insertNonFull(node: BPlusTreeNode, value: number): BPlusTreeNode {
    if (node.isLeaf) {
      let insertPos = node.keys.length;
      while (insertPos > 0 && value < node.keys[insertPos - 1]) {
        insertPos--;
      }
      node.keys.splice(insertPos, 0, value);
      return node;
    } else {
      let childIndex = node.keys.length;
      while (childIndex > 0 && value < node.keys[childIndex - 1]) {
        childIndex--;
      }
      if (node.children[childIndex].keys.length >= this.maxKeys) {
        this.splitChild(node, childIndex);
        if (value > node.keys[childIndex]) {
          childIndex++;
        }
      }
      node.children[childIndex] = this.insertNonFull(node.children[childIndex], value);
      return node;
    }
  }

  private splitChild(parent: BPlusTreeNode, childIndex: number): void {
    const child = parent.children[childIndex];
    const middleIndex = Math.floor(child.keys.length / 2);
    
    const newSibling: BPlusTreeNode = {
      keys: child.keys.splice(middleIndex, child.keys.length - middleIndex),
      children: child.isLeaf ? [] : child.children.splice(middleIndex + 1),
      isLeaf: child.isLeaf,
      next: child.next
    };
    
    if (child.isLeaf) {
      child.next = newSibling;
    }
    
    const medianKey = child.isLeaf ? child.keys[middleIndex - 1] : child.keys.pop()!;
    parent.keys.splice(childIndex, 0, medianKey);
    
    parent.children.splice(childIndex + 1, 0, newSibling);
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
        // Increased delay for slower traversal
        await new Promise(resolve => setTimeout(resolve, 1200));
      }
    } else {
      for (let i = 0; i < node.keys.length; i++) {
        await this.traverseInOrder(node.children[i], visit);
        await visit(node.keys[i], "Visiting internal node");
        // Increased delay for slower traversal
        await new Promise(resolve => setTimeout(resolve, 1200));
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
      // Increased delay for slower traversal
      await new Promise(resolve => setTimeout(resolve, 1200));
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
      // Increased delay for slower traversal
      await new Promise(resolve => setTimeout(resolve, 1200));
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
          // Increased delay for slower traversal
          await new Promise(resolve => setTimeout(resolve, 1200));
        }
        for (const child of node.children) {
          if (child) queue.push(child);
        }
      }
    }
  }
}
