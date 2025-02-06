interface AVLPseudocodeProps {
  traversalType: string;      // Type of traversal being performed
  currentStep: string;        // Current step in the traversal
  currentLine: number;        // Current line being executed in the pseudocode
}

// Map of pseudocode for different traversal types
const pseudocodeMap = {
  inorder: {
    code: [
      "InorderTraversal(Node):",
      "  If Node is NOT NULL:",
      "    InorderTraversal(Node.Left)",
      "    Print(Node.Value)",
      "    InorderTraversal(Node.Right)"
    ],
    usage: "✅ Usage: Returns elements in sorted order for an AVL tree."
  },
  preorder: {
    code: [
      "PreorderTraversal(Node):",
      "  If Node is NOT NULL:",
      "    Print(Node.Value)",
      "    PreorderTraversal(Node.Left)",
      "    PreorderTraversal(Node.Right)"
    ],
    usage: "✅ Usage: Used to create a copy of the tree structure."
  },
  postorder: {
    code: [
      "PostorderTraversal(Node):",
      "  If Node is NOT NULL:",
      "    PostorderTraversal(Node.Left)",
      "    PostorderTraversal(Node.Right)",
      "    Print(Node.Value)"
    ],
    usage: "✅ Usage: Used for tree deletion (processes children before parent)."
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
    usage: "✅ Usage: Visits nodes level by level, useful for visualization."
  }
};

// Component to display pseudocode for the current traversal
export const AVLPseudocode = ({ 
  traversalType,
  currentStep,
  currentLine
}: AVLPseudocodeProps) => {
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
                : line === ""
                ? "py-2"
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