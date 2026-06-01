export class EpcisDocument {
    header;
    schemaVersion;
    creationDate;
    events;
    constructor(input = {}) {
        this.header = input.header;
        this.events = input.events ?? [];
        this.schemaVersion = input.schemaVersion ?? "2.0";
        this.creationDate = input.creationDate ?? new Date().toISOString();
    }
    addEvent(event) {
        this.events.push(event);
    }
    object(input) {
        const event = {
            toJSON: () => ({
                eventType: "ObjectEvent",
                epcList: [input.epc]
            })
        };
        this.addEvent(event);
        return event;
    }
    aggregate(input) {
        const event = {
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
