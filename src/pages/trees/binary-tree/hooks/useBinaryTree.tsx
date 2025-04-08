
import { useState, useCallback } from "react";
import { BinaryTreeNode, TraversalState } from "../types/BinaryTreeTypes";
import { insertNode } from "../operations/insert/insertNode";
import { 
  traverseInOrder,
  traversePreOrder,
  traversePostOrder 
} from "../operations/traversal/traversalOperations";

export const useBinaryTree = () => {
  const [tree, setTree] = useState<BinaryTreeNode>({ value: null, children: [] });
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [nodeStates, setNodeStates] = useState<Map<number, TraversalState>>(new Map());
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [traversalType, setTraversalType] = useState("inorder");

  const handleTraversalStep = useCallback(async (value: number | null, step: string, state: TraversalState) => {
    if (value === null) return;
    
    setCurrentNode(value);
    setCurrentStep(step);
    
    // Update node state
    setNodeStates(prev => {
      const newStates = new Map(prev);
      newStates.set(value, state);
      return newStates;
    });
    
    // Add to visited nodes if not already visited
    if (state === 'visited' && !visitedNodes.includes(value)) {
      setVisitedNodes(prev => [...prev, value]);
    }
    
    setCurrentLine(prev => prev + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
  }, [visitedNodes]);

  const startTraversal = async () => {
    setIsTraversing(true);
    setIsPaused(false);
    setVisitedNodes([]);
    setNodeStates(new Map());
    setCurrentNode(null);
    setCurrentLine(0);

    const traversalFunction = {
      inorder: traverseInOrder,
      preorder: traversePreOrder,
      postorder: traversePostOrder
    }[traversalType];

    if (!traversalFunction) return;

    await traversalFunction(tree, handleTraversalStep);
    
    if (!isPaused) {
      setIsTraversing(false);
      setCurrentLine(-1);
      setCurrentStep("Traversal complete");
      // Clear node states after completion
      setTimeout(() => {
        setNodeStates(new Map());
      }, 1000);
    }
  };

  const pauseTraversal = () => {
    setIsPaused(true);
    setIsTraversing(false);
  };

  const resetTraversal = () => {
    setIsTraversing(false);
    setIsPaused(false);
    setVisitedNodes([]);
    setNodeStates(new Map());
    setCurrentNode(null);
    setCurrentLine(-1);
    setCurrentStep("");
  };

  const generateRandomTree = () => {
    let newTree: BinaryTreeNode = { value: null, children: [] };
    const numberOfNodes = Math.floor(Math.random() * 5) + 3; // Generate 3-7 nodes
    
    // Insert root node first
    const rootValue = Math.floor(Math.random() * 50) + 1;
    newTree = insertNode(newTree, rootValue, "auto");
    
    // Insert remaining nodes
    for (let i = 1; i < numberOfNodes; i++) {
      const value = Math.floor(Math.random() * 50) + 1;
      newTree = insertNode(newTree, value, "auto");
    }
    
    setTree(newTree);
    return numberOfNodes;
  };

  const insertNodeInTree = (value: number) => {
    setTree(prevTree => insertNode(prevTree, value, "auto"));
    return value;
  };

  return {
    tree,
    currentNode,
    visitedNodes,
    nodeStates,
    isTraversing,
    currentStep,
    currentLine,
    traversalType,
    setTraversalType,
    handleTraversalStep,
    startTraversal,
    pauseTraversal,
    resetTraversal,
    generateRandomTree,
    insertNodeInTree,
  };
};
