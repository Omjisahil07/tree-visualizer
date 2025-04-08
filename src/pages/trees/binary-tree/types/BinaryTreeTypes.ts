
export interface BinaryTreeNode {
  value: number | null;
  children: BinaryTreeNode[];
  x?: number;
  y?: number;
}

export type InsertPosition = 'left' | 'right' | 'auto';
export type TraversalType = 'inorder' | 'preorder' | 'postorder';
export type TraversalState = 'current' | 'visited' | 'backtracking' | 'none';
export type TraversalCallback = (value: number | null, step: string, state: TraversalState) => Promise<void>;
