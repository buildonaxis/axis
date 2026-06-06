import type { EpcisEvent } from "./EpcisBody.js";
import { TraceNode } from "./TraceNode.js";

export class Trace {
  readonly epc: string;
  readonly node: TraceNode;

  constructor(epc: string, events: EpcisEvent[]) {
    this.epc = epc;

    this.node = new TraceNode({
      epc,
      events: [...events].sort(
        (a, b) =>
          new Date(a.eventTime).getTime() -
          new Date(b.eventTime).getTime()
      )
    });
  }

  count(): number {
    return this.node.eventCount();
  }

  first(): EpcisEvent | undefined {
    return this.node.events[0];
  }

  latest(): EpcisEvent | undefined {
    return this.node.events[
      this.node.events.length - 1
    ];
  }

  timeline(): EpcisEvent[] {
    return [...this.node.events];
  }
}