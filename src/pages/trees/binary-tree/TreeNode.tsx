
export interface TreeNode {
  value: number | null;
  children: TreeNode[];
  x?: number;
  y?: number;
}

export const createNode = (value: number | null): TreeNode => ({
  value,
  children: [],
});

export const updateNode = (node: TreeNode, oldValue: number, newValue: number): TreeNode => {
  if (node.value === oldValue) {
    return { ...node, value: newValue };
  }
  
  return {
    ...node,
    children: node.children.map(child => updateNode(child, oldValue, newValue))
  };
};
