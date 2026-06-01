import { SerializedItem } from "./SerializedItem.js";

export interface AggregationEventInput {
  action: "ADD" | "OBSERVE" | "DELETE";
  parent: SerializedItem;
  children: SerializedItem[];
  bizStep: string;
  location?: string;
  eventTime?: string;
}

export class AggregationEvent {
  readonly eventType = "AggregationEvent";
  readonly action: "ADD" | "OBSERVE" | "DELETE";
  readonly parent: SerializedItem;
  readonly children: SerializedItem[];
  readonly bizStep: string;
  readonly location?: string;
  readonly eventTime: string;

  constructor(input: AggregationEventInput) {
    this.action = input.action;
    this.parent = input.parent;
    this.children = input.children;
    this.bizStep = input.bizStep;
    this.location = input.location;
    this.eventTime = input.eventTime ?? new Date().toISOString();
  }

  get parentId(): string | undefined {
    return this.parent.toEpcUri();
  }

  get childEpcs(): string[] {
    return this.children
      .map((child) => child.toEpcUri())
      .filter((epc): epc is string => Boolean(epc));
  }

  toJSON() {
    return {
      eventType: this.eventType,
      action: this.action,
      parentId: this.parentId,
      childEpcs: this.childEpcs,
      bizStep: this.bizStep,
      location: this.location,
      eventTime: this.eventTime
    };
  }
}