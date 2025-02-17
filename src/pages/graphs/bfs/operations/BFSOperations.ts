
import { Graph, TraversalCallback } from "../../types/GraphTypes";

export const bfsTraversal = async (
  graph: Graph,
  startNodeId: number,
  callback: TraversalCallback
) => {
  const visited = new Set<number>();
  const queue: number[] = [startNodeId];
  visited.add(startNodeId);

  await callback(startNodeId, `Starting BFS from node ${startNodeId}`);

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) continue;

    for (const neighborId of node.neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);
        await callback(neighborId, `Visiting neighbor ${neighborId} of node ${nodeId}`);
      }
    }
  }
};
