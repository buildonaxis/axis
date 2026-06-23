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
}