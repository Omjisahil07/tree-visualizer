interface BSTPseudocodeProps {
  currentStep: string;
  currentLine: number;
  traversalType: string;
}

const pseudocodeMap = {
  inorder: [
    "function inorderTraversal(node):",
    "  if (node === null)",
    "    return",
    "  // Traverse left subtree",
    "  inorderTraversal(node.left)",
    "  // Process current node",
    "  visit(node.value)",
    "  // Traverse right subtree", 
    "  inorderTraversal(node.right)",
    "  return // Traversal complete"
  ],
  preorder: [
    "function preorderTraversal(node):",
    "  if (node === null)",
    "    return",
    "  // Process current node",
    "  visit(node.value)",
    "  // Traverse left subtree",
    "  preorderTraversal(node.left)",
    "  // Traverse right subtree",
    "  preorderTraversal(node.right)",
    "  return // Traversal complete"
  ],
  postorder: [
    "function postorderTraversal(node):",
    "  if (node === null)",
    "    return",
    "  // Traverse left subtree",
    "  postorderTraversal(node.left)",
    "  // Traverse right subtree",
    "  postorderTraversal(node.right)",
    "  // Process current node",
    "  visit(node.value)",
    "  return // Traversal complete"
  ],
  levelorder: [
    "function levelOrderTraversal(root):",
    "  if (root === null)",
    "    return",
    "  queue = new Queue()",
    "  queue.enqueue(root)",
    "  while (!queue.isEmpty())",
    "    node = queue.dequeue()",
    "    visit(node.value)",
    "    if (node.left !== null)",
    "      queue.enqueue(node.left)",
    "    if (node.right !== null)",
    "      queue.enqueue(node.right)",
    "  return // Traversal complete"
  ]
};

export const BSTPseudocode = ({ 
  currentStep,
  currentLine,
  traversalType
}: BSTPseudocodeProps) => {
  const pseudocode = pseudocodeMap[traversalType as keyof typeof pseudocodeMap] || pseudocodeMap.inorder;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal Algorithm
      </h3>
      <div className="font-mono text-sm">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`py-1 px-2 ${
              index === currentLine
                ? "bg-primary text-primary-foreground"
                : "text-foreground"
            }`}
          >
            {line}
          </div>
        ))}
      </div>
      {currentStep && (
        <div className="mt-4 p-2 bg-primary/10 border border-primary rounded">
          <p className="text-sm text-primary">{currentStep}</p>
        </div>
      )}
    </div>
  );
};