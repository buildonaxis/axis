export class TraceEvent {
    eventType = "ObjectEvent";
    action;
    bizStep;
    disposition;
    location;
    items;
    eventTime;
    constructor(input) {
        this.action = input.action;
        this.bizStep = input.bizStep;
        this.disposition = input.disposition;
        this.location = input.location;
        this.items = input.items;
        this.eventTime = input.eventTime ?? new Date().toISOString();
    }
    toJSON() {
        return {
            eventType: this.eventType,
            action: this.action,
            bizStep: this.bizStep,
            disposition: this.disposition,
            location: this.location,
            eventTime: this.eventTime,
            epcList: this.items
                .map((item) => item.toEpcUri())
                .filter((epc) => Boolean(epc))
        };
    }
}
