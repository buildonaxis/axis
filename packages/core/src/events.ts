import { SerializedItem } from "./SerializedItem.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";

interface ObjectEventBuilderInput {
  items: SerializedItem[];
  location?: string;
  eventTime?: string;
}

interface AggregationEventBuilderInput {
  parent: SerializedItem;
  children: SerializedItem[];
  location?: string;
  eventTime?: string;
}

export function createReceivingEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "receiving",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createShippingEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "shipping",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createCommissioningEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "ADD",
    bizStep: "commissioning",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createDecommissioningEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "DELETE",
    bizStep: "decommissioning",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createPackingEvent(
  input: AggregationEventBuilderInput
): AggregationEvent {
  return new AggregationEvent({
    action: "ADD",
    bizStep: "packing",
    parent: input.parent,
    children: input.children,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createUnpackingEvent(
  input: AggregationEventBuilderInput
): AggregationEvent {
  return new AggregationEvent({
    action: "DELETE",
    bizStep: "unpacking",
    parent: input.parent,
    children: input.children,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createRepackingEvent(
  input: AggregationEventBuilderInput
): AggregationEvent {
  return new AggregationEvent({
    action: "OBSERVE",
    bizStep: "repacking",
    parent: input.parent,
    children: input.children,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createInspectionEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "inspecting",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createSamplingEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "sampling",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createDestructionEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "DELETE",
    bizStep: "destroying",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createReturnEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "returning",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createRecallEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "recalling",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createQualityHoldEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "holding",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createReleaseEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "releasing",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createInventoryCountEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "inventorying",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createInventoryAdjustmentEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: "adjusting",
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createTransformationEvent(input: {
  inputItems: SerializedItem[];
  outputItems: SerializedItem[];
  location?: string;
  eventTime?: string;
}): TransformationEvent {
  return new TransformationEvent({
    bizStep: "transforming",
    inputItems: input.inputItems,
    outputItems: input.outputItems,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createShippingTransactionEvent(input: {
  items: SerializedItem[];
  transactions: {
    type: string;
    id: string;
  }[];
  location?: string;
  eventTime?: string;
}): TransactionEvent {
  return new TransactionEvent({
    action: "OBSERVE",
    bizStep: "shipping",
    disposition: "in_transit",
    items: input.items,
    transactions: input.transactions,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createReceivingTransactionEvent(input: {
  items: SerializedItem[];
  transactions: {
    type: string;
    id: string;
  }[];
  location?: string;
  eventTime?: string;
}): TransactionEvent {
  return new TransactionEvent({
    action: "OBSERVE",
    bizStep: "receiving",
    disposition: "in_progress",
    items: input.items,
    transactions: input.transactions,
    location: input.location,
    eventTime: input.eventTime
  });
}