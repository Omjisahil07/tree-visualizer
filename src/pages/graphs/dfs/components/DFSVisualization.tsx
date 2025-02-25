
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
    const nodeRadius = 20;
    const levelSpacing = 80; // Vertical spacing between levels

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add arrow marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 28)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
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

    // Calculate tree structure
    const nodeMap = new Map(graph.nodes.map(node => [node.id, { 
      ...node, 
      children: [] as number[],
      level: 0
    }]));

    // Build parent-child relationships
    graph.edges.forEach(([from, to]) => {
      const parent = nodeMap.get(from);
      if (parent) {
        parent.children.push(to);
      }
    });

    // Calculate levels
    function assignLevels(nodeId: number, level: number) {
      const node = nodeMap.get(nodeId);
      if (node) {
        node.level = level;
        node.children.forEach(childId => assignLevels(childId, level + 1));
      }
    }

    if (graph.nodes.length > 0) {
      assignLevels(graph.nodes[0].id, 0);
    }

    // Calculate x positions for nodes at each level
    const levelNodes = new Map<number, number[]>();
    nodeMap.forEach((node) => {
      if (!levelNodes.has(node.level)) {
        levelNodes.set(node.level, []);
      }
      levelNodes.get(node.level)?.push(node.id);
    });

    // Position nodes
    nodeMap.forEach((node) => {
      const nodesAtLevel = levelNodes.get(node.level) || [];
      const index = nodesAtLevel.indexOf(node.id);
      const totalNodesAtLevel = nodesAtLevel.length;
      
      node.x = width * ((index + 1) / (totalNodesAtLevel + 1));
      node.y = node.level * levelSpacing + 40; // Add padding from top
    });

    // Draw edges with arrows
    const edges = svg.selectAll("line")
      .data(graph.edges)
      .join("line")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)")
      .attr("x1", d => nodeMap.get(d[0])?.x || 0)
      .attr("y1", d => nodeMap.get(d[0])?.y || 0)
      .attr("x2", d => nodeMap.get(d[1])?.x || 0)
      .attr("y2", d => nodeMap.get(d[1])?.y || 0);

    // Draw nodes
    const nodes = svg.selectAll("g")
      .data(Array.from(nodeMap.values()))
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
      .style("font-size", "14px");

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
