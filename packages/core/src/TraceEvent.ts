import { SerializedItem } from "./SerializedItem.js";

export type TraceAction = "ADD" | "OBSERVE" | "DELETE";

export interface TraceEventInput {
  action: TraceAction;
  bizStep?: string;
  disposition?: string;
  location?: string;
  items: SerializedItem[];
  eventTime?: string;
}

export class TraceEvent {
  readonly eventType = "ObjectEvent";
  readonly action: TraceAction;
  readonly bizStep?: string;
  readonly disposition?: string;
  readonly location?: string;
  readonly items: SerializedItem[];
  readonly eventTime: string;

  constructor(input: TraceEventInput) {
    this.action = input.action;
    this.bizStep = input.bizStep;
    this.disposition = input.disposition;
    this.location = input.location;
    this.items = input.items;
    this.eventTime = input.eventTime ?? new Date().toISOString();
  }

  toJSON() {
    return {
      eventType: this.eventType,
      action: this.action,
      bizStep: this.bizStep,
      disposition: this.disposition,
      location: this.location,
      eventTime: this.eventTime,
      epcList: this.items
        .map((item) => item.toEpcUri())
        .filter((epc): epc is string => Boolean(epc))
    };
  }
}