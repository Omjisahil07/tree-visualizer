
export interface BTreeNode {
  keys: number[];
  children: BTreeNode[];
  isLeaf: boolean;
}

export type TraversalType = "inorder" | "preorder" | "postorder" | "levelorder";
