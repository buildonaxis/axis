import { SerializedItem } from "./SerializedItem.js";
function itemFromEpcUri(epc) {
    const prefix = "urn:epc:id:sgtin:";
    const value = epc.startsWith(prefix)
        ? epc.slice(prefix.length)
        : epc;
    const [gtin, serial] = value.split(".");
    return new SerializedItem({
        raw: epc,
        identifierType: "serialized",
        gtin,
        serial
    });
}
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
    static parse(input) {
        if (typeof input !== "object" ||
            input === null) {
            throw new Error("Invalid AggregationEvent");
        }
        const event = input;
        const parentValue = event.parentId ?? event.parentID;
        if (!parentValue) {
            throw new Error("AggregationEvent requires parentId");
        }
        const childValues = event.childEpcs ?? event.childEPCs ?? [];
        return new AggregationEvent({
            action: event.action,
            parent: itemFromEpcUri(parentValue),
            children: childValues.map((epc) => itemFromEpcUri(epc)),
            bizStep: event.bizStep,
            location: event.location,
            eventTime: event.eventTime
        });
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
