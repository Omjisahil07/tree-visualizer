
import { memo } from 'react';
import * as d3 from 'd3';

interface TreeNodeProps {
  nodeData: any;
  nodeGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  totalWidth: number;
  nodeWidth: number;
  nodeHeight: number;
  nodeSpacing: number;
  currentNode: number | null | undefined;
  visitedNodes: number[];
}

export const renderTreeNode = (props: TreeNodeProps) => {
  const { 
    nodeData, 
    nodeGroup, 
    totalWidth, 
    nodeWidth, 
    nodeHeight, 
    nodeSpacing, 
    currentNode, 
    visitedNodes 
  } = props;

  // Node background
  nodeGroup.append("rect")
    .attr("x", -totalWidth / 2)
    .attr("y", -nodeHeight / 2)
    .attr("width", totalWidth)
    .attr("height", nodeHeight)
    .attr("fill", nodeData.isLeaf ? "white" : "hsl(var(--primary) / 0.1)")
    .attr("stroke", "hsl(var(--primary))")
    .attr("stroke-width", 1.5)
    .attr("rx", 6)
    .attr("opacity", 0)
    .transition()
    .duration(500)
    .attr("opacity", 1);

  // Draw key cells
  nodeData.keys.forEach((key: number, i: number) => {
    const x = -totalWidth / 2 + i * (nodeWidth + nodeSpacing);
    
    // Cell background
    nodeGroup.append("rect")
      .attr("x", x)
      .attr("y", -nodeHeight / 2)
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("fill", currentNode === key ? "hsl(var(--primary))" :
                  visitedNodes.includes(key) ? "hsl(var(--primary) / 0.2)" : 
                  "transparent")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 1)
      .attr("rx", 4)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .delay(i * 100)
      .attr("opacity", 1);

    // Key text
    nodeGroup.append("text")
      .attr("x", x + nodeWidth / 2)
      .attr("y", 0)
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .attr("fill", currentNode === key ? "white" : 
                     visitedNodes.includes(key) ? "hsl(var(--primary))" : "currentColor")
      .attr("class", "text-sm font-medium")
      .attr("opacity", 0)
      .text(key)
      .transition()
      .duration(500)
      .delay(i * 100)
      .attr("opacity", 1);

    // Add visit order number if the node has been visited
    if (visitedNodes.includes(key)) {
      const visitIndex = visitedNodes.indexOf(key) + 1;
      nodeGroup.append("circle")
        .attr("cx", x + nodeWidth - 8)
        .attr("cy", -nodeHeight / 2 + 8)
        .attr("r", 8)
        .attr("fill", "hsl(var(--secondary))")
        .attr("opacity", 0)
        .transition()
        .duration(500)
        .delay(i * 100)
        .attr("opacity", 1);

      nodeGroup.append("text")
        .attr("x", x + nodeWidth - 8)
        .attr("y", -nodeHeight / 2 + 8)
        .attr("dy", "0.3em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("class", "text-xs font-bold")
        .text(visitIndex)
        .attr("opacity", 0)
        .transition()
        .duration(500)
        .delay(i * 100)
        .attr("opacity", 1);
    }
  });
};
