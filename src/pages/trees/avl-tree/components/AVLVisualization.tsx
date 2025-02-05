import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AVLNode } from '../types/AVLTypes';

interface AVLVisualizationProps {
  tree: AVLNode;
  onNodeDelete: (value: number) => void;
  onNodeClick: (value: number) => void;
  currentNode?: number | null;
  visitedNodes: number[];
}

export const AVLVisualization = ({ 
  tree, 
  onNodeDelete, 
  onNodeClick,
  currentNode,
  visitedNodes
}: AVLVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

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

    const processTreeForVisualization = (node: AVLNode): any => {
      if (!node || !node.value) return null;
      return {
        value: node.value,
        balanceFactor: node.balanceFactor,
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
      .duration(500)
      .style("opacity", 1);

    const nodes = g.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 0)
      .attr("fill", (d: any) => {
        if (d.data.value === currentNode) return "hsl(var(--primary))";
        if (visitedNodes.includes(d.data.value)) return "hsl(var(--primary) / 0.8)";
        return "white";
      })
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("class", "transition-colors duration-300")
      .transition()
      .duration(500)
      .attr("r", 25);

    nodes.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("class", "text-sm font-medium")
      .style("opacity", 0)
      .text((d: any) => d.data.value)
      .transition()
      .duration(500)
      .style("opacity", 1);

    // Add balance factor labels
    nodes.append("text")
      .attr("dy", "-1.5em")
      .attr("text-anchor", "middle")
      .attr("class", "text-xs text-primary")
      .style("opacity", 0)
      .text((d: any) => `BF: ${d.data.balanceFactor || 0}`)
      .transition()
      .duration(500)
      .style("opacity", 1);

    nodes.call(drag as any);

    nodes.on("click", (event, d: any) => {
      event.preventDefault();
      if (d.data.value !== null) {
        onNodeClick(d.data.value);
      }
    });

    nodes.on("dblclick", (event, d: any) => {
      event.preventDefault();
      if (d.data.value !== null) {
        onNodeDelete(d.data.value);
      }
    });

  }, [tree, onNodeDelete, onNodeClick, currentNode, visitedNodes]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[400px] border border-gray-200 rounded-lg bg-white shadow-lg"
    />
  );
};