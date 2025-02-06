/**
 * Custom hook to manage AVL tree state and operations
 */
import { useState, useCallback } from "react";
import { AVLNode, TraversalType } from "../types/AVLTypes";
import { 
  insertNode, 
  deleteNode, 
  updateNode,
  traverseInOrder,
  traversePreOrder,
  traversePostOrder,
  traverseLevelOrder
} from "../operations/AVLOperations";
import { toast } from "sonner";

export const useAVLTree = () => {
  // Tree state management
  const [tree, setTree] = useState<AVLNode>({
    value: null,
    children: [],
    height: 0,
    balanceFactor: 0
  });

  // Node selection and update state
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  // Traversal state
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState("");

  // Handle node insertion
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

  // Handle node selection for updates
  const handleNodeClick = (value: number) => {
    setSelectedNode(value);
    setUpdateValue(value.toString());
  };

  // Handle node updates
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

  // Handle node deletion
  const handleDelete = (value: number) => {
    setTree(prevTree => deleteNode(prevTree, value));
    if (selectedNode === value) {
      setSelectedNode(null);
      setUpdateValue("");
    }
    toast.success(`Node ${value} deleted successfully`);
  };

  // Handle traversal steps
  const handleTraversalStep = useCallback(async (value: number | null, step: string) => {
    if (isPaused) return;
    setCurrentNode(value);
    setCurrentStep(step);
    setVisitedNodes(prev =>
      value !== null && !prev.includes(value) ? [...prev, value] : prev
    );
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [isPaused]);

  // Start tree traversal
  const startTraversal = async (traversalType: TraversalType) => {
    setIsTraversing(true);
    setIsPaused(false);
    setVisitedNodes([]);
    setCurrentNode(null);
    setCurrentStep("");

    const traversalFunction = {
      inorder: traverseInOrder,
      preorder: traversePreOrder,
      postorder: traversePostOrder,
      levelorder: traverseLevelOrder,
    }[traversalType];

    if (!traversalFunction) return;

    await traversalFunction(tree, handleTraversalStep);
    
    if (!isPaused) {
      setIsTraversing(false);
      setCurrentStep("Traversal complete");
    }
  };

  // Generate random AVL tree
  const generateRandomTree = () => {
    let newTree: AVLNode = { value: null, children: [], height: 0, balanceFactor: 0 };
    const numberOfNodes = Math.floor(Math.random() * 5) + 3;
    const usedValues = new Set<number>();
    
    while (usedValues.size < numberOfNodes) {
      const value = Math.floor(Math.random() * 50) + 1;
      if (!usedValues.has(value)) {
        usedValues.add(value);
        newTree = insertNode(newTree, value);
      }
    }
    
    setTree(newTree);
    toast.success(`Generated a random AVL tree with ${numberOfNodes} nodes`);
  };

  return {
    tree,
    selectedNode,
    inputValue,
    updateValue,
    currentNode,
    visitedNodes,
    isTraversing,
    isPaused,
    currentStep,
    setInputValue,
    setUpdateValue,
    setIsPaused,
    setIsTraversing,
    setVisitedNodes,
    setCurrentNode,
    setCurrentStep,
    handleInsert,
    handleNodeClick,
    handleUpdate,
    handleDelete,
    startTraversal,
    generateRandomTree
  };
};