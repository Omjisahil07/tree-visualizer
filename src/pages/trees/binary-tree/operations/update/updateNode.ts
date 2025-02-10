
import { BinaryTreeNode } from "../../types/BinaryTreeTypes";

export const updateNode = (
  tree: BinaryTreeNode,
  oldValue: number,
  newValue: number
): BinaryTreeNode => {
  const update = (node: BinaryTreeNode): BinaryTreeNode => {
    if (node.value === oldValue) {
      return { ...node, value: newValue };
    }
    return {
      ...node,
      children: node.children.map(child => update(child))
    };
  };

  return update({ ...tree });
};
