import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeNode } from './TreeNode';

interface TreeVisualizationProps {
  tree: TreeNode;
  currentNode: number | null;
}

export const TreeVisualization = ({ tree, currentNode }: TreeVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const hierarchy = d3.hierarchy(tree);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const treeData = treeLayout(hierarchy);

    // Draw links with orange color
    g.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#ff8c00") // Orange color for links
      .attr("stroke-width", 2)
      .attr("d", d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y));

    // Draw nodes
    const nodes = g.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    // Add circles to nodes with orange fill
    nodes.append("circle")
      .attr("r", 25)
      .attr("fill", (d: any) => {
        if (d.data.value === null) return "white";
        return d.data.value === currentNode ? "#ff8c00" : "white";
      })
      .attr("stroke", "#ff8c00")
      .attr("stroke-width", 2)
      .attr("class", "transition-colors duration-300");

    // Add text to nodes
    nodes.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("class", "text-sm font-medium")
      .text((d: any) => d.data.value);

  }, [tree, currentNode]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[500px] border border-gray-200 rounded-lg bg-white"
    />
  );
};