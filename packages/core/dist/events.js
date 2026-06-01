import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
export function createReceivingEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: "receiving",
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createShippingEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: "shipping",
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createPackingEvent(input) {
    return new AggregationEvent({
        action: "ADD",
        bizStep: "packing",
        parent: input.parent,
        children: input.children,
        location: input.location,
        eventTime: input.eventTime
    });
}
