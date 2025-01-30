import { useState } from "react";
import { TreeVisualization } from "./TreeVisualization";
import { TreeNode } from "./TreeNode";
import { insertNode, deleteNode, updateNode, traverseInOrder, traversePreOrder, traversePostOrder } from "./TreeOperations";
import { toast } from "sonner";
import Controls from "./components/Controls";
import TraversalSteps from "./components/TraversalSteps";

const BinaryTree = () => {
  const [tree, setTree] = useState<TreeNode>({ value: null, children: [] });
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [visitationSequence, setVisitationSequence] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [traversalType, setTraversalType] = useState<string>("");

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    setTree(prevTree => insertNode(prevTree, value));
    setInputValue("");
    toast.success(`Node ${value} inserted successfully`);
  };

  const handleNodeClick = (value: number) => {
    setSelectedNode(value);
    setUpdateValue(value.toString());
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNode === null) {
      toast.error("Please select a node to update");
      return;
    }
    const newValue = parseInt(updateValue);
    if (isNaN(newValue)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setTree(prevTree => updateNode(prevTree, selectedNode, newValue));
    setUpdateValue("");
    setSelectedNode(null);
    toast.success(`Node updated from ${selectedNode} to ${newValue}`);
  };

  const handleTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    if (isTraversing) return;
    
    setIsTraversing(true);
    setTraversalType(type.charAt(0).toUpperCase() + type.slice(1));
    setVisitationSequence([]);
    setCurrentNode(null);
    
    const handleStep = async (value: number | null, step: string) => {
      setCurrentStep(step);
      if (value !== null) {
        setCurrentNode(value);
        setVisitationSequence(prev => [...prev, value]);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    try {
      switch (type) {
        case 'inorder':
          await traverseInOrder(tree, handleStep);
          break;
        case 'preorder':
          await traversePreOrder(tree, handleStep);
          break;
        case 'postorder':
          await traversePostOrder(tree, handleStep);
          break;
      }
    } finally {
      setIsTraversing(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <TreeVisualization
            tree={tree}
            onNodeDelete={value => setTree(prevTree => deleteNode(prevTree, value))}
            onNodeClick={handleNodeClick}
            onNodeHighlight={setSelectedNode}
            currentNode={currentNode}
          />
          <TraversalSteps 
            currentStep={currentStep}
            visitationSequence={visitationSequence}
            currentNode={currentNode}
            traversalType={traversalType}
          />
        </div>
        
        <Controls 
          inputValue={inputValue}
          setInputValue={setInputValue}
          updateValue={updateValue}
          setUpdateValue={setUpdateValue}
          selectedNode={selectedNode}
          handleInsert={handleInsert}
          handleUpdate={handleUpdate}
          handleTraversal={handleTraversal}
          isTraversing={isTraversing}
        />
      </div>
    </div>
  );
};

export default BinaryTree;