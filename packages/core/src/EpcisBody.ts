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

  static parse(input: unknown): EpcisBody {
    if (
      typeof input !== "object" ||
      input === null
    ) {
      throw new Error("Invalid EPCIS body");
    }

    const body = input as {
  eventList?: Array<Record<string, unknown>>;
};

const events = (body.eventList ?? []).map((event) => {
  if (event.eventType === "ObjectEvent") {
    return ObjectEvent.parse(event);
  }

  if (event.eventType === "AggregationEvent") {
    return AggregationEvent.parse(event);
  }

  if (event.eventType === "TransactionEvent") {
    return TransactionEvent.parse(event);
  }

  if (event.eventType === "TransformationEvent") {
  return TransformationEvent.parse(event);
  }

  throw new Error(
    `Unsupported event type: ${String(event.eventType)}`
  );
});

return new EpcisBody({
  events
});
  }
}