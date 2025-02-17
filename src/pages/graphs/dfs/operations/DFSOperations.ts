
import { Graph, TraversalCallback } from "../../types/GraphTypes";

export const dfsTraversal = async (
  graph: Graph,
  startNodeId: number,
  callback: TraversalCallback
) => {
  const visited = new Set<number>();

  const dfs = async (nodeId: number) => {
    if (visited.has(nodeId)) return;

    await callback(nodeId, `Visiting node ${nodeId}`);
    visited.add(nodeId);

    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) return;

    for (const neighborId of node.neighbors) {
      if (!visited.has(neighborId)) {
        await callback(nodeId, `Moving to neighbor ${neighborId}`);
        await dfs(neighborId);
      }
    }
  };

  await dfs(startNodeId);
};
