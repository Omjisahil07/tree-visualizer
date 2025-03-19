
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BPlusTreeNode } from '../types/BPlusTreeTypes';

interface BPlusTreeVisualizationProps {
  tree: BPlusTreeNode | null;
  currentNode?: number | null;
  visitedNodes: number[];
}

export const BPlusTreeVisualization = ({ 
  tree,
  currentNode,
  visitedNodes
}: BPlusTreeVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tree) return;

    const width = 1000;
    const height = 600;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const nodeWidth = 40;
    const nodeHeight = 30;
    const nodeSpacing = 5;
    const levelHeight = 80;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare the data for visualization
    // Convert B+ tree to hierarchical structure for d3
    const convertToHierarchy = (node: BPlusTreeNode | null, depth = 0): any => {
      if (!node) return null;
      
      const result: any = {
        name: 'node',
        data: node,
        depth,
        children: []
      };
      
      if (!node.isLeaf && node.children.length > 0) {
        result.children = node.children.map(child => 
          convertToHierarchy(child, depth + 1)
        ).filter(Boolean);
      }
      
      return result;
    };

    const hierarchyData = convertToHierarchy(tree);
    
    // Use d3's tree layout with fixed node sizes
    const root = d3.hierarchy(hierarchyData);
    
    // Count max depth of the tree
    const maxDepth = root.height;
    
    // Calculate the tree width based on the number of leaf nodes
    const leafCount = root.leaves().length;
    const treeWidth = Math.max(width - margin.left - margin.right - 100, leafCount * 100);
    
    // Set up the tree layout
    const treeLayout = d3.tree()
      .size([treeWidth, maxDepth * levelHeight])
      .nodeSize([80, levelHeight]);
    
    treeLayout(root);

    // Center the root node
    const rootX = width / 2;
    const xOffset = rootX - root.x;
    
    // Adjust all node positions
    root.descendants().forEach(d => {
      d.x += xOffset;
      d.y = d.depth * levelHeight + margin.top;
    });

    // Draw links between nodes with curved paths
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 1.5)
      .attr("d", d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y));

    // Draw leaf node connections (next pointers)
    const leafNodes = root.leaves().map(l => l.data.data).filter(n => n.isLeaf);
    for (let i = 0; i < leafNodes.length - 1; i++) {
      if (leafNodes[i].next === leafNodes[i+1]) {
        const sourceNode = root.leaves()[i];
        const targetNode = root.leaves()[i+1];
        
        g.append("path")
          .attr("class", "next-pointer")
          .attr("fill", "none")
          .attr("stroke", "hsl(var(--primary))")
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "4")
          .attr("marker-end", "url(#arrowhead)")
          .attr("d", `M ${sourceNode.x + nodeWidth/2} ${sourceNode.y + nodeHeight} 
                      C ${sourceNode.x + nodeWidth/2} ${sourceNode.y + nodeHeight + 20} 
                        ${targetNode.x - nodeWidth/2} ${targetNode.y + nodeHeight + 20} 
                        ${targetNode.x - nodeWidth/2} ${targetNode.y + nodeHeight}`);
      }
    }

    // Create node groups
    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    // Add rectangles for nodes with animation
    nodes.each(function(d: any) {
      const nodeData = d.data.data;
      const nodeGroup = d3.select(this);
      const numKeys = nodeData.keys.length;
      const totalWidth = Math.max(nodeWidth, numKeys * (nodeWidth + nodeSpacing) - nodeSpacing);
      
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
    });

    // Add arrowhead marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M 0,-5 L 10,0 L 0,5")
      .attr("fill", "hsl(var(--primary))");

  }, [tree, currentNode, visitedNodes]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        className="w-full h-[500px] border border-border rounded-lg bg-white shadow-sm"
      />
      {visitedNodes.length > 0 && (
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-sm border border-border">
          <h4 className="text-sm font-medium mb-2">Visitation Order</h4>
          <div className="flex gap-2">
            {visitedNodes.map((node, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white text-sm font-bold"
              >
                {node}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
