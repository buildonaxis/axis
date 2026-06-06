import type { EpcisEvent } from "./EpcisBody.js";

export class TraceNode {
  readonly epc: string;
  readonly events: EpcisEvent[];

  parent?: TraceNode;
  readonly children: TraceNode[];

  constructor(input: {
    epc: string;
    events?: EpcisEvent[];
    parent?: TraceNode;
    children?: TraceNode[];
  }) {
    this.epc = input.epc;
    this.events = input.events ?? [];
    this.parent = input.parent;
    this.children = input.children ?? [];
  }

  addEvent(event: EpcisEvent): TraceNode {
    return new TraceNode({
      epc: this.epc,
      events: [...this.events, event],
      parent: this.parent,
      children: this.children
    });
  }

  eventCount(): number {
    return this.events.length;
  }

  childCount(): number {
    return this.children.length;
  }
}