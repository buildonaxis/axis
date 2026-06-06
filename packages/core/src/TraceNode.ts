import type { EpcisEvent } from "./EpcisBody.js";

export class TraceNode {
  readonly epc: string;
  readonly events: EpcisEvent[];

  constructor(input: {
    epc: string;
    events?: EpcisEvent[];
  }) {
    this.epc = input.epc;
    this.events = input.events ?? [];
  }

  addEvent(event: EpcisEvent): TraceNode {
    return new TraceNode({
      epc: this.epc,
      events: [...this.events, event]
    });
  }

  eventCount(): number {
    return this.events.length;
  }
}