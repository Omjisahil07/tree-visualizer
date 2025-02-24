
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
    const nodeRadius = 20; // Reduced node radius
    const levelHeight = 60; // Reduced vertical spacing between levels
    const horizontalSpacing = 80; // Reduced horizontal spacing between nodes

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add arrow marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 28) // Adjusted to account for smaller node radius
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6) // Smaller arrow
      .attr("markerHeight", 6) // Smaller arrow
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

    // Calculate levels and children for each node
    const nodeLevels = new Map<number, number>();
    const childrenByParent = new Map<number, number[]>();
    const visited = new Set<number>();

    function calculateLevels(nodeId: number, level: number) {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      nodeLevels.set(nodeId, level);

      const children = graph.edges
        .filter(([from, _]) => from === nodeId)
        .map(([_, to]) => to);

      childrenByParent.set(nodeId, children);
      children.forEach(childId => {
        calculateLevels(childId, level + 1);
      });
    }

    // Start from the root node
    if (graph.nodes.length > 0) {
      calculateLevels(graph.nodes[0].id, 0);
    }

    // Get max level depth
    const maxLevel = Math.max(...Array.from(nodeLevels.values()), 0);

    // Position nodes
    const updatedNodes = graph.nodes.map((node, index) => {
      if (index === 0) {
        // Center root node at top
        return {
          ...node,
          x: width / 2,
          y: nodeRadius,
          fx: width / 2,
          fy: nodeRadius
        };
      }

      const level = nodeLevels.get(node.id) || 0;
      const siblings = Array.from(childrenByParent.values())
        .find(children => children.includes(node.id)) || [];
      const siblingIndex = siblings.indexOf(node.id);
      const parentNode = graph.nodes.find(n => 
        childrenByParent.get(n.id)?.includes(node.id)
      );
      
      let x;
      if (parentNode) {
        const parentX = updatedNodes.find(n => n.id === parentNode.id)?.x || width / 2;
        const offset = (siblingIndex - (siblings.length - 1) / 2) * horizontalSpacing;
        x = parentX + offset;
      } else {
        x = (width / (graph.nodes.length + 1)) * (index + 1);
      }

      const y = (level + 1) * levelHeight;

      return {
        ...node,
        x,
        y,
        fx: x,
        fy: y
      };
    });

    // Draw curved edges
    const links = svg.selectAll(".link")
      .data(graph.edges)
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)")
      .attr("d", (edge) => {
        const source = updatedNodes.find(n => n.id === edge[0]);
        const target = updatedNodes.find(n => n.id === edge[1]);
        if (!source || !target) return "";
        
        // Create a curved path
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        
        return `M ${source.x},${source.y} 
                L ${target.x},${target.y}`;
      });

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
      .style("font-size", "14px"); // Smaller font size

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
