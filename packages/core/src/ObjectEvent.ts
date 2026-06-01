import { SerializedItem } from "./SerializedItem.js";

export interface ObjectEventInput {
  action: "ADD" | "OBSERVE" | "DELETE";
  bizStep: string;
  location?: string;
  eventTime?: string;
  items: SerializedItem[];
}

export class ObjectEvent {
  readonly eventType = "ObjectEvent";

  readonly action: string;
  readonly bizStep: string;
  readonly location?: string;
  readonly eventTime: string;
  readonly items: SerializedItem[];

  constructor(input: ObjectEventInput) {
    this.action = input.action;
    this.bizStep = input.bizStep;
    this.location = input.location;
    this.items = input.items;
    this.eventTime =
      input.eventTime ??
      new Date().toISOString();
  }

  get epcList(): string[] {
    return this.items
      .map(item => item.toEpcUri())
      .filter(
        (epc): epc is string =>
          epc !== undefined
      );
  }

  toJSON() {
    return {
      eventType: this.eventType,
      action: this.action,
      bizStep: this.bizStep,
      eventTime: this.eventTime,
      location: this.location,
      epcList: this.epcList
    };
  }
}