
export interface GraphNode {
  id: number;
  value: number;
  neighbors: number[];
  x?: number;
  y?: number;
  visited?: boolean;
}

export interface Graph {
  nodes: GraphNode[];
  edges: [number, number][];
}

export type TraversalType = 'dfs' | 'bfs';
export type TraversalCallback = (nodeId: number, step: string, line: number) => Promise<void>;

