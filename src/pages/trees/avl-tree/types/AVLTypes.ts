/**
 * Type definitions for AVL Tree implementation
 */

// Defines the structure of an AVL Tree node
export interface AVLNode {
  value: number | null;      // The value stored in the node (null for empty nodes)
  children: AVLNode[];       // Array of child nodes [left, right]
  height?: number;           // Height of the node for balancing
  balanceFactor?: number;    // Balance factor (left height - right height)
}

// Types of tree traversal algorithms available
export type TraversalType = "inorder" | "preorder" | "postorder" | "levelorder";

// Callback function type for traversal operations
export type TraversalCallback = (value: number | null, step: string) => Promise<void>;

// Interface for tree operation results
export interface OperationResult {
  success: boolean;
  message: string;
}