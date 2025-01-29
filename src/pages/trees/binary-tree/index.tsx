import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { TreeVisualization } from "./TreeVisualization";
import { TreeNode } from "./TreeNode";
import { insertNode, deleteNode, traverseInOrder, traversePreOrder, traversePostOrder } from "./TreeOperations";

const BinaryTree = () => {
  const [tree, setTree] = useState<TreeNode>({ value: null, children: [] });
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [traversalArray, setTraversalArray] = useState<(number | null)[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");

  const handleInsert = (value: number) => {
    const newValue = parseInt(value.toString());
    if (isNaN(newValue)) return;
    setTree(prevTree => insertNode(prevTree, newValue));
    setInputValue("");
  };

  const handleUpdate = () => {
    if (selectedNode === null) return;
    const newValue = parseInt(updateValue);
    if (isNaN(newValue)) return;
    
    setTree(prevTree => {
      const updateNode = (node: TreeNode): TreeNode => {
        if (node.value === selectedNode) {
          return { ...node, value: newValue };
        }
        return {
          ...node,
          children: node.children.map(child => updateNode(child))
        };
      };
      return updateNode(prevTree);
    });
    
    setUpdateValue("");
    setSelectedNode(null);
  };

  const handleDelete = (value: number) => {
    setTree(prevTree => deleteNode(prevTree, value));
  };

  const handleNodeHighlight = (value: number | null) => {
    setSelectedNode(value);
  };

  const handleTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    if (isTraversing) return;
    
    setIsTraversing(true);
    let result: (number | null)[] = [];
    
    const highlightNode = async (value: number | null, step: string) => {
      handleNodeHighlight(value);
      setCurrentStep(step);
    };

    switch (type) {
      case 'inorder':
        result = await traverseInOrder(tree, highlightNode);
        break;
      case 'preorder':
        result = await traversePreOrder(tree, highlightNode);
        break;
      case 'postorder':
        result = await traversePostOrder(tree, highlightNode);
        break;
    }
    
    setTraversalArray(result);
    setIsTraversing(false);
    handleNodeHighlight(null);
    setCurrentStep("");
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <TreeVisualization
            tree={tree}
            onNodeDelete={handleDelete}
            onNodeHighlight={handleNodeHighlight}
          />
          {currentStep && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Current Step:</h3>
              <pre className="bg-black text-white p-4 rounded-lg">
                {currentStep}
              </pre>
            </div>
          )}
          {traversalArray.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Traversal Result:</h3>
              <div className="flex flex-wrap gap-2">
                {traversalArray.map((value, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Controls</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleInsert(Number(inputValue)); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nodeValue">Node Value</Label>
                <Input
                  id="nodeValue"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Insert Node
              </Button>
            </form>
          </div>

          {selectedNode !== null && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Update Node</h3>
              <div className="space-y-2">
                <Label htmlFor="updateValue">New Value</Label>
                <Input
                  id="updateValue"
                  type="number"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  placeholder="Enter new value"
                />
                <Button onClick={handleUpdate} className="w-full">
                  Update Node
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Traversal Controls</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button 
                onClick={() => handleTraversal('inorder')}
                disabled={isTraversing}
                variant="outline"
              >
                In-order Traversal
              </Button>
              <Button 
                onClick={() => handleTraversal('preorder')}
                disabled={isTraversing}
                variant="outline"
              >
                Pre-order Traversal
              </Button>
              <Button 
                onClick={() => handleTraversal('postorder')}
                disabled={isTraversing}
                variant="outline"
              >
                Post-order Traversal
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Operations</h3>
            <p className="text-sm text-muted-foreground">
              Currently supporting:
              <ul className="list-disc list-inside mt-2">
                <li>Node insertion</li>
                <li>Node deletion (double-click node)</li>
                <li>Node updating (click node)</li>
                <li>Node dragging</li>
                <li>Tree traversal animations</li>
                <li>Traversal array display</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;