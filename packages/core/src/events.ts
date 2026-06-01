import { SerializedItem } from "./SerializedItem.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";

export function createReceivingEvent(input: {
  items: SerializedItem[];
  location?: string;
  eventTime?: string;
}) {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "receiving",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createShippingEvent(input: {
  items: SerializedItem[];
  location?: string;
  eventTime?: string;
}) {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "shipping",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createPackingEvent(input: {
  parent: SerializedItem;
  children: SerializedItem[];
  location?: string;
  eventTime?: string;
}) {
  return new AggregationEvent({
    action: "ADD",
    bizStep: "packing",
    parent: input.parent,
    children: input.children,
    location: input.location,
    eventTime: input.eventTime
  });
}