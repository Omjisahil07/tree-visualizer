export interface AVLNode {
  value: number | null;
  children: AVLNode[];
  height?: number;
  balanceFactor?: number;
}

export type TraversalType = "inorder" | "preorder" | "postorder" | "levelorder";
export type TraversalCallback = (value: number | null, step: string) => Promise<void>;