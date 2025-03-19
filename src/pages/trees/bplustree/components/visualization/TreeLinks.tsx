
import * as d3 from 'd3';

interface TreeLinksProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  root: d3.HierarchyNode<any>;
  nodeWidth: number;
  nodeHeight: number;
}

export const renderTreeLinks = ({ g, root, nodeWidth, nodeHeight }: TreeLinksProps) => {
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
};
