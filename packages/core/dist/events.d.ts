import { SerializedItem } from "./SerializedItem.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
export declare function createReceivingEvent(input: {
    items: SerializedItem[];
    location?: string;
    eventTime?: string;
}): ObjectEvent;
export declare function createShippingEvent(input: {
    items: SerializedItem[];
    location?: string;
    eventTime?: string;
}): ObjectEvent;
export declare function createPackingEvent(input: {
    parent: SerializedItem;
    children: SerializedItem[];
    location?: string;
    eventTime?: string;
}): AggregationEvent;
