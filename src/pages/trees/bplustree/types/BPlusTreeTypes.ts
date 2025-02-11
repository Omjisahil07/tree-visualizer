
export interface BPlusTreeNode {
  keys: number[];
  children: BPlusTreeNode[];
  isLeaf: boolean;
  next: BPlusTreeNode | null;
}

export type TraversalType = "inorder" | "preorder" | "postorder" | "levelorder";
