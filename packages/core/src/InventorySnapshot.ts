import { AggregationEvent } from "./AggregationEvent";
import { EpcisDocument } from "./EpcisDocument";

export interface AggregationRelationship {
  parentEpc: string;
  childEpcs: string[];
}
export interface InventoryLocation {
  epc: string;
  parentEpc?: string;
  rootContainerEpc?: string;
  pathToRoot: string[];
}

export interface InventoryTreeNode {
  epc: string;
  children: InventoryTreeNode[];
}

export interface InventoryRecord {
  epc: string;
  parentEpc?: string;
  rootContainerEpc?: string;
  childEpcs: string[];
  pathToRoot: string[];
  isContainer: boolean;
}

export interface ContainerView {
  epc: string;
  directChildren: string[];
  allContents: string[];
  itemCount: number;
}

export interface InventoryStats {
  totalEpcs: number;
  containers: number;
  items: number;
  leafItems: number;
  rootContainers: number;
}

export interface InventoryDeltaMove {
  epc: string;
  from?: string;
  to?: string;
}

export interface InventoryDelta {
  added: string[];
  removed: string[];
  moved: InventoryDeltaMove[];
}

export interface InventoryRow {
  epc: string;
  parentEpc?: string;
  rootContainerEpc?: string;
  childEpcs: string[];
  childCount: number;
  isContainer: boolean;
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

  find(epc: string): InventoryRecord | undefined {
  if (!this.all().includes(epc)) {
    return undefined;
  }

  return {
    epc,
    parentEpc: this.parentOf(epc),
    rootContainerEpc: this.rootContainerOf(epc),
    childEpcs: this.childrenOf(epc),
    pathToRoot: this.pathToRoot(epc),
    isContainer: this.isContainer(epc),
  };
  }

  container(epc: string): ContainerView | undefined {
  if (!this.isContainer(epc)) {
    return undefined;
  }

  const directChildren = this.childrenOf(epc);
  const allContents = this.contentsOf(epc);

  return {
    epc,
    directChildren,
    allContents,
    itemCount: allContents.length,
  };
}

  containers(): string[] {
  return [...this.childMap.keys()];
}

items(): string[] {
  const items: string[] = [];

  for (const epc of this.parentMap.keys()) {
    if (!this.isContainer(epc)) {
      items.push(epc);
    }
  }

  return items;
}

roots(): string[] {
  const roots: string[] = [];

  for (const container of this.containers()) {
    if (!this.parentOf(container)) {
      roots.push(container);
    }
  }

  return roots;
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

  locate(epc: string): InventoryLocation {
  return {
    epc,
    parentEpc: this.parentOf(epc),
    rootContainerEpc: this.rootContainerOf(epc),
    pathToRoot: this.pathToRoot(epc),
  };
  }

  subtree(epc: string): InventoryTreeNode {
    return {
      epc,
      children: this.childrenOf(epc).map((childEpc) =>
        this.subtree(childEpc)
      ),
    };
  }

  toTree(): InventoryTreeNode[] {
    return this.containers()
      .filter((epc) => !this.parentOf(epc))
      .map((epc) => this.subtree(epc));
  }

  leafItems(): string[] {
  const leaves: string[] = [];

  for (const epc of this.parentMap.keys()) {
    if (!this.isContainer(epc)) {
      leaves.push(epc);
    }
  }

  return leaves;
}


stats(): InventoryStats {
  return {
    totalEpcs: this.count(),
    containers: this.countContainers(),
    items: this.countItems(),
    leafItems: this.leafItems().length,
    rootContainers: this.roots().length,
  };
}

diff(previous: InventorySnapshot): InventoryDelta {
  const currentEpcs = new Set(this.all());
  const previousEpcs = new Set(previous.all());

  const added = [...currentEpcs].filter((epc) => !previousEpcs.has(epc));
  const removed = [...previousEpcs].filter((epc) => !currentEpcs.has(epc));

  const moved: InventoryDeltaMove[] = [];

  for (const epc of currentEpcs) {
    if (!previousEpcs.has(epc)) continue;

    const from = previous.parentOf(epc);
    const to = this.parentOf(epc);

    if (from !== to) {
      moved.push({ epc, from, to });
    }
  }

  return {
    added,
    removed,
    moved,
  };
}

toRelationships(): AggregationRelationship[] {
  return this.containers().map((parentEpc) => ({
    parentEpc,
    childEpcs: this.childrenOf(parentEpc),
  }));
}

toRows(): InventoryRow[] {
  return this.all().map((epc) => ({
    epc,
    parentEpc: this.parentOf(epc),
    rootContainerEpc: this.rootContainerOf(epc),
    childEpcs: this.childrenOf(epc),
    childCount: this.childrenOf(epc).length,
    isContainer: this.isContainer(epc),
  }));
}

toHierarchy(): InventoryTreeNode[] {
  return this.toTree();
}

}


