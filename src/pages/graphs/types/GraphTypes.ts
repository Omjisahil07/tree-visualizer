
export interface GraphNode {
  id: number;
  value: number;
  neighbors: number[];
  x?: number;
  y?: number;
  fx?: number;  // Add fixed x position
  fy?: number;  // Add fixed y position
  visited?: boolean;
}

export interface Graph {
  nodes: GraphNode[];
  edges: [number, number][];
}

export type TraversalType = 'dfs' | 'bfs';
export type TraversalCallback = (nodeId: number, step: string) => Promise<void>;
