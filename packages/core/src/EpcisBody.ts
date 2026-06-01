import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { AssociationEvent } from "./AssociationEvent.js";

export type EpcisEvent =
  | ObjectEvent
  | AggregationEvent
  | TransactionEvent
  | TransformationEvent
  | AssociationEvent;

export interface EpcisBodyInput {
  events?: EpcisEvent[];
}

export class EpcisBody {
  readonly events: EpcisEvent[];

  constructor(input: EpcisBodyInput = {}) {
    this.events = input.events ?? [];
  }

  addEvent(event: EpcisEvent): EpcisBody {
    return new EpcisBody({
      events: [...this.events, event]
    });
  }

  toJSON() {
    return {
      eventList: this.events.map((event) => event.toJSON())
    };
  }
}