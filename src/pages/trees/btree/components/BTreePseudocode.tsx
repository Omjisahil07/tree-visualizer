
interface BTreePseudocodeProps {
  currentStep: string;
  currentLine: number;
  traversalType: string;
}

const pseudocodeMap = {
  inorder: {
    code: [
      "BTree_Inorder(root):",
      "    if root is NULL:",
      "        return",
      "    for i from 0 to root.numKeys:",
      "        BTree_Inorder(root.children[i])",
      "        print(root.keys[i])",
      "    BTree_Inorder(root.children[root.numKeys])"
    ],
    description: "Visits internal and leaf nodes in ascending order"
  },
  preorder: {
    code: [
      "BTree_Preorder(root):",
      "    if root is NULL:",
      "        return",
      "    for i from 0 to root.numKeys:",
      "        print(root.keys[i])",
      "        BTree_Preorder(root.children[i])",
      "    BTree_Preorder(root.children[root.numKeys])"
    ],
    description: "Visits root first, then children"
  },
  postorder: {
    code: [
      "BTree_Postorder(root):",
      "    if root is NULL:",
      "        return",
      "    for i from 0 to root.numKeys+1:",
      "        BTree_Postorder(root.children[i])",
      "    for i from 0 to root.numKeys:",
      "        print(root.keys[i])"
    ],
    description: "Visits children first, then root"
  },
  levelorder: {
    code: [
      "BTree_LevelOrder(root):",
      "    if root is NULL:",
      "        return",
      "    queue = empty queue",
      "    enqueue(queue, root)",
      "    while queue is not empty:",
      "        node = dequeue(queue)",
      "        for i from 0 to node.numKeys:",
      "            print(node.keys[i])",
      "        for child in node.children:",
      "            enqueue(queue, child)"
    ],
    description: "Visits nodes level by level using a queue"
  }
};

export const BTreePseudocode = ({
  currentStep,
  currentLine,
  traversalType
}: BTreePseudocodeProps) => {
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
