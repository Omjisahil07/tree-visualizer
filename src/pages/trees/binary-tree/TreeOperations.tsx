import { TreeNode } from './TreeNode';

export const insertNode = (tree: TreeNode, value: number): TreeNode => {
  if (tree.value === null) {
    return { ...tree, value };
  }

  const insert = (node: TreeNode, value: number): TreeNode => {
    if (node.children.length === 0) {
      node.children = [{ value, children: [] }];
    } else if (node.children.length === 1) {
      node.children.push({ value, children: [] });
    } else {
      const targetChild = node.children[value < (node.value || 0) ? 0 : 1];
      insert(targetChild, value);
    }
    return node;
  };

  return { ...insert({ ...tree }, value) };
};

export const deleteNode = (tree: TreeNode, value: number): TreeNode => {
  const remove = (node: TreeNode, value: number): TreeNode | null => {
    if (node.value === value) {
      if (node.children.length === 0) return null;
      if (node.children.length === 1) return node.children[0];
      const successor = findMin(node.children[1]);
      node.value = successor.value;
      node.children[1] = remove(node.children[1], successor.value) || { value: null, children: [] };
      return node;
    }
    
    if (node.children.length > 0) {
      node.children = node.children
        .map(child => remove(child, value))
        .filter((child): child is TreeNode => child !== null);
    }
    return node;
  };

  const findMin = (node: TreeNode): TreeNode => {
    return node.children[0] ? findMin(node.children[0]) : node;
  };

  const newTree = remove({ ...tree }, value);
  return newTree || { value: null, children: [] };
};

export const updateNode = (tree: TreeNode, oldValue: number, newValue: number): TreeNode => {
  const update = (node: TreeNode): TreeNode => {
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

export const traverseInOrder = async (
  node: TreeNode, 
  callback: (value: number | null, step: string) => void
): Promise<(number | null)[]> => {
  const result: (number | null)[] = [];
  
  const traverse = async (node: TreeNode) => {
    if (!node || node.value === null) {
      await callback(null, "if (node === null) return;");
      return;
    }
    
    await callback(node.value, "// Traverse left subtree\ntraverseInOrder(node.left);");
    if (node.children[0]) await traverse(node.children[0]);
    
    result.push(node.value);
    await callback(node.value, "// Process current node\nvisit(node.value);");
    
    await callback(node.value, "// Traverse right subtree\ntraverseInOrder(node.right);");
    if (node.children[1]) await traverse(node.children[1]);
  };

  await traverse(node);
  return result;
};

export const traversePreOrder = async (
  node: TreeNode, 
  callback: (value: number | null, step: string) => void
): Promise<(number | null)[]> => {
  const result: (number | null)[] = [];
  
  const traverse = async (node: TreeNode) => {
    if (!node || node.value === null) {
      await callback(null, "if (node === null) return;");
      return;
    }
    
    result.push(node.value);
    await callback(node.value, "// Process current node\nvisit(node.value);");
    
    await callback(node.value, "// Traverse left subtree\ntraversePreOrder(node.left);");
    if (node.children[0]) await traverse(node.children[0]);
    
    await callback(node.value, "// Traverse right subtree\ntraversePreOrder(node.right);");
    if (node.children[1]) await traverse(node.children[1]);
  };

  await traverse(node);
  return result;
};

export const traversePostOrder = async (
  node: TreeNode, 
  callback: (value: number | null, step: string) => void
): Promise<(number | null)[]> => {
  const result: (number | null)[] = [];
  
  const traverse = async (node: TreeNode) => {
    if (!node || node.value === null) {
      await callback(null, "if (node === null) return;");
      return;
    }
    
    await callback(node.value, "// Traverse left subtree\ntraversePostOrder(node.left);");
    if (node.children[0]) await traverse(node.children[0]);
    
    await callback(node.value, "// Traverse right subtree\ntraversePostOrder(node.right);");
    if (node.children[1]) await traverse(node.children[1]);
    
    result.push(node.value);
    await callback(node.value, "// Process current node\nvisit(node.value);");
  };

  await traverse(node);
  return result;
};