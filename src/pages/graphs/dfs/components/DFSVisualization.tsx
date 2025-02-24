
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Graph } from '../../types/GraphTypes';

interface DFSVisualizationProps {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
}

export const DFSVisualization = ({
  graph,
  currentNode,
  visitedNodes
}: DFSVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
    const width = containerWidth;
    const height = 400;
    const nodeRadius = 25;
    const levelHeight = 100; // Vertical spacing between levels

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add arrow marker definition
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

    if (graph.nodes.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .text("Add nodes to start visualization");
      return;
    }

    // Calculate levels for each node
    const nodeLevels = new Map<number, number>();
    const childrenCount = new Map<number, number[]>();
    const visited = new Set<number>();

    function calculateLevels(nodeId: number, level: number) {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      nodeLevels.set(nodeId, level);

      const node = graph.nodes.find(n => n.id === nodeId);
      if (!node) return;

      const children = graph.edges
        .filter(([from, _]) => from === nodeId)
        .map(([_, to]) => to);

      children.forEach(childId => {
        if (!childrenCount.has(level)) {
          childrenCount.set(level, []);
        }
        childrenCount.get(level)?.push(childId);
        calculateLevels(childId, level + 1);
      });
    }

    // Start from the first node (root)
    if (graph.nodes.length > 0) {
      calculateLevels(graph.nodes[0].id, 0);
    }

    // Position nodes based on their level and relative position within level
    const updatedNodes = graph.nodes.map((node, index) => {
      if (index === 0) {
        // Center the root node
        return {
          ...node,
          x: width / 2,
          y: nodeRadius * 2,
          fx: width / 2,
          fy: nodeRadius * 2
        };
      }

      const level = nodeLevels.get(node.id) || 0;
      const levelNodes = Array.from(childrenCount.get(level) || []);
      const nodeIndex = levelNodes.indexOf(node.id);
      const nodesInLevel = levelNodes.length || 1;
      
      const x = (nodeIndex + 1) * (width / (nodesInLevel + 1));
      const y = level * levelHeight + nodeRadius * 2;

      return {
        ...node,
        x,
        y,
        fx: x,
        fy: y
      };
    });

    // Convert edges to objects with source and target properties
    const links = graph.edges.map(edge => ({
      source: updatedNodes.find(n => n.id === edge[0]),
      target: updatedNodes.find(n => n.id === edge[1])
    }));

    // Draw edges with arrows
    const edges = svg.selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)")
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

  }, [graph, currentNode, visitedNodes]);

  return (
    <div className="relative w-full border border-border rounded-lg bg-white shadow-sm p-4">
      <svg
        ref={svgRef}
        className="w-full h-[400px]"
      />
    </div>
  );
};
