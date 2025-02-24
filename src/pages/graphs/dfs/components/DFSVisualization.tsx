
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
    const levelHeight = 60;
    const horizontalSpacing = 80;

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

    // Create a mapping of node positions
    const nodePositions = new Map<number, { x: number; y: number }>();

    // Position root node
    if (graph.nodes.length > 0) {
      nodePositions.set(graph.nodes[0].id, {
        x: width / 2,
        y: nodeRadius
      });
    }

    // Calculate positions for all nodes level by level
    const maxLevel = Math.max(...Array.from(nodeLevels.values()), 0);
    for (let level = 1; level <= maxLevel; level++) {
      const nodesAtLevel = graph.nodes.filter(node => nodeLevels.get(node.id) === level);
      
      nodesAtLevel.forEach((node, index) => {
        const parent = graph.nodes.find(n => 
          (childrenByParent.get(n.id) || []).includes(node.id)
        );
        
        if (parent) {
          const parentPos = nodePositions.get(parent.id);
          const siblings = childrenByParent.get(parent.id) || [];
          const siblingIndex = siblings.indexOf(node.id);
          const totalSiblings = siblings.length;
          
          if (parentPos) {
            const x = parentPos.x + (siblingIndex - (totalSiblings - 1) / 2) * horizontalSpacing;
            const y = level * levelHeight;
            nodePositions.set(node.id, { x, y });
          }
        }
      });
    }

    // Draw edges with arrows
    const links = svg.selectAll(".link")
      .data(graph.edges)
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)")
      .attr("d", (edge) => {
        const source = nodePositions.get(edge[0]);
        const target = nodePositions.get(edge[1]);
        if (!source || !target) return "";
        
        return `M ${source.x},${source.y} L ${target.x},${target.y}`;
      });

    // Draw nodes
    const nodes = svg.selectAll(".node")
      .data(graph.nodes)
      .join("g")
      .attr("class", "node")
      .attr("transform", d => {
        const pos = nodePositions.get(d.id);
        return pos ? `translate(${pos.x},${pos.y})` : "";
      });

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
