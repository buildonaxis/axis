import { SerializedItem } from "./SerializedItem.js";

export class Aggregation {
  readonly parent: SerializedItem;
  readonly children: SerializedItem[];

  constructor(
    parent: SerializedItem,
    children: SerializedItem[]
  ) {
    this.parent = parent;
    this.children = children;
  }

  get childCount(): number {
    return this.children.length;
  }

  contains(epc: string): boolean {
    return this.children.some(
      child => child.toEpcUri() === epc
    );
  }

  addChild(item: SerializedItem): Aggregation {
    return new Aggregation(
      this.parent,
      [...this.children, item]
    );
  }

  removeChild(epc: string): Aggregation {
    return new Aggregation(
      this.parent,
      this.children.filter(
        child => child.toEpcUri() !== epc
      )
    );
  }

  toJSON() {
    return {
      parent: this.parent.toEpcUri(),
      children: this.children.map(
        child => child.toEpcUri()
      )
    };
  }
}