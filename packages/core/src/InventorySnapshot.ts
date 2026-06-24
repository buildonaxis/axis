import { AggregationEvent } from "./AggregationEvent";
import { EpcisDocument } from "./EpcisDocument";

export interface AggregationRelationship {
  parentEpc: string;
  childEpcs: string[];
}

export class InventorySnapshot {
  private readonly parentMap = new Map<string, string>();
  private readonly childMap = new Map<string, string[]>();

  private constructor() {}

  static from(document: EpcisDocument): InventorySnapshot {
    const snapshot = new InventorySnapshot();

    for (const event of document.body.events) {
      if (!(event instanceof AggregationEvent)) {
        continue;
      }

      const parentEpc = event.parentId;
      const childEpcs = event.childEpcs;

      if (!parentEpc || childEpcs.length === 0) {
        continue;
      }

      if (event.action === "ADD" || event.action === "OBSERVE") {
        snapshot.addRelationship(parentEpc, childEpcs);
      }

      if (event.action === "DELETE") {
        snapshot.removeRelationship(parentEpc, childEpcs);
      }
    }

    return snapshot;
  }

  static fromRelationships(
    relationships: AggregationRelationship[]
  ): InventorySnapshot {
    const snapshot = new InventorySnapshot();

    for (const relationship of relationships) {
      snapshot.addRelationship(relationship.parentEpc, relationship.childEpcs);
    }

    return snapshot;
  }

  private addRelationship(parentEpc: string, childEpcs: string[]): void {
    const existingChildren = this.childMap.get(parentEpc) ?? [];

    for (const childEpc of childEpcs) {
      this.parentMap.set(childEpc, parentEpc);

      if (!existingChildren.includes(childEpc)) {
        existingChildren.push(childEpc);
      }
    }

    this.childMap.set(parentEpc, existingChildren);
  }

  private removeRelationship(parentEpc: string, childEpcs: string[]): void {
    const existingChildren = this.childMap.get(parentEpc) ?? [];

    const remainingChildren = existingChildren.filter(
      (childEpc) => !childEpcs.includes(childEpc)
    );

    if (remainingChildren.length > 0) {
      this.childMap.set(parentEpc, remainingChildren);
    } else {
      this.childMap.delete(parentEpc);
    }

    for (const childEpc of childEpcs) {
      if (this.parentMap.get(childEpc) === parentEpc) {
        this.parentMap.delete(childEpc);
      }
    }
  }

  parentOf(epc: string): string | undefined {
    return this.parentMap.get(epc);
  }

  childrenOf(epc: string): string[] {
    return this.childMap.get(epc) ?? [];
  }

  contentsOf(epc: string): string[] {
    const children = this.childrenOf(epc);
    const contents: string[] = [];

    for (const child of children) {
      contents.push(child);
      contents.push(...this.contentsOf(child));
    }

    return contents;
  }

  contains(parentEpc: string, childEpc: string): boolean {
    return this.contentsOf(parentEpc).includes(childEpc);
  }

  rootContainerOf(epc: string): string | undefined {
    let current = epc;
    let parent = this.parentOf(current);

    while (parent) {
      current = parent;
      parent = this.parentOf(current);
    }

    return current === epc ? undefined : current;
  }

  pathToRoot(epc: string): string[] {
    const path: string[] = [];

    let current = epc;
    let parent = this.parentOf(current);

    while (parent) {
      path.push(parent);
      current = parent;
      parent = this.parentOf(current);
    }

    return path;
  }

  isContainer(epc: string): boolean {
    return this.childrenOf(epc).length > 0;
  }

  all(): string[] {
  const epcs = new Set<string>();

  for (const parentEpc of this.childMap.keys()) {
    epcs.add(parentEpc);
  }

  for (const childEpc of this.parentMap.keys()) {
    epcs.add(childEpc);
  }

  return [...epcs];
  }

  items(): string[] {
    return this.all().filter((epc) => !this.isContainer(epc));
  }

  containers(): string[] {
    return this.all().filter((epc) => this.isContainer(epc));
  }

  looseItems(): string[] {
    return this.items().filter((epc) => !this.parentOf(epc));
  }

  count(): number {
    return this.all().length;
  }

  countItems(): number {
    return this.items().length;
  }

  countContainers(): number {
    return this.containers().length;
  }
}