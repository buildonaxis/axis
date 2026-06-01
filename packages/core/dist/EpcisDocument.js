export class EpcisDocument {
    events = [];
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
            events: this.events.map((event) => event.toJSON())
        };
    }
}
