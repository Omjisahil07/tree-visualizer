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
    "  inorderTraversal(node.left)",
    "  visit(node)",
    "  inorderTraversal(node.right)"
  ],
  preorder: [
    "function preorderTraversal(node):",
    "  if (node === null)",
    "    return",
    "  visit(node)",
    "  preorderTraversal(node.left)",
    "  preorderTraversal(node.right)"
  ],
  postorder: [
    "function postorderTraversal(node):",
    "  if (node === null)",
    "    return",
    "  postorderTraversal(node.left)",
    "  postorderTraversal(node.right)",
    "  visit(node)"
  ],
  levelorder: [
    "function levelOrderTraversal(root):",
    "  if (root === null)",
    "    return",
    "  queue = new Queue()",
    "  queue.enqueue(root)",
    "  while (!queue.isEmpty())",
    "    node = queue.dequeue()",
    "    visit(node)",
    "    if (node.left !== null)",
    "      queue.enqueue(node.left)",
    "    if (node.right !== null)",
    "      queue.enqueue(node.right)"
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