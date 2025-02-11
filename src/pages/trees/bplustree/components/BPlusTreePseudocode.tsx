
interface BPlusTreePseudocodeProps {
  currentStep: string;
  currentLine: number;
  traversalType: string;
}

const pseudocodeMap = {
  inorder: {
    code: [
      "BPlusTree_Inorder(root):",
      "    node = root",
      "    while node is not a leaf:",
      "        node = node.children[0]",
      "    while node is not NULL:",
      "        for key in node.keys:",
      "            print(key)",
      "        node = node.next"
    ],
    description: "Visits only leaf nodes using linked list structure"
  },
  preorder: {
    code: [
      "BPlusTree_Preorder(root):",
      "    if root is NULL:",
      "        return",
      "    print(root.keys)",
      "    for child in root.children:",
      "        BPlusTree_Preorder(child)"
    ],
    description: "Visits root first, then children recursively"
  },
  postorder: {
    code: [
      "BPlusTree_Postorder(root):",
      "    if root is NULL:",
      "        return",
      "    for child in root.children:",
      "        BPlusTree_Postorder(child)",
      "    print(root.keys)"
    ],
    description: "Visits children first, then root"
  },
  levelorder: {
    code: [
      "BPlusTree_LevelOrder(root):",
      "    if root is NULL:",
      "        return",
      "    queue = empty queue",
      "    enqueue(queue, root)",
      "    while queue is not empty:",
      "        node = dequeue(queue)",
      "        print(node.keys)",
      "        for child in node.children:",
      "            enqueue(queue, child)"
    ],
    description: "Visits nodes level by level using a queue"
  }
};

export const BPlusTreePseudocode = ({
  currentStep,
  currentLine,
  traversalType
}: BPlusTreePseudocodeProps) => {
  const traversalInfo = pseudocodeMap[traversalType as keyof typeof pseudocodeMap];

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
        {traversalInfo.description}
      </div>
      {currentStep && (
        <div className="mt-4 p-2 bg-primary/10 border border-primary rounded">
          <p className="text-sm text-primary">{currentStep}</p>
        </div>
      )}
    </div>
  );
};
