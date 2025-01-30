import React from 'react';

interface TraversalPseudocodeProps {
  currentStep: string;
  currentLine: number;
}

const pseudocode = [
  "function inorderTraversal(node):",
  "  if (node === null)",
  "    return",
  "  inorderTraversal(node.left)",
  "  visit(node)",
  "  inorderTraversal(node.right)"
];

export const TraversalPseudocode: React.FC<TraversalPseudocodeProps> = ({ 
  currentStep,
  currentLine 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Inorder Traversal Algorithm</h3>
      <div className="font-mono text-sm">
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`py-1 px-2 ${
              index === currentLine
                ? "bg-orange-100 text-orange-800"
                : "text-gray-700"
            }`}
          >
            {line}
          </div>
        ))}
      </div>
      {currentStep && (
        <div className="mt-4 p-2 bg-orange-50 border border-orange-200 rounded">
          <p className="text-orange-800 text-sm">{currentStep}</p>
        </div>
      )}
    </div>
  );
};