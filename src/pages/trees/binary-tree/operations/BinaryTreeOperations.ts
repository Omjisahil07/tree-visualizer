import { BinaryTreeNode, InsertPosition } from "../types/BinaryTreeTypes";

class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T) {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  get length(): number {
    return this.items.length;
  }
}

export const insertNode = (
  tree: BinaryTreeNode,
  value: number,
  position: InsertPosition = 'auto',
  parentValue?: number
): BinaryTreeNode => {
  if (tree.value === null) {
    return {
      value,
      children: [
        { value: null, children: [] },
        { value: null, children: [] }
      ]
    };
  }

  if (parentValue !== undefined) {
    const findAndInsert = (node: BinaryTreeNode): BinaryTreeNode => {
      if (!node || node.value === null) return node;

      if (node.value === parentValue) {
        if (position === 'left') {
          if (node.children[0].value === null) {
            node.children[0] = {
              value,
              children: [
                { value: null, children: [] },
                { value: null, children: [] }
              ]
            };
          }
        } else if (position === 'right') {
          if (node.children[1].value === null) {
            node.children[1] = {
              value,
              children: [
                { value: null, children: [] },
                { value: null, children: [] }
              ]
            };
          }
        }
        return node;
      }

      node.children = node.children.map(child => findAndInsert({ ...child }));
      return node;
    };

    return findAndInsert({ ...tree });
  }

  const autoInsert = (node: BinaryTreeNode): BinaryTreeNode => {
    if (node.children[0].value === null) {
      node.children[0] = {
        value,
        children: [
          { value: null, children: [] },
          { value: null, children: [] }
        ]
      };
    } else if (node.children[1].value === null) {
      node.children[1] = {
        value,
        children: [
          { value: null, children: [] },
          { value: null, children: [] }
        ]
      };
    } else {
      node.children[0] = autoInsert(node.children[0]);
    }
    return node;
  };

  return position === 'auto' 
    ? { ...autoInsert({ ...tree }) }
    : { ...tree };
};

export const deleteNode = (tree: BinaryTreeNode, value: number): BinaryTreeNode => {
  const remove = (node: BinaryTreeNode): BinaryTreeNode | null => {
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
      node.children[1] = remove(node.children[1]) || { value: null, children: [] };
      return node;
    }
    
    node.children = node.children.map(child => 
      remove(child) || { value: null, children: [] }
    );
    return node;
  };

  const findMin = (node: BinaryTreeNode): BinaryTreeNode => {
    return node.children[0].value !== null ? findMin(node.children[0]) : node;
  };

  const newTree = remove({ ...tree });
  return newTree || { value: null, children: [] };
};

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

export const traverseInOrder = async (
  node: BinaryTreeNode,
  visit: (value: number | null, step: string) => Promise<void>
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    return;
  }
  
  await visit(node.value, "// Traverse left subtree");
  await traverseInOrder(node.children[0], visit);
  await visit(node.value, "// Visit current node");
  await traverseInOrder(node.children[1], visit);
};

export const traversePreOrder = async (
  node: BinaryTreeNode,
  visit: (value: number | null, step: string) => Promise<void>
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    return;
  }
  
  await visit(node.value, "// Visit current node");
  await traversePreOrder(node.children[0], visit);
  await traversePreOrder(node.children[1], visit);
};

export const traversePostOrder = async (
  node: BinaryTreeNode,
  visit: (value: number | null, step: string) => Promise<void>
): Promise<void> => {
  if (!node || node.value === null) {
    await visit(null, "if (node === null) return;");
    return;
  }
  
  await traversePostOrder(node.children[0], visit);
  await traversePostOrder(node.children[1], visit);
  await visit(node.value, "// Visit current node");
};
