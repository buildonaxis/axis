import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";

export interface ObjectEventInput {
  action: "ADD" | "OBSERVE" | "DELETE";
  bizStep?: BusinessStep;
  disposition?: Disposition;
  location?: string;
  eventTime?: string;
  items: SerializedItem[];
}

export class ObjectEvent {
  readonly eventType = "ObjectEvent";

  readonly action: "ADD" | "OBSERVE" | "DELETE";
  readonly bizStep?: BusinessStep;
  readonly disposition?: Disposition;
  readonly location?: string;
  readonly eventTime: string;
  readonly items: SerializedItem[];

  constructor(input: ObjectEventInput) {
    this.action = input.action;
    this.bizStep = input.bizStep;
    this.disposition = input.disposition;
    this.location = input.location;
    this.items = input.items;
    this.eventTime = input.eventTime ?? new Date().toISOString();
  }

  get epcList(): string[] {
    return this.items
      .map((item) => item.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
  }

  static parse(input: unknown): ObjectEvent {
  if (
    typeof input !== "object" ||
    input === null
  ) {
    throw new Error("Invalid ObjectEvent");
  }

  const event = input as {
    action: "ADD" | "OBSERVE" | "DELETE";
    bizStep: BusinessStep;
    disposition?: Disposition;
    location?: string;
    eventTime?: string;
  };

  return new ObjectEvent({
    action: event.action,
    bizStep: event.bizStep,
    disposition: event.disposition,
    location: event.location,
    eventTime: event.eventTime,
    items: []
  });
}

  toJSON() {
    return {
      eventType: this.eventType,
      action: this.action,
      bizStep: this.bizStep,
      disposition: this.disposition,
      eventTime: this.eventTime,
      location: this.location,
      epcList: this.epcList
    };
  }
}