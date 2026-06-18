import { SerializedItem } from "./SerializedItem.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";
import { BusinessStep } from "./BusinessStep.js";

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

interface TransformationEventBuilderInput {
  inputItems: SerializedItem[];
  outputItems: SerializedItem[];
  eventTime?: string;
}

interface TransactionEventBuilderInput {
  items: SerializedItem[];
  transactions: {
    type: string;
    id: string;
  }[];
  location?: string;
  eventTime?: string;
}

export function createReceivingEvent(
  input: ObjectEventBuilderInput
): ObjectEvent {
  return new ObjectEvent({
    action: "OBSERVE",
    bizStep: BusinessStep.Receiving,
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
    bizStep: BusinessStep.Shipping,
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
    bizStep: BusinessStep.Commissioning,
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
    bizStep: BusinessStep.Commissioning,
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
    bizStep: BusinessStep.Packing,
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
    bizStep: BusinessStep.Unpacking,
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
    bizStep: BusinessStep.Repacking,
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
    bizStep: BusinessStep.Inspecting,
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
    bizStep: BusinessStep.Sampling,
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
    bizStep: BusinessStep.Destroying,
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
    bizStep: BusinessStep.Returning,
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
    bizStep: BusinessStep.Recalling,
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
    bizStep: BusinessStep.Holding,
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
    bizStep: BusinessStep.Releasing,
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
    bizStep: BusinessStep.Inventorying,
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
    bizStep: BusinessStep.Adjusting,
    items: input.items,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createTransformationEvent(
  input: TransformationEventBuilderInput
): TransformationEvent {
  return new TransformationEvent({
    bizStep: BusinessStep.Transforming,
    inputItems: input.inputItems,
    outputItems: input.outputItems,
    eventTime: input.eventTime
  });
}

export function createShippingTransactionEvent(
  input: TransactionEventBuilderInput
): TransactionEvent {
  return new TransactionEvent({
    action: "OBSERVE",
    bizStep: BusinessStep.Shipping,
    disposition: "in_transit",
    items: input.items,
    transactions: input.transactions,
    location: input.location,
    eventTime: input.eventTime
  });
}

export function createReceivingTransactionEvent(
  input: TransactionEventBuilderInput
): TransactionEvent {
  return new TransactionEvent({
    action: "OBSERVE",
    bizStep: BusinessStep.Receiving,
    disposition: "in_progress",
    items: input.items,
    transactions: input.transactions,
    location: input.location,
    eventTime: input.eventTime
  });
}