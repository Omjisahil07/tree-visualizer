
import { BinaryTreeNode, TraversalCallback } from "../../types/BinaryTreeTypes";

export const traverseInOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    return;
  }
  
  await visit(node.value, "// Traverse left subtree", "visiting");
  await traverseInOrder(node.children[0], visit);
  await visit(node.value, "// Visit current node", "current");
  await traverseInOrder(node.children[1], visit);
  await visit(node.value, "// Backtracking", "backtracking");
};

export const traversePreOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    return;
  }
  
  await visit(node.value, "// Visit current node", "current");
  await visit(node.value, "// Traverse left subtree", "visiting");
  await traversePreOrder(node.children[0], visit);
  await visit(node.value, "// Traverse right subtree", "visiting");
  await traversePreOrder(node.children[1], visit);
  await visit(node.value, "// Backtracking", "backtracking");
};

export const traversePostOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    return;
  }
  
  await visit(node.value, "// Traverse left subtree", "visiting");
  await traversePostOrder(node.children[0], visit);
  await visit(node.value, "// Traverse right subtree", "visiting");
  await traversePostOrder(node.children[1], visit);
  await visit(node.value, "// Visit current node", "current");
  await visit(node.value, "// Backtracking", "backtracking");
};
