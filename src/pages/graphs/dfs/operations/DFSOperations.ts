
import { Graph, TraversalCallback } from "../../types/GraphTypes";

export const dfsTraversal = async (
  graph: Graph,
  startNodeId: number,
  callback: TraversalCallback
) => {
  const visited = new Set<number>();

  const dfs = async (nodeId: number) => {
    if (visited.has(nodeId)) return;

    // Mark current node as visited
    visited.add(nodeId);
    await callback(nodeId, `Visiting node ${nodeId}`);
    // Added a consistent delay to slow down the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));

    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) return;

    // Visit neighbors in order
    for (const neighborId of node.neighbors.sort((a, b) => a - b)) {
      if (!visited.has(neighborId)) {
        await callback(nodeId, `Moving to neighbor ${neighborId}`);
        await dfs(neighborId);
      }
    }

    await callback(nodeId, `Backtracking from node ${nodeId}`);
    // Added a small delay for backtracking visualization
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  await dfs(startNodeId);
};
