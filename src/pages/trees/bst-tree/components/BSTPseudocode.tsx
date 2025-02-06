interface BSTPseudocodeProps {
  currentStep: string;
  currentLine: number;
  traversalType: string;
}

const pseudocodeMap = {
  inorder: {
    code: [
      "InorderTraversal(Node):",
      "  If Node is NOT NULL:",
      "    InorderTraversal(Node.Left)",
      "    Print(Node.Value)",
      "    InorderTraversal(Node.Right)"
    ],
    usage: "✅ Usage: Returns elements in sorted order for a BST."
  },
  preorder: {
    code: [
      "PreorderTraversal(Node):",
      "  If Node is NOT NULL:",
      "    Print(Node.Value)",
      "    PreorderTraversal(Node.Left)",
      "    PreorderTraversal(Node.Right)"
    ],
    usage: "✅ Usage: Used to copy BST structures."
  },
  postorder: {
    code: [
      "PostorderTraversal(Node):",
      "  If Node is NOT NULL:",
      "    PostorderTraversal(Node.Left)",
      "    PostorderTraversal(Node.Right)",
      "    Print(Node.Value)"
    ],
    usage: "✅ Usage: Used when deleting nodes (bottom-up approach)."
  },
  levelorder: {
    code: [
      "LevelOrderTraversal(Node):",
      "  If Node is NULL:",
      "    Return",
      "  Queue Q",
      "  Enqueue(Node, Q)",
      "  While Q is NOT Empty:",
      "    Current = Dequeue(Q)",
      "    Print(Current.Value)",
      "    If Current.Left is NOT NULL:",
      "      Enqueue(Current.Left, Q)",
      "    If Current.Right is NOT NULL:",
      "      Enqueue(Current.Right, Q)"
    ],
    usage: "✅ Usage: Used for finding height, shortest path, etc."
  }
};

export const BSTPseudocode = ({ 
  currentStep,
  currentLine,
  traversalType
}: BSTPseudocodeProps) => {
  const traversalInfo = pseudocodeMap[traversalType as keyof typeof pseudocodeMap] || pseudocodeMap.inorder;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal Algorithm
      </h3>
      <div className="font-mono text-sm">
        {traversalInfo.code.map((line, index) => (
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
      <div className="mt-2 text-sm text-muted-foreground">
        {traversalInfo.usage}
      </div>
      {currentStep && (
        <div className="mt-4 p-2 bg-primary/10 border border-primary rounded">
          <p className="text-sm text-primary">{currentStep}</p>
        </div>
      )}
    </div>
  );
};