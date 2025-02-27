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
    } else if (isDirectPath(graph)) {
      // If graph is a simple path (each node has at most one outgoing edge),
      // Use a custom layout that shows the path clearly
      updatedNodes = layoutDirectPath(graph, width, height, nodeRadius);
    } else {
      // For more complex graphs, use an improved force-directed layout
      updatedNodes = layoutComplexGraph(graph, width, height, nodeRadius);
    }

    // Convert edges to objects with source and target properties
    const links = graph.edges.map(edge => ({
      source: updatedNodes.find(n => n.id === edge[0]),
      target: updatedNodes.find(n => n.id === edge[1])
    }));

    // Draw curved edges for better visualization
    const edgeOpacity = isDirected ? 0.7 : 0.5;
    
    if (isDirected) {
      // Draw directed edges as curves
      svg.selectAll(".edge")
        .data(links)
        .join("path")
        .attr("class", "edge")
        .attr("d", d => {
          const sourceX = (d.source as any).x;
          const sourceY = (d.source as any).y;
          const targetX = (d.target as any).x;
          const targetY = (d.target as any).y;
          
          // Calculate control point for the curve
          // For horizontal paths, add a slight curve
          const dx = targetX - sourceX;
          const dy = targetY - sourceY;
          const dr = Math.sqrt(dx * dx + dy * dy);
          
          // If nodes are approximately at the same level, add a more pronounced curve
          if (Math.abs(dy) < 50) {
            return `M${sourceX},${sourceY} A${dr},${dr * 1.5} 0 0,1 ${targetX},${targetY}`;
          }
          
          // Otherwise use a gentler curve
          return `M${sourceX},${sourceY} Q${(sourceX + targetX) / 2 + 30},${(sourceY + targetY) / 2} ${targetX},${targetY}`;
        })
        .attr("fill", "none")
        .attr("stroke", "hsl(var(--primary))")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", edgeOpacity)
        .attr("marker-end", "url(#arrowhead)");
    } else {
      // Draw undirected edges as straight lines
      svg.selectAll(".edge")
        .data(links)
        .join("line")
        .attr("class", "edge")
        .attr("stroke", "hsl(var(--primary))")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", edgeOpacity)
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);
    }

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

  // Helper functions for layout
  
  // Check if graph is a simple directed path
  function isDirectPath(graph: Graph): boolean {
    if (graph.nodes.length <= 1) return true;
    
    // Count outgoing edges for each node
    const outgoingEdges: Record<number, number> = {};
    graph.nodes.forEach(node => outgoingEdges[node.id] = 0);
    
    graph.edges.forEach(edge => {
      outgoingEdges[edge[0]]++;
    });
    
    // Check if every node has at most one outgoing edge
    return Object.values(outgoingEdges).every(count => count <= 1);
  }
  
  // Layout for directed paths
  function layoutDirectPath(graph: Graph, width: number, height: number, nodeRadius: number) {
    const nodeCount = graph.nodes.length;
    if (nodeCount <= 1) {
      return graph.nodes.map(node => ({...node, x: width/2, y: height/2}));
    }
    
    // Find start nodes (nodes with no incoming edges or nodes not referenced as targets)
    const targets = new Set(graph.edges.map(edge => edge[1]));
    const startNodes = graph.nodes.filter(node => !targets.has(node.id));
    
    // If no clear start node, use the first node
    const firstNodeId = startNodes.length > 0 ? startNodes[0].id : graph.nodes[0].id;
    
    // Build an adjacency list
    const adjacencyList: Record<number, number[]> = {};
    graph.nodes.forEach(node => adjacencyList[node.id] = []);
    graph.edges.forEach(edge => {
      adjacencyList[edge[0]].push(edge[1]);
    });
    
    // Find the longest path from the start node
    const visited = new Set<number>();
    const positions: Record<number, {x: number, y: number}> = {};
    
    // For horizontal layout
    const spacing = Math.min((width - 2 * nodeRadius) / (nodeCount + 1), 120);
    
    // Position nodes in a path
    let currentX = nodeRadius + spacing;
    let currentY = height / 2;
    let currentNode = firstNodeId;
    
    while (currentNode !== undefined && !visited.has(currentNode)) {
      visited.add(currentNode);
      
      // Position current node
      positions[currentNode] = { x: currentX, y: currentY };
      currentX += spacing;
      
      // Find next node in path
      const neighbors = adjacencyList[currentNode];
      currentNode = neighbors.length > 0 ? neighbors[0] : undefined;
      
      // For zigzag pattern, offset Y position
      if (currentNode !== undefined && !visited.has(currentNode)) {
        currentY = currentY === height / 2 ? height / 2 - 50 : height / 2;
      }
    }
    
    // Position any remaining nodes
    graph.nodes.forEach(node => {
      if (!positions[node.id]) {
        positions[node.id] = { 
          x: Math.random() * (width - 2 * nodeRadius) + nodeRadius,
          y: Math.random() * (height - 2 * nodeRadius) + nodeRadius
        };
      }
    });
    
    // Return nodes with positions
    return graph.nodes.map(node => ({
      ...node,
      x: positions[node.id].x,
      y: positions[node.id].y
    }));
  }
  
  // Layout for complex graphs
  function layoutComplexGraph(graph: Graph, width: number, height: number, nodeRadius: number) {
    // Make a deep copy of nodes for d3 to manipulate
    const nodesCopy = graph.nodes.map(node => ({...node}));
    
    // Create links array for the simulation
    const links = graph.edges.map(edge => ({
      source: edge[0],
      target: edge[1]
    }));
    
    // Use D3 force simulation for layout
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collision", d3.forceCollide().radius(nodeRadius * 1.8));
    
    // Run the simulation
    simulation.nodes(nodesCopy);
    (simulation.force("link") as d3.ForceLink<any, any>).links(links);
    
    // Run the simulation synchronously
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
    
    return nodesCopy;
  }

  return (
    <div className="relative w-full border border-border rounded-lg bg-white shadow-sm p-4">
      <svg
        ref={svgRef}
        className="w-full h-[400px]"
      />
    </div>
  );
};
