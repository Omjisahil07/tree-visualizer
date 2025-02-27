
export interface SinglyNode<T> {
  value: T;
  next: SinglyNode<T> | null;
}

export interface DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null;
  prev: DoublyNode<T> | null;
}

export interface CircularNode<T> {
  value: T;
  next: CircularNode<T> | null;
}

export interface DoubleCircularNode<T> {
  value: T;
  next: DoubleCircularNode<T> | null;
  prev: DoubleCircularNode<T> | null;
}

export interface LinkedListOperation {
  name: string;
  description: string;
  route: string;
  image: string;
}

export interface Step {
  description: string;
  nodeIndices: number[];
}

export interface LinkedListState<T> {
  nodes: T[];
  steps: Step[];
  currentStep: number;
  isPlaying: boolean;
}
