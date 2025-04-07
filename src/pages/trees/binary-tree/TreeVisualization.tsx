
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { TreeNode } from './TreeNode';
import { TraversalState } from './types/BinaryTreeTypes';

interface TreeVisualizationProps {
  tree: TreeNode;
  onNodeDelete: (value: number) => void;
  onNodeClick: (value: number) => void;
  onNodeHighlight: (value: number | null) => void;
  currentNode?: number | null;
  visitedNodes: number[];
  traversalState?: TraversalState;
}

export const TreeVisualization = ({ 
  tree, 
  onNodeDelete, 
  onNodeClick,
  onNodeHighlight,
  currentNode,
  visitedNodes,
  traversalState
}: TreeVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [blinkingNode, setBlinkingNode] = useState<number | null>(null);

  // Set blinking effect on current node
  useEffect(() => {
    if (currentNode !== null && currentNode !== undefined) {
      setBlinkingNode(currentNode);
      const timer = setTimeout(() => {
        setBlinkingNode(null);
      }, 700); // Blink for 700ms
      return () => clearTimeout(timer);
    }
  }, [currentNode]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const processTreeForVisualization = (node: TreeNode): any => {
      if (!node || node.value === null) return null;
      return {
        value: node.value,
        children: node.children
          .map(child => processTreeForVisualization(child))
          .filter(child => child !== null)
      };
    };

    const visualTree = processTreeForVisualization(tree);
    if (!visualTree) return;

    const hierarchy = d3.hierarchy(visualTree);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const treeData = treeLayout(hierarchy);

    const drag = d3.drag<SVGGElement, any>()
      .on("drag", (event, d: any) => {
        d.x = event.x;
        d.y = event.y;
        d3.select(event.sourceEvent.target.parentNode)
          .attr("transform", `translate(${d.x},${d.y})`);
        
        g.selectAll(".link")
          .attr("d", d3.linkVertical()
            .x((d: any) => d.x)
            .y((d: any) => d.y));
      });

    // Draw links with slower animation
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
      .duration(1500)
      .style("opacity", 1);

    const nodes = g.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    // Add circles to nodes with specific colors based on traversal state
    nodes.append("circle")
      .attr("r", 0)
      .attr("fill", (d: any) => {
        if (blinkingNode === d.data.value) return "hsl(var(--primary))";
        if (d.data.value === currentNode) {
          if (traversalState === 'current') return "hsl(var(--primary))";
          if (traversalState === 'visiting') return "hsl(var(--primary) / 0.7)";
          if (traversalState === 'backtracking') return "hsl(var(--destructive) / 0.7)";
        }
        if (visitedNodes.includes(d.data.value)) return "hsl(var(--primary) / 0.4)";
        return "white";
      })
      .attr("stroke", (d: any) => {
        if (d.data.value === currentNode && traversalState === 'backtracking') 
          return "hsl(var(--destructive))";
        return "hsl(var(--primary))";
      })
      .attr("stroke-width", 2)
      .attr("class", (d: any) => 
        blinkingNode === d.data.value 
          ? "transition-colors duration-300 animate-pulse" 
          : "transition-colors duration-500"
      )
      .transition()
      .duration(1500)
      .attr("r", (d: any) => 
        d.data.value === currentNode ? 28 : 25
      );

    // Add text to nodes with slower animation
    nodes.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("class", (d: any) => 
        blinkingNode === d.data.value
          ? "text-sm font-medium text-white"
          : "text-sm font-medium"
      )
      .style("opacity", 0)
      .text((d: any) => d.data.value)
      .transition()
      .duration(1500)
      .style("opacity", 1);

    // Add drag behavior to nodes
    nodes.call(drag as any);

  }, [tree, onNodeDelete, onNodeClick, onNodeHighlight, currentNode, visitedNodes, blinkingNode, traversalState]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[400px] border border-gray-200 rounded-lg bg-white shadow-lg"
    />
  );
};
