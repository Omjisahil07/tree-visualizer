/**
 * Implementation of various tree traversal algorithms
 */

import { AVLNode, TraversalCallback } from "../../types/AVLTypes";
import { Queue } from "./Queue";

/**
 * Inorder traversal implementation (Left, Root, Right)
 */
export const traverseInOrder = async (
  node: AVLNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || !node.value) return;
  await traverseInOrder(node.children[0], visit);
  await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
  await traverseInOrder(node.children[1], visit);
};

/**
 * Preorder traversal implementation (Root, Left, Right)
 */
export const traversePreOrder = async (
  node: AVLNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || !node.value) return;
  await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
  await traversePreOrder(node.children[0], visit);
  await traversePreOrder(node.children[1], visit);
};

/**
 * Postorder traversal implementation (Left, Right, Root)
 */
export const traversePostOrder = async (
  node: AVLNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || !node.value) return;
  await traversePostOrder(node.children[0], visit);
  await traversePostOrder(node.children[1], visit);
  await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
};

/**
 * Level-order traversal implementation (Breadth-First Search)
 */
export const traverseLevelOrder = async (
  root: AVLNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!root || !root.value) return;
  const queue = new Queue<AVLNode>();
  queue.enqueue(root);

  while (queue.length > 0) {
    const node = queue.dequeue();
    if (node) {
      await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
      if (node.children[0] && node.children[0].value !== null)
        queue.enqueue(node.children[0]);
      if (node.children[1] && node.children[1].value !== null)
        queue.enqueue(node.children[1]);
    }
  }
};