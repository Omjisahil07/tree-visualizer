
import { BinaryTreeNode, TraversalCallback, TraversalState } from "../../types/BinaryTreeTypes";

export const traverseInOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;", "none");
    return;
  }
  
  // Going down to left subtree
  await visit(node.value, "// Traverse left subtree", "current");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  await traverseInOrder(node.children[0], visit);
  
  // Visit current node
  await visit(node.value, "// Visit current node", "visited");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  // Going down to right subtree
  await visit(node.value, "// Traverse right subtree", "current");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  await traverseInOrder(node.children[1], visit);
  
  // Backtracking
  await visit(node.value, "// Backtracking from node", "backtracking");
  await new Promise(resolve => setTimeout(resolve, 800)); // Slightly faster for backtracking
};

export const traversePreOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;", "none");
    return;
  }
  
  // Visit current node
  await visit(node.value, "// Visit current node", "visited");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  // Going down to left subtree
  await visit(node.value, "// Traverse left subtree", "current");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  await traversePreOrder(node.children[0], visit);
  
  // Going down to right subtree
  await visit(node.value, "// Traverse right subtree", "current");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  await traversePreOrder(node.children[1], visit);
  
  // Backtracking
  await visit(node.value, "// Backtracking from node", "backtracking");
  await new Promise(resolve => setTimeout(resolve, 800)); // Slightly faster for backtracking
};

export const traversePostOrder = async (
  node: BinaryTreeNode,
  visit: TraversalCallback
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;", "none");
    return;
  }
  
  // Going down to left subtree
  await visit(node.value, "// Traverse left subtree", "current");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  await traversePostOrder(node.children[0], visit);
  
  // Going down to right subtree
  await visit(node.value, "// Traverse right subtree", "current");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  await traversePostOrder(node.children[1], visit);
  
  // Visit current node
  await visit(node.value, "// Visit current node", "visited");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Slow down traversal
  
  // Backtracking
  await visit(node.value, "// Backtracking from node", "backtracking");
  await new Promise(resolve => setTimeout(resolve, 800)); // Slightly faster for backtracking
};
