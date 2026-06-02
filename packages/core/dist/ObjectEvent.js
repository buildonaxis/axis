export class ObjectEvent {
    eventType = "ObjectEvent";
    action;
    bizStep;
    disposition;
    location;
    eventTime;
    items;
    constructor(input) {
        this.action = input.action;
        this.bizStep = input.bizStep;
        this.disposition = input.disposition;
        this.location = input.location;
        this.items = input.items;
        this.eventTime = input.eventTime ?? new Date().toISOString();
    }
    get epcList() {
        return this.items
            .map((item) => item.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    static parse(input) {
        if (typeof input !== "object" ||
            input === null) {
            throw new Error("Invalid ObjectEvent");
        }
        const event = input;
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
