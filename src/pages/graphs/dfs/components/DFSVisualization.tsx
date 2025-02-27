
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Graph } from '../../types/GraphTypes';

interface DFSVisualizationProps {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
  isDirected: boolean;
}

export const DFSVisualization = ({
  graph,
  currentNode,
  visitedNodes,
  isDirected
}: DFSVisualizationProps) => {
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

    // Position nodes based on the number of nodes and connections
    let updatedNodes = [];
    
    if (graph.nodes.length === 3) {
      // Create triangular structure for 3 nodes
      updatedNodes = graph.nodes.map((node, i) => {
        let x, y;
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
        return { ...node, x, y };
      });
    } else if (graph.nodes.length <= 4) {
      // Create square or diamond structure for 4 nodes
      updatedNodes = graph.nodes.map((node, i) => {
        let x, y;
        switch(i) {
          case 0: // Top node
            x = width / 2;
            y = height * 0.15;
            break;
          case 1: // Left node
            x = width * 0.25;
            y = height * 0.5;
            break;
          case 2: // Right node
            x = width * 0.75;
            y = height * 0.5;
            break;
          case 3: // Bottom node
            x = width / 2;
            y = height * 0.85;
            break;
          default:
            x = width / 2;
            y = height / 2;
        }
        return { ...node, x, y };
      });
    } else {
      // For more than 4 nodes, use a force-directed layout
      // First set initial positions in a logical structure
      const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(nodeRadius * 1.5));

      // Make a deep copy of nodes for d3 to manipulate
      const nodesCopy = graph.nodes.map(node => ({...node}));
      
      // Create links array for the simulation
      const links = graph.edges.map(edge => ({
        source: edge[0],
        target: edge[1]
      }));

      // Run the simulation synchronously
      simulation.nodes(nodesCopy);
      (simulation.force("link") as d3.ForceLink<any, any>).links(links);
      
      // Run the simulation for a fixed number of iterations
      for (let i = 0; i < 300; i++) {
        simulation.tick();
      }

      // Stop the simulation
      simulation.stop();
      
      // Constrain nodes to be within bounds
      nodesCopy.forEach(node => {
        node.x = Math.max(nodeRadius, Math.min(width - nodeRadius, node.x || width/2));
        node.y = Math.max(nodeRadius, Math.min(height - nodeRadius, node.y || height/2));
      });
      
      updatedNodes = nodesCopy;
    }

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

    // Add node IDs as small labels above nodes
    nodes.append("text")
      .text(d => `#${d.id}`)
      .attr("text-anchor", "middle")
      .attr("dy", "-1.5em")
      .attr("fill", "hsl(var(--muted-foreground))")
      .style("font-size", "12px");

  }, [graph, currentNode, visitedNodes, isDirected]);

  return (
    <div className="relative w-full border border-border rounded-lg bg-white shadow-sm p-4">
      <svg
        ref={svgRef}
        className="w-full h-[400px]"
      />
    </div>
  );
};
