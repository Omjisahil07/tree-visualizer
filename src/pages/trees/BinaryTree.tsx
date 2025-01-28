import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TreeNode {
  value: number;
  children: TreeNode[];
}

const BinaryTree = () => {
  const [tree, setTree] = useState<TreeNode>({ value: 10, children: [] });
  const [inputValue, setInputValue] = useState("");
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

    // Draw links
    g.selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("d", d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y));

    // Draw nodes
    const nodes = g
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    nodes
      .append("circle")
      .attr("r", 20)
      .attr("fill", "white")
      .attr("stroke", "black");

    nodes
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.value);

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
              <Button type="submit" className="w-full">
                Insert Node
              </Button>
            </form>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Operations</h3>
            <p className="text-sm text-muted-foreground">
              Currently supporting:
              <ul className="list-disc list-inside mt-2">
                <li>Node insertion</li>
                <li>Tree visualization</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;