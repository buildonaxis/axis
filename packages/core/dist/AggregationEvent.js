export class AggregationEvent {
    eventType = "AggregationEvent";
    action;
    parent;
    children;
    bizStep;
    location;
    eventTime;
    constructor(input) {
        this.action = input.action;
        this.parent = input.parent;
        this.children = input.children;
        this.bizStep = input.bizStep;
        this.location = input.location;
        this.eventTime = input.eventTime ?? new Date().toISOString();
    }
    get parentId() {
        return this.parent.toEpcUri();
    }
    get childEpcs() {
        return this.children
            .map((child) => child.toEpcUri())
            .filter((epc) => Boolean(epc));
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
