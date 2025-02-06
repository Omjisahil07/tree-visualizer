/**
 * Queue implementation for level-order traversal
 */
export class Queue<T> {
  private items: T[] = [];
  
  /**
   * Add an item to the end of the queue
   */
  enqueue(item: T) {
    this.items.push(item);
  }
  
  /**
   * Remove and return the first item in the queue
   */
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  /**
   * Get the current length of the queue
   */
  get length(): number {
    return this.items.length;
  }
}