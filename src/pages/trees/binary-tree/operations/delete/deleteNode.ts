
import { BinaryTreeNode } from "../../types/BinaryTreeTypes";

const findMin = (node: BinaryTreeNode): BinaryTreeNode => {
  return node.children[0].value !== null ? findMin(node.children[0]) : node;
};

const remove = (node: BinaryTreeNode, value: number): BinaryTreeNode | null => {
  if (node.value === value) {
    if (node.children.every(child => child.value === null)) {
      return { value: null, children: [] };
    }
    if (node.children[0].value === null) {
      return node.children[1];
    }
    if (node.children[1].value === null) {
      return node.children[0];
    }
    const successor = findMin(node.children[1]);
    node.value = successor.value;
    node.children[1] = remove(node.children[1], successor.value) || { value: null, children: [] };
    return node;
  }
  
  node.children = node.children.map(child => 
    remove(child, value) || { value: null, children: [] }
  );
  return node;
};

export const deleteNode = (tree: BinaryTreeNode, value: number): BinaryTreeNode => {
  const newTree = remove({ ...tree }, value);
  return newTree || { value: null, children: [] };
};
