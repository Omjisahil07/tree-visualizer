
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BPlusTreeNode } from '../types/BPlusTreeTypes';
import { VisitationOrder } from './visualization/VisitationOrder';
import { renderTreeNode } from './visualization/TreeNode';
import { convertToHierarchy } from './visualization/treeUtils';
import { renderTreeLinks } from './visualization/TreeLinks';

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

    // Render tree links
    renderTreeLinks({ g, root, nodeWidth, nodeHeight });

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
      
      renderTreeNode({
        nodeData,
        nodeGroup,
        totalWidth,
        nodeWidth,
        nodeHeight,
        nodeSpacing,
        currentNode,
        visitedNodes
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
      <VisitationOrder visitedNodes={visitedNodes} />
    </div>
  );
};
