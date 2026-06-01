export type EpcisDocumentEvent = {
  toJSON: () => unknown;
};

export class EpcisDocument {
  events: EpcisDocumentEvent[] = [];

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
      events: this.events.map((event) => event.toJSON())
    };
  }
}