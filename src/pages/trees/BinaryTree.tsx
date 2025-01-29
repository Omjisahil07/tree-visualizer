import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

interface TreeNode {
  value: number;
  children: TreeNode[];
  x?: number;
  y?: number;
}

const BinaryTree = () => {
  const [tree, setTree] = useState<TreeNode>({ value: 10, children: [] });
  const [inputValue, setInputValue] = useState("");
  const [traversalArray, setTraversalArray] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const insertNode = (value: number) => {
    const newValue = parseInt(value.toString());
    if (isNaN(newValue)) return;

    const insert = (node: TreeNode, value: number): TreeNode => {
      if (node.children.length === 0) {
        node.children = [{ value, children: [] }];
      } else if (node.children.length === 1) {
        node.children.push({ value, children: [] });
      } else {
        const targetChild = node.children[value < node.value ? 0 : 1];
        insert(targetChild, value);
      }
      return node;
    };

    setTree((prevTree) => ({ ...insert({ ...prevTree }, newValue) }));
    setInputValue("");
  };

  const deleteNode = (value: number) => {
    const remove = (node: TreeNode, value: number): TreeNode | null => {
      if (node.value === value) {
        if (node.children.length === 0) return null;
        if (node.children.length === 1) return node.children[0];
        const successor = findMin(node.children[1]);
        node.value = successor.value;
        node.children[1] = remove(node.children[1], successor.value) || { value: 0, children: [] };
        return node;
      }
      
      if (node.children.length > 0) {
        node.children = node.children
          .map(child => remove(child, value))
          .filter((child): child is TreeNode => child !== null);
      }
      return node;
    };

    const findMin = (node: TreeNode): TreeNode => {
      return node.children[0] ? findMin(node.children[0]) : node;
    };

    setTree((prevTree) => {
      const newTree = remove({ ...prevTree }, value);
      return newTree || { value: 10, children: [] };
    });
  };

  const traverseInOrder = async (node: TreeNode): Promise<number[]> => {
    const result: number[] = [];
    
    const traverse = async (node: TreeNode) => {
      if (!node) return;
      
      if (node.children[0]) await traverse(node.children[0]);
      
      result.push(node.value);
      // Highlight current node
      d3.select(svgRef.current)
        .selectAll(".node")
        .filter((d: any) => d.data.value === node.value)
        .select("circle")
        .transition()
        .duration(500)
        .attr("fill", "#9333ea")
        .transition()
        .duration(500)
        .attr("fill", "white");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (node.children[1]) await traverse(node.children[1]);
    };

    setIsTraversing(true);
    await traverse(node);
    setIsTraversing(false);
    return result;
  };

  const traversePreOrder = async (node: TreeNode): Promise<number[]> => {
    const result: number[] = [];
    
    const traverse = async (node: TreeNode) => {
      if (!node) return;
      
      result.push(node.value);
      // Highlight current node
      d3.select(svgRef.current)
        .selectAll(".node")
        .filter((d: any) => d.data.value === node.value)
        .select("circle")
        .transition()
        .duration(500)
        .attr("fill", "#9333ea")
        .transition()
        .duration(500)
        .attr("fill", "white");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (node.children[0]) await traverse(node.children[0]);
      if (node.children[1]) await traverse(node.children[1]);
    };

    setIsTraversing(true);
    await traverse(node);
    setIsTraversing(false);
    return result;
  };

  const traversePostOrder = async (node: TreeNode): Promise<number[]> => {
    const result: number[] = [];
    
    const traverse = async (node: TreeNode) => {
      if (!node) return;
      
      if (node.children[0]) await traverse(node.children[0]);
      if (node.children[1]) await traverse(node.children[1]);
      
      result.push(node.value);
      // Highlight current node
      d3.select(svgRef.current)
        .selectAll(".node")
        .filter((d: any) => d.data.value === node.value)
        .select("circle")
        .transition()
        .duration(500)
        .attr("fill", "#9333ea")
        .transition()
        .duration(500)
        .attr("fill", "white");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    setIsTraversing(true);
    await traverse(node);
    setIsTraversing(false);
    return result;
  };

  const handleTraversal = async (type: 'inorder' | 'preorder' | 'postorder') => {
    if (isTraversing) return;
    
    let result: number[] = [];
    switch (type) {
      case 'inorder':
        result = await traverseInOrder(tree);
        break;
      case 'preorder':
        result = await traversePreOrder(tree);
        break;
      case 'postorder':
        result = await traversePostOrder(tree);
        break;
    }
    setTraversalArray(result);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const hierarchy = d3.hierarchy(tree);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const treeData = treeLayout(hierarchy);

    // Add drag behavior
    const drag = d3.drag<SVGGElement, any>()
      .on("drag", (event, d: any) => {
        d.x = event.x;
        d.y = event.y;
        d3.select(event.sourceEvent.target.parentNode)
          .attr("transform", `translate(${d.x},${d.y})`);
        
        // Update links
        g.selectAll(".link")
          .attr("d", d3.linkVertical()
            .x((d: any) => d.x)
            .y((d: any) => d.y));
      });

    // Draw links
    g.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#9333ea")
      .attr("stroke-width", 2)
      .attr("d", d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y))
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Draw nodes
    const nodeGroups = g
      .selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Add circles to nodes
    g.selectAll(".node")
      .append("circle")
      .attr("r", 25)
      .attr("fill", "white")
      .attr("stroke", "#9333ea")
      .attr("stroke-width", 2)
      .attr("class", "hover:stroke-primary/80 transition-colors cursor-pointer");

    // Add text to nodes
    g.selectAll(".node")
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("class", "text-sm font-medium")
      .text((d: any) => d.data.value);

    // Add drag behavior to nodes
    g.selectAll(".node").call(drag as any);

    // Add delete functionality on double click
    g.selectAll(".node").on("dblclick", (event, d: any) => {
      event.preventDefault();
      deleteNode(d.data.value);
    });

  }, [tree]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertNode(Number(inputValue));
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <svg
            ref={svgRef}
            className="w-full h-[500px] border border-gray-200 rounded-lg"
          />
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
