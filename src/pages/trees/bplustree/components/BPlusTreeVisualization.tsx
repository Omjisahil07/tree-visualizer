
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BPlusTreeNode } from '../types/BPlusTreeTypes';

interface BPlusTreeVisualizationProps {
  tree: BPlusTreeNode | null;
  currentNode?: number | null;
  visitedNodes: number[];
}

export const BPlusTreeVisualization = ({ 
  tree,
  currentNode,
  visitedNodes
}: BPlusTreeVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tree) return;

    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 20, left: 20 };
    const nodeWidth = 40;
    const nodeHeight = 30;
    const nodeSpacing = 20;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create hierarchical layout
    const hierarchy = d3.hierarchy(tree, d => d.children);
    const treeLayout = d3.tree()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .nodeSize([80, 100]); // Adjust node spacing

    const root = treeLayout(hierarchy);

    // Draw links between nodes
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("d", d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x));

    // Create node groups
    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    // Add rectangles for nodes
    nodes.each(function(d: any) {
      const nodeGroup = d3.select(this);
      const numKeys = d.data.keys.length;
      const totalWidth = numKeys * (nodeWidth + nodeSpacing) - nodeSpacing;

      // Draw node background
      nodeGroup.append("rect")
        .attr("x", -totalWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("width", totalWidth)
        .attr("height", nodeHeight)
        .attr("fill", d.data.isLeaf ? "white" : "hsl(var(--primary) / 0.1)")
        .attr("stroke", "hsl(var(--primary))")
        .attr("stroke-width", 2)
        .attr("rx", 4);

      // Draw key cells
      d.data.keys.forEach((key: number, i: number) => {
        const x = -totalWidth / 2 + i * (nodeWidth + nodeSpacing);
        
        // Cell background
        nodeGroup.append("rect")
          .attr("x", x)
          .attr("y", -nodeHeight / 2)
          .attr("width", nodeWidth)
          .attr("height", nodeHeight)
          .attr("fill", currentNode === key ? "hsl(var(--primary))" :
                       visitedNodes.includes(key) ? "hsl(var(--primary) / 0.2)" : 
                       "transparent")
          .attr("stroke", "hsl(var(--primary))")
          .attr("stroke-width", 1)
          .attr("rx", 4);

        // Key text
        nodeGroup.append("text")
          .attr("x", x + nodeWidth / 2)
          .attr("y", 0)
          .attr("dy", "0.3em")
          .attr("text-anchor", "middle")
          .attr("fill", currentNode === key || visitedNodes.includes(key) ? "white" : "currentColor")
          .attr("class", "text-sm font-medium")
          .text(key);
      });
    });

    // Add next pointers for leaf nodes
    if (tree.isLeaf && tree.next) {
      g.append("path")
        .attr("class", "next-pointer")
        .attr("fill", "none")
        .attr("stroke", "hsl(var(--primary))")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4")
        .attr("marker-end", "url(#arrowhead)")
        .attr("d", `M ${width - margin.right} ${height/2} L ${width - margin.right + 20} ${height/2}`);
    }

    // Add arrowhead marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M 0,-5 L 10,0 L 0,5")
      .attr("fill", "hsl(var(--primary))");

  }, [tree, currentNode, visitedNodes]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[400px] border border-border rounded-lg bg-white shadow-lg"
    />
  );
};
