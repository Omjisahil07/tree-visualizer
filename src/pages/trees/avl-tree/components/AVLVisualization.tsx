/**
 * Component for visualizing the AVL tree structure using D3
 */
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AVLNode } from '../types/AVLTypes';

interface AVLVisualizationProps {
  tree: AVLNode;
  onNodeDelete: (value: number) => void;
  onNodeClick: (value: number) => void;
  currentNode?: number | null;
  visitedNodes: number[];
}

export const AVLVisualization = ({ 
  tree, 
  onNodeDelete, 
  onNodeClick,
  currentNode,
  visitedNodes
}: AVLVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Setup SVG dimensions and margins
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const nodeRadius = 35;

    // Clear existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Process tree data for D3 visualization
    const processTreeForVisualization = (node: AVLNode): any => {
      if (!node || !node.value) return null;
      return {
        value: node.value,
        balanceFactor: node.balanceFactor,
        children: node.children
          .map(child => processTreeForVisualization(child))
          .filter(child => child !== null)
      };
    };

    const visualTree = processTreeForVisualization(tree);
    if (!visualTree) return;

    // Create D3 tree layout
    const hierarchy = d3.hierarchy(visualTree);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const treeData = treeLayout(hierarchy);

    // Setup node dragging behavior
    const drag = d3.drag<SVGGElement, any>()
      .on("drag", (event, d: any) => {
        d.x = event.x;
        d.y = event.y;
        d3.select(event.sourceEvent.target.parentNode)
          .attr("transform", `translate(${d.x},${d.y})`);
        
        // Update links when nodes are dragged
        g.selectAll(".link")
          .attr("d", d3.linkVertical()
            .x((d: any) => d.x)
            .y((d: any) => d.y));
      });

    // Draw tree links
    g.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("d", d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y))
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Create node groups
    const nodes = g.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    // Draw node circles
    nodes.append("circle")
      .attr("r", 0)
      .attr("fill", (d: any) => {
        if (d.data.value === currentNode) return "hsl(var(--primary))";
        if (visitedNodes.includes(d.data.value)) return "hsl(var(--primary) / 0.8)";
        return "white";
      })
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("class", "transition-colors duration-300")
      .transition()
      .duration(500)
      .attr("r", nodeRadius);

    // Add node values
    nodes.append("text")
      .attr("dy", "-0.3em")
      .attr("text-anchor", "middle")
      .attr("class", "text-sm font-medium")
      .style("opacity", 0)
      .text((d: any) => d.data.value)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Add balance factors
    nodes.append("text")
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .attr("class", "text-xs text-primary font-medium")
      .style("opacity", 0)
      .text((d: any) => `BF: ${d.data.balanceFactor || 0}`)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Enable node dragging
    nodes.call(drag as any);

    // Add click handlers
    nodes.on("click", (event, d: any) => {
      event.preventDefault();
      if (d.data.value !== null) {
        onNodeClick(d.data.value);
      }
    });

    nodes.on("dblclick", (event, d: any) => {
      event.preventDefault();
      if (d.data.value !== null) {
        onNodeDelete(d.data.value);
      }
    });

  }, [tree, onNodeDelete, onNodeClick, currentNode, visitedNodes]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[400px] border border-gray-200 rounded-lg bg-white shadow-lg"
    />
  );
};