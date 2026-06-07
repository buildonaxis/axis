import type { EpcisEvent } from "./EpcisBody.js";

export class TraceNode {
  readonly epc: string;
  readonly events: EpcisEvent[];

  readonly parents: TraceNode[];
  readonly children: TraceNode[];

  constructor(input: {
    epc: string;
    events?: EpcisEvent[];
    parents?: TraceNode[];
    children?: TraceNode[];
  }) {
    this.epc = input.epc;
    this.events = input.events ?? [];
    this.parents = input.parents ?? [];
    this.children = input.children ?? [];
  }

  addEvent(event: EpcisEvent): TraceNode {
    return new TraceNode({
      epc: this.epc,
      events: [...this.events, event],
      parents: this.parents,
      children: this.children
    });
  }

  eventCount(): number {
    return this.events.length;
  }

  parentCount(): number {
    return this.parents.length;
  }

  childCount(): number {
    return this.children.length;
  }

  ancestors(): TraceNode[] {
    const ancestors: TraceNode[] = [];
    const visited = new Set<string>();

    const visit = (node: TraceNode): void => {
      for (const parent of node.parents) {
        if (visited.has(parent.epc)) {
          continue;
        }

        visited.add(parent.epc);
        ancestors.push(parent);
        visit(parent);
      }
    };

    visit(this);

    return ancestors;
  }

  descendants(): TraceNode[] {
    const descendants: TraceNode[] = [];
    const visited = new Set<string>();

    const visit = (node: TraceNode): void => {
      for (const child of node.children) {
        if (visited.has(child.epc)) {
          continue;
        }

        visited.add(child.epc);
        descendants.push(child);
        visit(child);
      }
    };

    visit(this);

    return descendants;
  }
}