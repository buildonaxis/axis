export interface AggregationRelationship {
  parentEpc: string;
  childEpcs: string[];
}

export class InventorySnapshot {
  private readonly parentMap = new Map<string, string>();
  private readonly childMap = new Map<string, string[]>();

  private constructor() {}

  static fromRelationships(
    relationships: AggregationRelationship[]
  ): InventorySnapshot {
    const snapshot = new InventorySnapshot();

    for (const relationship of relationships) {
      snapshot.childMap.set(
        relationship.parentEpc,
        relationship.childEpcs
      );

      for (const childEpc of relationship.childEpcs) {
        snapshot.parentMap.set(
          childEpc,
          relationship.parentEpc
        );
      }
    }

    return snapshot;
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

}