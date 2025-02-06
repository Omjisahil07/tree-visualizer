/**
 * Utility functions for AVL tree rotations and balance operations
 */

import { AVLNode } from "../../types/AVLTypes";

/**
 * Calculate the height of a node (0 for null nodes)
 */
export const getHeight = (node: AVLNode): number => {
  if (!node || !node.value) return 0;
  return node.height || 0;
};

/**
 * Calculate balance factor of a node (left height - right height)
 */
export const getBalanceFactor = (node: AVLNode): number => {
  if (!node || !node.value) return 0;
  return getHeight(node.children[0]) - getHeight(node.children[1]);
};

/**
 * Update height and balance factor of a node
 */
export const updateHeight = (node: AVLNode): void => {
  if (!node || !node.value) return;
  node.height = Math.max(getHeight(node.children[0]), getHeight(node.children[1])) + 1;
  node.balanceFactor = getBalanceFactor(node);
};

/**
 * Perform right rotation for AVL tree balancing
 */
export const rotateRight = (y: AVLNode): AVLNode => {
  const x = y.children[0];
  const T2 = x.children[1];

  x.children[1] = y;
  y.children[0] = T2;

  updateHeight(y);
  updateHeight(x);

  return x;
};

/**
 * Perform left rotation for AVL tree balancing
 */
export const rotateLeft = (x: AVLNode): AVLNode => {
  const y = x.children[1];
  const T2 = y.children[0];

  y.children[0] = x;
  x.children[1] = T2;

  updateHeight(x);
  updateHeight(y);

  return y;
};