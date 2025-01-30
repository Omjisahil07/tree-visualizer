import { useState } from "react";
import { TreeVisualization } from "./TreeVisualization";
import { Controls } from "./components/Controls";
import { TraversalSteps } from "./components/TraversalSteps";
import { TreeNode } from "./TreeNode";
import { toast } from "sonner";

const BinaryTree = () => {
  const [tree, setTree] = useState<TreeNode>({ value: null, children: [] });
  const [inputValue, setInputValue] = useState("");
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitationSequence, setVisitationSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [isTraversing, setIsTraversing] = useState(false);

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    const newTree = tree.value === null 
      ? { value, children: [] }
      : insertNode(tree, value);
    
    setTree(newTree);
    setInputValue("");
    toast.success(`Node ${value} inserted successfully`);
  };

  const insertNode = (node: TreeNode, value: number): TreeNode => {
    if (node.value === null) return { value, children: [] };
    
    if (node.children.length < 2) {
      return {
        ...node,
        children: [...node.children, { value, children: [] }]
      };
    }
    
    const targetIndex = value < node.value ? 0 : 1;
    return {
      ...node,
      children: node.children.map((child, index) =>
        index === targetIndex ? insertNode(child, value) : child
      )
    };
  };

  const handleTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    if (isTraversing || !tree.value) return;
    
    setIsTraversing(true);
    setVisitationSequence([]);
    
    try {
      await traverseTree(tree, type);
    } finally {
      setIsTraversing(false);
      setCurrentNode(null);
      setCurrentStep("");
    }
  };

  const traverseTree = async (node: TreeNode, type: 'inorder' | 'preorder' | 'postorder') => {
    if (!node.value) {
      setCurrentStep('check');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    if (type === 'preorder') {
      setCurrentNode(node.value);
      setCurrentStep('visit');
      setVisitationSequence(prev => [...prev, node.value]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (node.children[0]) {
      setCurrentStep('left');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await traverseTree(node.children[0], type);
    }

    if (type === 'inorder') {
      setCurrentNode(node.value);
      setCurrentStep('visit');
      setVisitationSequence(prev => [...prev, node.value]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (node.children[1]) {
      setCurrentStep('right');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await traverseTree(node.children[1], type);
    }

    if (type === 'postorder') {
      setCurrentNode(node.value);
      setCurrentStep('visit');
      setVisitationSequence(prev => [...prev, node.value]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TreeVisualization
            tree={tree}
            currentNode={currentNode}
          />
          
          {(isTraversing || visitationSequence.length > 0) && (
            <TraversalSteps
              currentNode={currentNode}
              visitationSequence={visitationSequence}
              currentStep={currentStep}
            />
          )}
        </div>
        
        <Controls
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleInsert={handleInsert}
          handleTraversal={handleTraversal}
          isTraversing={isTraversing}
        />
      </div>
    </div>
  );
};

export default BinaryTree;