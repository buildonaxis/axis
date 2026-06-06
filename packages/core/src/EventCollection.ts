import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";
import type { EpcisEvent } from "./EpcisBody.js";
import { extractEpcs } from "./extractEpcs.js";

export type EpcisEventType = EpcisEvent["eventType"];
export type EpcisEventAction = "ADD" | "OBSERVE" | "DELETE";

function hasField<K extends string>(
  event: EpcisEvent,
  field: K
): event is EpcisEvent & Record<K, unknown> {
  return field in event;
}

export class EventCollection {
  readonly events: EpcisEvent[];

  constructor(events: EpcisEvent[] = []) {
    this.events = [...events];
  }

  all(): EpcisEvent[] {
    return [...this.events];
  }

  toArray(): EpcisEvent[] {
    return this.all();
  }

  count(): number {
    return this.events.length;
  }

  first(): EpcisEvent | undefined {
    return this.events[0];
  }

  whereEventType(eventType: EpcisEventType): EventCollection {
    return new EventCollection(
      this.events.filter((event) => event.eventType === eventType)
    );
  }

  whereBizStep(bizStep: BusinessStep): EventCollection {
    return new EventCollection(
      this.events.filter(
        (event) =>
          hasField(event, "bizStep") &&
          event.bizStep === bizStep
      )
    );
  }

  whereDisposition(disposition: Disposition): EventCollection {
    return new EventCollection(
      this.events.filter(
        (event) =>
          hasField(event, "disposition") &&
          event.disposition === disposition
      )
    );
  }

  whereAction(action: EpcisEventAction): EventCollection {
    return new EventCollection(
      this.events.filter(
        (event) =>
          hasField(event, "action") &&
          event.action === action
      )
    );
  }

  whereLocation(location: string): EventCollection {
    return new EventCollection(
      this.events.filter(
        (event) =>
          hasField(event, "location") &&
          event.location === location
      )
    );
  }

  whereEpc(epc: string): EventCollection {
    return new EventCollection(
      this.events.filter((event) =>
        extractEpcs(event).includes(epc)
      )
    );
  }

  between(start: Date | string, end: Date | string): EventCollection {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return new EventCollection(
      this.events.filter((event) => {
        const eventTime = new Date(event.eventTime).getTime();

        return eventTime >= startTime && eventTime <= endTime;
      })
    );
  }
}