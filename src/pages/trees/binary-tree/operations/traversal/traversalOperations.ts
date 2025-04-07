import { BinaryTreeNode, TraversalCallback } from "../../types/BinaryTreeTypes";

export const traverseInOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    // Add a small delay for null node checks to keep visualization smooth
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  }
  
  await visit(node.value, "// Traverse left subtree");
  await traverseInOrder(node.children[0], visit);
  await visit(node.value, "// Visit current node");
  await traverseInOrder(node.children[1], visit);
};

export const traversePreOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    // Add a small delay for null node checks to keep visualization smooth
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  }
  
  await visit(node.value, "// Visit current node");
  await traversePreOrder(node.children[0], visit);
  await traversePreOrder(node.children[1], visit);
};

export const traversePostOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    // Add a small delay for null node checks to keep visualization smooth
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  }
  
  await traversePostOrder(node.children[0], visit);
  await traversePostOrder(node.children[1], visit);
  await visit(node.value, "// Visit current node");
};
