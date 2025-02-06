import { AVLNode } from "../types/AVLTypes";

// Queue implementation for level-order traversal
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

// Get the height of a node (0 for null nodes)
const getHeight = (node: AVLNode): number => {
  if (!node || !node.value) return 0;
  return node.height || 0;
};

// Calculate balance factor of a node (left height - right height)
const getBalanceFactor = (node: AVLNode): number => {
  if (!node || !node.value) return 0;
  return getHeight(node.children[0]) - getHeight(node.children[1]);
};

// Update height and balance factor of a node
const updateHeight = (node: AVLNode): void => {
  if (!node || !node.value) return;
  node.height = Math.max(getHeight(node.children[0]), getHeight(node.children[1])) + 1;
  node.balanceFactor = getBalanceFactor(node);
};

// Right rotation for AVL tree balancing
const rotateRight = (y: AVLNode): AVLNode => {
  const x = y.children[0];
  const T2 = x.children[1];

  x.children[1] = y;
  y.children[0] = T2;

  updateHeight(y);
  updateHeight(x);

  return x;
};

// Left rotation for AVL tree balancing
const rotateLeft = (x: AVLNode): AVLNode => {
  const y = x.children[1];
  const T2 = y.children[0];

  y.children[0] = x;
  x.children[1] = T2;

  updateHeight(x);
  updateHeight(y);

  return y;
};

// Insert a new node while maintaining AVL balance
export const insertNode = (root: AVLNode, value: number): AVLNode => {
  // Base case: empty tree or leaf node
  if (!root.value) {
    return {
      value,
      height: 1,
      balanceFactor: 0,
      children: [
        { value: null, children: [] },
        { value: null, children: [] }
      ],
    };
  }

  // Standard BST insertion
  if (value < root.value) {
    root.children[0] = insertNode(root.children[0], value);
  } else if (value > root.value) {
    root.children[1] = insertNode(root.children[1], value);
  } else {
    return root; // Duplicate values not allowed
  }

  // Update height and get balance factor
  updateHeight(root);
  const balance = getBalanceFactor(root);

  // Handle the four cases of imbalance
  // Left Left Case
  if (balance > 1 && value < (root.children[0].value || 0)) {
    return rotateRight(root);
  }

  // Right Right Case
  if (balance < -1 && value > (root.children[1].value || 0)) {
    return rotateLeft(root);
  }

  // Left Right Case
  if (balance > 1 && value > (root.children[0].value || 0)) {
    root.children[0] = rotateLeft(root.children[0]);
    return rotateRight(root);
  }

  // Right Left Case
  if (balance < -1 && value < (root.children[1].value || 0)) {
    root.children[1] = rotateRight(root.children[1]);
    return rotateLeft(root);
  }

  return root;
};

// Delete a node while maintaining AVL balance
export const deleteNode = (root: AVLNode, value: number): AVLNode => {
  if (!root.value) return root;

  // Standard BST deletion
  if (value < root.value) {
    root.children[0] = deleteNode(root.children[0], value);
  } else if (value > root.value) {
    root.children[1] = deleteNode(root.children[1], value);
  } else {
    // Node with only one child or no child
    if (!root.children[0].value) return root.children[1];
    if (!root.children[1].value) return root.children[0];

    // Node with two children: Get inorder successor
    let temp = root.children[1];
    while (temp.children[0].value) temp = temp.children[0];
    root.value = temp.value;
    root.children[1] = deleteNode(root.children[1], temp.value);
  }

  updateHeight(root);
  const balance = getBalanceFactor(root);

  // Re-balance the tree if needed
  if (balance > 1 && getBalanceFactor(root.children[0]) >= 0) {
    return rotateRight(root);
  }
  if (balance > 1 && getBalanceFactor(root.children[0]) < 0) {
    root.children[0] = rotateLeft(root.children[0]);
    return rotateRight(root);
  }
  if (balance < -1 && getBalanceFactor(root.children[1]) <= 0) {
    return rotateLeft(root);
  }
  if (balance < -1 && getBalanceFactor(root.children[1]) > 0) {
    root.children[1] = rotateRight(root.children[1]);
    return rotateLeft(root);
  }

  return root;
};

// Update a node's value by deleting and reinserting
export const updateNode = (
  root: AVLNode,
  oldValue: number,
  newValue: number
): AVLNode => {
  root = deleteNode(root, oldValue);
  return insertNode(root, newValue);
};

// Inorder traversal implementation
export const traverseInOrder = async (
  node: AVLNode,
  visit: (value: number | null, step: string) => Promise<void>
): Promise<void> => {
  if (!node || !node.value) return;
  await traverseInOrder(node.children[0], visit);
  await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
  await traverseInOrder(node.children[1], visit);
};

// Preorder traversal implementation
export const traversePreOrder = async (
  node: AVLNode,
  visit: (value: number | null, step: string) => Promise<void>
): Promise<void> => {
  if (!node || !node.value) return;
  await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
  await traversePreOrder(node.children[0], visit);
  await traversePreOrder(node.children[1], visit);
};

// Postorder traversal implementation
export const traversePostOrder = async (
  node: AVLNode,
  visit: (value: number | null, step: string) => Promise<void>
): Promise<void> => {
  if (!node || !node.value) return;
  await traversePostOrder(node.children[0], visit);
  await traversePostOrder(node.children[1], visit);
  await visit(node.value, `Visiting node ${node.value} (Balance Factor: ${node.balanceFactor})`);
};

// Level-order (breadth-first) traversal implementation
export const traverseLevelOrder = async (
  root: AVLNode,
  visit: (value: number | null, step: string) => Promise<void>
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