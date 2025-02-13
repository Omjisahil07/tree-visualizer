
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BTreeNode } from '../types/BTreeTypes';

interface BTreeVisualizationProps {
  tree: BTreeNode | null;
  currentNode?: number | null;
  visitedNodes: number[];
}

export const BTreeVisualization = ({ 
  tree,
  currentNode,
  visitedNodes
}: BTreeVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tree) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const hierarchy = d3.hierarchy(tree, d => d.children);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const treeData = treeLayout(hierarchy);

    // Draw links
    g.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
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

    // Add rectangles for nodes
    nodes.append("rect")
      .attr("width", (d: any) => Math.max(d.data.keys.length * 30, 30))
      .attr("height", 30)
      .attr("x", (d: any) => -(d.data.keys.length * 30) / 2)
      .attr("y", -15)
      .attr("fill", (d: any) => d.data.isLeaf ? "white" : "hsl(var(--primary) / 0.1)")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("rx", 4);

    // Add text for keys
    nodes.selectAll(".key-text")
      .data((d: any) => d.data.keys.map((key: number) => ({ key, isLeaf: d.data.isLeaf })))
      .join("text")
      .attr("class", "key-text")
      .attr("x", (d: any, i: number, nodes: any) => {
        const parentWidth = nodes[i].parentNode.__data__.data.keys.length * 30;
        return -parentWidth/2 + (i * 30) + 15;
      })
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .text((d: any) => d.key);

  }, [tree, currentNode, visitedNodes]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[400px] border border-gray-200 rounded-lg bg-white shadow-lg"
    />
  );
};
