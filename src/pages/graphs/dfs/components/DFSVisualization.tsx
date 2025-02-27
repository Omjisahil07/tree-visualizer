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

    // Position nodes based on graph structure
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
    } else if (graph.nodes.length === 4) {
      // Create square structure for 4 nodes
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
      // For more nodes, create a grid layout with proper spacing
      // to avoid overlapping while keeping structure clear
      const gridSize = Math.ceil(Math.sqrt(graph.nodes.length));
      const cellWidth = width / (gridSize + 1);
      const cellHeight = height / (gridSize + 1);
      
      updatedNodes = graph.nodes.map((node, i) => {
        // Calculate grid position
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        // Add some random variation to prevent perfect grid alignment
        // but not so much that nodes could overlap
        const jitterX = (Math.random() - 0.5) * cellWidth * 0.4;
        const jitterY = (Math.random() - 0.5) * cellHeight * 0.4;
        
        return {
          ...node,
          x: cellWidth * (col + 1) + jitterX,
          y: cellHeight * (row + 1) + jitterY
        };
      });
      
      // Run overlap prevention algorithm
      for (let iteration = 0; iteration < 50; iteration++) {
        let moved = false;
        for (let i = 0; i < updatedNodes.length; i++) {
          for (let j = i + 1; j < updatedNodes.length; j++) {
            const dx = updatedNodes[j].x - updatedNodes[i].x;
            const dy = updatedNodes[j].y - updatedNodes[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = nodeRadius * 2.5; // Minimum acceptable distance
            
            if (distance < minDistance) {
              // Move nodes apart along their axis
              const moveX = (dx / distance) * (minDistance - distance) * 0.5;
              const moveY = (dy / distance) * (minDistance - distance) * 0.5;
              
              updatedNodes[i].x -= moveX;
              updatedNodes[i].y -= moveY;
              updatedNodes[j].x += moveX;
              updatedNodes[j].y += moveY;
              
              moved = true;
            }
          }
        }
        if (!moved) break; // If no nodes were moved, we're done
      }
      
      // Ensure all nodes are within bounds
      updatedNodes.forEach(node => {
        node.x = Math.max(nodeRadius, Math.min(width - nodeRadius, node.x));
        node.y = Math.max(nodeRadius, Math.min(height - nodeRadius, node.y));
      });
    }

    // Convert edges to objects with source and target properties
    const links = graph.edges.map(edge => ({
      source: updatedNodes.find(n => n.id === edge[0]),
      target: updatedNodes.find(n => n.id === edge[1])
    }));

    // Draw edges as straight lines
    const edges = svg.selectAll(".edge")
      .data(links)
      .join("line")
      .attr("class", "edge")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("x1", d => (d.source as any).x)
      .attr("y1", d => (d.source as any).y)
      .attr("x2", d => {
        // For directed graphs, make the line stop a bit before the target
        // to avoid overlap with the arrowhead
        if (isDirected) {
          const sourceX = (d.source as any).x;
          const targetX = (d.target as any).x;
          const sourceY = (d.source as any).y;
          const targetY = (d.target as any).y;
          const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
          return targetX - (Math.cos(angle) * nodeRadius);
        }
        return (d.target as any).x;
      })
      .attr("y2", d => {
        // Same adjustment for y coordinate
        if (isDirected) {
          const sourceX = (d.source as any).x;
          const targetX = (d.target as any).x;
          const sourceY = (d.source as any).y;
          const targetY = (d.target as any).y;
          const angle = Math.atan2(targetY - sourceY, targetX - sourceX);
          return targetY - (Math.sin(angle) * nodeRadius);
        }
        return (d.target as any).y;
      })
      .attr("marker-end", isDirected ? "url(#arrowhead)" : null);

    // Draw nodes
    const nodes = svg.selectAll(".node")
      .data(updatedNodes)
      .join("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    // Add shadows for depth
    nodes.append("circle")
      .attr("r", nodeRadius)
      .attr("fill", "rgba(0,0,0,0.1)")
      .attr("cx", 3)
      .attr("cy", 3);

    // Node circles
    nodes.append("circle")
      .attr("r", nodeRadius)
      .attr("fill", d => {
        if (d.id === currentNode) return "hsl(var(--primary))";
        if (visitedNodes.includes(d.id)) return "hsl(var(--primary) / 0.4)";
        return "white";
      })
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2);

    // Node values
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

    // Add visit order indicators for visited nodes
    visitedNodes.forEach((nodeId, index) => {
      const node = updatedNodes.find(n => n.id === nodeId);
      if (!node) return;
      
      const visitNode = svg.append("g")
        .attr("transform", `translate(${node.x + nodeRadius * 0.7},${node.y - nodeRadius * 0.7})`);
        
      visitNode.append("circle")
        .attr("r", 10)
        .attr("fill", "hsl(var(--secondary))");
        
      visitNode.append("text")
        .text(index + 1)
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("fill", "white")
        .style("font-size", "10px");
    });

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
