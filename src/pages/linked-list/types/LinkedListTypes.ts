
export interface SinglyNode<T> {
  value: T;
  next: SinglyNode<T> | null;
}

export interface DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null;
  prev: DoublyNode<T> | null;
}

export interface LinkedListOperation {
  name: string;
  description: string;
  route: string;
  image: string;
}
