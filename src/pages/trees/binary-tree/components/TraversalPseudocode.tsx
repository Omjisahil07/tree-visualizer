interface TraversalPseudocodeProps {
  currentStep: string;
  currentLine: number;
  traversalType: string;
}

const pseudocodeMap = {
  inorder: [
    "InorderTraversal(Node):",
    "  If Node is NOT NULL:",
    "    InorderTraversal(Node.Left)",
    "    Print(Node.Value)",
    "    InorderTraversal(Node.Right)"
  ],
  preorder: [
    "PreorderTraversal(Node):",
    "  If Node is NOT NULL:",
    "    Print(Node.Value)",
    "    PreorderTraversal(Node.Left)",
    "    PreorderTraversal(Node.Right)"
  ],
  postorder: [
    "PostorderTraversal(Node):",
    "  If Node is NOT NULL:",
    "    PostorderTraversal(Node.Left)",
    "    PostorderTraversal(Node.Right)",
    "    Print(Node.Value)"
  ],
  levelorder: [
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
  ]
};

export const TraversalPseudocode = ({ 
  currentStep,
  currentLine,
  traversalType
}: TraversalPseudocodeProps) => {
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