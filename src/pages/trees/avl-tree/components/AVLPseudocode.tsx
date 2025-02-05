interface AVLPseudocodeProps {
  traversalType: string;
  currentStep: string;
  currentLine: number;
}

const pseudocodeMap = {
  inorder: [
    "InorderTraversal(Node):",
    "  If Node is NOT NULL:",
    "    InorderTraversal(Node.Left)",
    "    Print(Node.Value)",
    "    InorderTraversal(Node.Right)",
    "",
    "InorderTraversalIterative(Node):",
    "  Stack S",
    "  Current = Node",
    "  While Current is NOT NULL OR Stack is NOT Empty:",
    "    While Current is NOT NULL:",
    "      Push(Current, S)",
    "      Current = Current.Left",
    "    Current = Pop(S)",
    "    Print(Current.Value)",
    "    Current = Current.Right"
  ],
  preorder: [
    "PreorderTraversal(Node):",
    "  If Node is NOT NULL:",
    "    Print(Node.Value)",
    "    PreorderTraversal(Node.Left)",
    "    PreorderTraversal(Node.Right)",
    "",
    "PreorderTraversalIterative(Node):",
    "  If Node is NULL:",
    "    Return",
    "  Stack S",
    "  Push(Node, S)",
    "  While Stack is NOT Empty:",
    "    Current = Pop(S)",
    "    Print(Current.Value)",
    "    If Current.Right is NOT NULL:",
    "      Push(Current.Right, S)",
    "    If Current.Left is NOT NULL:",
    "      Push(Current.Left, S)"
  ],
  postorder: [
    "PostorderTraversal(Node):",
    "  If Node is NOT NULL:",
    "    PostorderTraversal(Node.Left)",
    "    PostorderTraversal(Node.Right)",
    "    Print(Node.Value)",
    "",
    "PostorderTraversalIterative(Node):",
    "  If Node is NULL:",
    "    Return",
    "  Stack S1, S2",
    "  Push(Node, S1)",
    "  While S1 is NOT Empty:",
    "    Current = Pop(S1)",
    "    Push(Current, S2)",
    "    If Current.Left is NOT NULL:",
    "      Push(Current.Left, S1)",
    "    If Current.Right is NOT NULL:",
    "      Push(Current.Right, S1)",
    "  While S2 is NOT Empty:",
    "    Print(Pop(S2).Value)"
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

export const AVLPseudocode = ({ 
  traversalType,
  currentStep,
  currentLine
}: AVLPseudocodeProps) => {
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
                : line === ""
                ? "py-2"
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