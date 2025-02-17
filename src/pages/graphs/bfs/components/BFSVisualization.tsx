import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Graph } from '../../types/GraphTypes';

interface BFSVisualizationProps {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
}

export const BFSVisualization = ({ graph, currentNode, visitedNodes }: BFSVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;
    const nodeRadius = 20;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    if (graph.nodes.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .text("Add nodes to start visualization");
      return;
    }

    // Create force simulation
    const simulation = d3.forceSimulation(graph.nodes)
      .force("link", d3.forceLink(graph.edges)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw edges
    const edges = svg.selectAll("line")
      .data(graph.edges)
      .join("line")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2);

    // Draw nodes
    const nodes = svg.selectAll("g")
      .data(graph.nodes)
      .join("g")
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

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
      );

    simulation.on("tick", () => {
      edges
        .attr("x1", d => (d[0] as any).x)
        .attr("y1", d => (d[0] as any).y)
        .attr("x2", d => (d[1] as any).x)
        .attr("y2", d => (d[1] as any).y);

      nodes.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [graph, currentNode, visitedNodes]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[400px] border border-gray-200 rounded-lg bg-white shadow-lg"
    />
  );
};
