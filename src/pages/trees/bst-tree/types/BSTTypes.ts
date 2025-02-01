export interface BSTNode {
  value: number | null;
  children: BSTNode[];
}

export type TraversalType = "inorder" | "preorder" | "postorder" | "levelorder";
export type TraversalCallback = (value: number | null, step: string) => Promise<void>;