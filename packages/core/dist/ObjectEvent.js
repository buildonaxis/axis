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
