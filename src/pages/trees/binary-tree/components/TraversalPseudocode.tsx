
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

const traversalDescriptions = {
  inorder: "Inorder traversal visits the left subtree, then the root, then the right subtree. For a BST, this returns nodes in sorted order.",
  preorder: "Preorder traversal visits the root first, then the left subtree, then the right subtree. Useful for creating a copy of the tree.",
  postorder: "Postorder traversal visits the left subtree, then the right subtree, then the root. Used when deleting nodes or evaluating expressions.",
  levelorder: "Level order traversal visits nodes level by level from top to bottom. Useful for visualizing the tree structure by depth."
};

export const TraversalPseudocode = ({ 
  currentStep,
  currentLine,
  traversalType
}: TraversalPseudocodeProps) => {
  const pseudocode = pseudocodeMap[traversalType as keyof typeof pseudocodeMap] || pseudocodeMap.inorder;
  const description = traversalDescriptions[traversalType as keyof typeof traversalDescriptions] || "";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal Algorithm
      </h3>
      
      <p className="text-sm text-muted-foreground">{description}</p>
      
      <div className="font-mono text-sm bg-purple-50 rounded-lg p-4 border border-purple-100">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`py-1 px-2 rounded ${
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
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg animate-pulse">
          <p className="text-sm text-primary font-medium">{currentStep}</p>
        </div>
      )}

      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-semibold">Node Insert</h4>
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Enter a value" 
            className="px-3 py-2 border border-purple-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent"
          />
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Insert Node
          </button>
        </div>
      </div>
    </div>
  );
};
