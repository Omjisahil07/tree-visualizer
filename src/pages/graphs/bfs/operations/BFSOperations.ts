
import { Graph, TraversalCallback } from "../../types/GraphTypes";

export const bfsTraversal = async (
  graph: Graph,
  startNodeId: number,
  callback: TraversalCallback
) => {
  const visited = new Set<number>();
  const queue: number[] = [startNodeId];

  await callback(startNodeId, `Starting BFS from node ${startNodeId}`, 1);
  visited.add(startNodeId);

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    await callback(nodeId, `Processing node ${nodeId}`, 2);

    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) continue;

    // Visit neighbors in order
    const sortedNeighbors = [...node.neighbors].sort((a, b) => a - b);
    for (const neighborId of sortedNeighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);
        await callback(neighborId, `Discovered node ${neighborId} from ${nodeId}`, 3);
      }
    }
  }
};
