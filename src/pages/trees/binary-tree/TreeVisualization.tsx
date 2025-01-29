import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeNode } from './TreeNode';

interface TreeVisualizationProps {
  tree: TreeNode;
  onNodeDelete: (value: number) => void;
  onNodeHighlight: (value: number | null) => void;
}

export const TreeVisualization = ({ tree, onNodeDelete, onNodeHighlight }: TreeVisualizationProps) => {
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
        .y((d: any) => d.y));

    // Draw nodes
    const nodes = g.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    // Add circles to nodes
    nodes.append("circle")
      .attr("r", 25)
      .attr("fill", "white")
      .attr("stroke", "#9333ea")
      .attr("stroke-width", 2)
      .attr("class", "hover:stroke-primary/80 transition-colors cursor-pointer");

    // Add text to nodes
    nodes.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("class", "text-sm font-medium")
      .text((d: any) => d.data.value);

    // Add drag behavior to nodes
    nodes.call(drag as any);

    // Add delete functionality on double click
    nodes.on("dblclick", (event, d: any) => {
      event.preventDefault();
      if (d.data.value !== null) {
        onNodeDelete(d.data.value);
      }
    });

  }, [tree, onNodeDelete]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[500px] border border-gray-200 rounded-lg"
    />
  );
};