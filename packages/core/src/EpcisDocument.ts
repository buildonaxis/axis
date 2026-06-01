import { EpcisHeader } from "./EpcisHeader.js";

export type EpcisDocumentEvent = {
  toJSON: () => unknown;
};

export interface EpcisDocumentInput {
  header?: EpcisHeader;
  events?: EpcisDocumentEvent[];
  schemaVersion?: string;
  creationDate?: string;
}

export class EpcisDocument {
  readonly header?: EpcisHeader;
  readonly schemaVersion: string;
  readonly creationDate: string;
  events: EpcisDocumentEvent[];

  constructor(input: EpcisDocumentInput = {}) {
    this.header = input.header;
    this.events = input.events ?? [];
    this.schemaVersion = input.schemaVersion ?? "2.0";
    this.creationDate = input.creationDate ?? new Date().toISOString();
  }

  addEvent(event: EpcisDocumentEvent): void {
    this.events.push(event);
  }

  object(input: { epc: string }) {
    const event: EpcisDocumentEvent = {
      toJSON: () => ({
        eventType: "ObjectEvent",
        epcList: [input.epc]
      })
    };

    this.addEvent(event);

    return event;
  }

  aggregate(input: {
    parent: string;
    children: string[];
  }) {
    const event: EpcisDocumentEvent = {
      toJSON: () => ({
        eventType: "AggregationEvent",
        parentID: input.parent,
        childEPCs: input.children
      })
    };

    this.addEvent(event);

    return event;
  }

  toJSON() {
    return {
      type: "EPCISDocument",
      schemaVersion: this.schemaVersion,
      creationDate: this.creationDate,
      epcisHeader: this.header?.toJSON(),
      epcisBody: {
        eventList: this.events.map((event) => event.toJSON())
      }
    };
  }
}