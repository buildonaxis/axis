import { SerializedItem } from "./SerializedItem.js";

function itemFromEpcUri(epc: string): SerializedItem {
  const prefix = "urn:epc:id:sgtin:";
  const value = epc.startsWith(prefix)
    ? epc.slice(prefix.length)
    : epc;

  const [gtin, serial] = value.split(".");

  return new SerializedItem({
    raw: epc,
    identifierType: "serialized",
    gtin,
    serial
  });
}

export interface AggregationEventInput {
  action: "ADD" | "OBSERVE" | "DELETE";
  parent: SerializedItem;
  children: SerializedItem[];
  bizStep?: string;
  location?: string;
  eventTime?: string;
}

export class AggregationEvent {
  readonly eventType = "AggregationEvent";
  readonly action: "ADD" | "OBSERVE" | "DELETE";
  readonly parent: SerializedItem;
  readonly children: SerializedItem[];
  readonly bizStep?: string;
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

  static parse(input: unknown): AggregationEvent {
    if (
      typeof input !== "object" ||
      input === null
    ) {
      throw new Error("Invalid AggregationEvent");
    }

    const event = input as {
      action: "ADD" | "OBSERVE" | "DELETE";
      parentId?: string;
      parentID?: string;
      childEpcs?: string[];
      childEPCs?: string[];
      bizStep?: string;
      location?: string;
      eventTime?: string;
    };

    const parentValue = event.parentId ?? event.parentID;

    if (!parentValue) {
      throw new Error("AggregationEvent requires parentId");
    }

    const childValues =
      event.childEpcs ?? event.childEPCs ?? [];

    return new AggregationEvent({
      action: event.action,
      parent: itemFromEpcUri(parentValue),
      children: childValues.map((epc) =>
        itemFromEpcUri(epc)
      ),
      bizStep: event.bizStep,
      location: event.location,
      eventTime: event.eventTime
    });
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