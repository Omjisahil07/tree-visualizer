
import { BPlusTreeNode } from '../../types/BPlusTreeTypes';

export const convertToHierarchy = (node: BPlusTreeNode | null, depth = 0): any => {
  if (!node) return null;
  
  const result: any = {
    name: 'node',
    data: node,
    depth,
    children: []
  };
  
  if (!node.isLeaf && node.children.length > 0) {
    result.children = node.children
      .filter(child => child !== null)
      .map(child => convertToHierarchy(child, depth + 1))
      .filter(Boolean);
  }
  
  return result;
};
