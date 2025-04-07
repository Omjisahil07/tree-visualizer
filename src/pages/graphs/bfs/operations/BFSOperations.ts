
import { Graph, TraversalCallback } from "../../types/GraphTypes";

export const bfsTraversal = async (
  graph: Graph,
  startNodeId: number,
  callback: TraversalCallback
) => {
  const visited = new Set<number>();
  const queue: number[] = [startNodeId];

  await callback(startNodeId, `Starting BFS from node ${startNodeId}`);
  visited.add(startNodeId);
  // Added a consistent delay to slow down the visualization
  await new Promise(resolve => setTimeout(resolve, 1000));

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    await callback(nodeId, `Processing node ${nodeId}`);
    // Added a consistent delay to slow down the visualization
    await new Promise(resolve => setTimeout(resolve, 1000));

    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) continue;

    // Visit neighbors in order
    const sortedNeighbors = [...node.neighbors].sort((a, b) => a - b);
    for (const neighborId of sortedNeighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);
        await callback(neighborId, `Discovered node ${neighborId} from ${nodeId}`);
        // Added a smaller delay for discovered nodes
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
};
