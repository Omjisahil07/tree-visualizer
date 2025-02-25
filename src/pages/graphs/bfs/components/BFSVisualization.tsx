
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Graph } from '../../types/GraphTypes';

interface BFSVisualizationProps {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
  isDirected: boolean;
}

export const BFSVisualization = ({
  graph,
  currentNode,
  visitedNodes,
  isDirected
}: BFSVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
    const width = containerWidth;
    const height = 400;
    const nodeRadius = 25;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add arrow marker definition only for directed graphs
    if (isDirected) {
      svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 35)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .append("path")
        .attr("d", "M 0,-5 L 10,0 L 0,5")
        .attr("fill", "hsl(var(--primary))");
    }

    if (graph.nodes.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .text("Add nodes to start visualization");
      return;
    }

    // Position nodes based on the number of nodes
    const updatedNodes = graph.nodes.map((node, i) => {
      let x, y;
      
      if (graph.nodes.length === 3) {
        // Create triangular structure for 3 nodes
        switch(i) {
          case 0: // Top node
            x = width / 2;
            y = height * 0.2;
            break;
          case 1: // Bottom left node
            x = width * 0.3;
            y = height * 0.7;
            break;
          case 2: // Bottom right node
            x = width * 0.7;
            y = height * 0.7;
            break;
          default:
            x = width / 2;
            y = height / 2;
        }
      } else {
        // Default grid layout for other cases
        const row = Math.floor(i / 4);
        const col = i % 4;
        const nodeSpacing = 100;
        x = col * nodeSpacing + nodeSpacing;
        y = row * nodeSpacing + nodeSpacing;
      }

      return {
        ...node,
        x,
        y
      };
    });

    // Convert edges to objects with source and target properties
    const links = graph.edges.map(edge => ({
      source: updatedNodes.find(n => n.id === edge[0]),
      target: updatedNodes.find(n => n.id === edge[1])
    }));

    // Draw edges
    const edges = svg.selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("marker-end", isDirected ? "url(#arrowhead)" : null) // Only add arrows for directed graphs
      .attr("x1", d => (d.source as any).x)
      .attr("y1", d => (d.source as any).y)
      .attr("x2", d => (d.target as any).x)
      .attr("y2", d => (d.target as any).y);

    // Draw nodes
    const nodes = svg.selectAll("g")
      .data(updatedNodes)
      .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", nodeRadius)
      .attr("fill", d => {
        if (d.id === currentNode) return "hsl(var(--primary))";
        if (visitedNodes.includes(d.id)) return "hsl(var(--primary) / 0.2)";
        return "white";
      })
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2);

    nodes.append("text")
      .text(d => d.value)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", d => 
        d.id === currentNode || visitedNodes.includes(d.id) 
          ? "white" 
          : "currentColor"
      )
      .style("font-size", "16px");

  }, [graph, currentNode, visitedNodes, isDirected]); // Added isDirected to dependencies

  return (
    <div className="relative w-full border border-border rounded-lg bg-white shadow-sm p-4">
      <svg
        ref={svgRef}
        className="w-full h-[400px]"
      />
    </div>
  );
};
