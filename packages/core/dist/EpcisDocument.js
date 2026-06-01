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
    toJSON() {
        return {
            events: this.events.map((event) => event.toJSON())
        };
    }
}
