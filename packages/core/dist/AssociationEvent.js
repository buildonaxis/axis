export class AssociationEvent {
    eventType = "AssociationEvent";
    action;
    parent;
    children;
    bizStep;
    disposition;
    location;
    eventTime;
    constructor(input) {
        this.action = input.action;
        this.parent = input.parent;
        this.children = input.children;
        this.bizStep = input.bizStep;
        this.disposition = input.disposition;
        this.location = input.location;
        this.eventTime = input.eventTime ?? new Date().toISOString();
    }
    get parentId() {
        return this.parent.toEpcUri();
    }
    get childEpcs() {
        return this.children
            .map((child) => child.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    toJSON() {
        return {
            eventType: this.eventType,
            action: this.action,
            parentId: this.parentId,
            childEpcs: this.childEpcs,
            bizStep: this.bizStep,
            disposition: this.disposition,
            location: this.location,
            eventTime: this.eventTime
        };
    }
}
