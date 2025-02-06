/**
 * Core node operations for AVL tree
 */

import { AVLNode, OperationResult } from "../../types/AVLTypes";
import { getBalanceFactor, updateHeight, rotateLeft, rotateRight } from "../balance/rotations";

/**
 * Create a new AVL node
 */
export const createNode = (value: number): AVLNode => ({
  value,
  height: 1,
  balanceFactor: 0,
  children: [
    { value: null, children: [] },
    { value: null, children: [] }
  ],
});

/**
 * Insert a new node while maintaining AVL balance
 */
export const insertNode = (root: AVLNode, value: number): AVLNode => {
  // Base case: empty tree or leaf node
  if (!root.value) {
    return createNode(value);
  }

  // Standard BST insertion
  if (value < root.value) {
    root.children[0] = insertNode(root.children[0], value);
  } else if (value > root.value) {
    root.children[1] = insertNode(root.children[1], value);
  } else {
    return root; // Duplicate values not allowed
  }

  // Update height and balance factor
  updateHeight(root);
  const balance = getBalanceFactor(root);

  // Handle imbalance cases
  if (balance > 1 && value < (root.children[0].value || 0)) {
    return rotateRight(root); // Left Left Case
  }
  if (balance < -1 && value > (root.children[1].value || 0)) {
    return rotateLeft(root); // Right Right Case
  }
  if (balance > 1 && value > (root.children[0].value || 0)) {
    root.children[0] = rotateLeft(root.children[0]); // Left Right Case
    return rotateRight(root);
  }
  if (balance < -1 && value < (root.children[1].value || 0)) {
    root.children[1] = rotateRight(root.children[1]); // Right Left Case
    return rotateLeft(root);
  }

  return root;
};

/**
 * Delete a node while maintaining AVL balance
 */
export const deleteNode = (root: AVLNode, value: number): AVLNode => {
  if (!root.value) return root;

  // Standard BST deletion
  if (value < root.value) {
    root.children[0] = deleteNode(root.children[0], value);
  } else if (value > root.value) {
    root.children[1] = deleteNode(root.children[1], value);
  } else {
    // Node with only one child or no child
    if (!root.children[0].value) return root.children[1];
    if (!root.children[1].value) return root.children[0];

    // Node with two children: Get inorder successor
    let temp = root.children[1];
    while (temp.children[0].value) temp = temp.children[0];
    root.value = temp.value;
    root.children[1] = deleteNode(root.children[1], temp.value);
  }

  updateHeight(root);
  const balance = getBalanceFactor(root);

  // Re-balance the tree if needed
  if (balance > 1 && getBalanceFactor(root.children[0]) >= 0) {
    return rotateRight(root);
  }
  if (balance > 1 && getBalanceFactor(root.children[0]) < 0) {
    root.children[0] = rotateLeft(root.children[0]);
    return rotateRight(root);
  }
  if (balance < -1 && getBalanceFactor(root.children[1]) <= 0) {
    return rotateLeft(root);
  }
  if (balance < -1 && getBalanceFactor(root.children[1]) > 0) {
    root.children[1] = rotateRight(root.children[1]);
    return rotateLeft(root);
  }

  return root;
};

/**
 * Update a node's value by deleting and reinserting
 */
export const updateNode = (
  root: AVLNode,
  oldValue: number,
  newValue: number
): AVLNode => {
  root = deleteNode(root, oldValue);
  return insertNode(root, newValue);
};