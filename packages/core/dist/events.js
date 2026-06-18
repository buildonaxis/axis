import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";
import { BusinessStep } from "./BusinessStep.js";
export function createReceivingEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Receiving,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createShippingEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Shipping,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createCommissioningEvent(input) {
    return new ObjectEvent({
        action: "ADD",
        bizStep: BusinessStep.Commissioning,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createDecommissioningEvent(input) {
    return new ObjectEvent({
        action: "DELETE",
        bizStep: BusinessStep.Commissioning,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createPackingEvent(input) {
    return new AggregationEvent({
        action: "ADD",
        bizStep: BusinessStep.Packing,
        parent: input.parent,
        children: input.children,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createUnpackingEvent(input) {
    return new AggregationEvent({
        action: "DELETE",
        bizStep: BusinessStep.Unpacking,
        parent: input.parent,
        children: input.children,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createRepackingEvent(input) {
    return new AggregationEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Repacking,
        parent: input.parent,
        children: input.children,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createInspectionEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Inspecting,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createSamplingEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Sampling,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createDestructionEvent(input) {
    return new ObjectEvent({
        action: "DELETE",
        bizStep: BusinessStep.Destroying,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createReturnEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Returning,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createRecallEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Recalling,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createQualityHoldEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Holding,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createReleaseEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Releasing,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createInventoryCountEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Inventorying,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createInventoryAdjustmentEvent(input) {
    return new ObjectEvent({
        action: "OBSERVE",
        bizStep: BusinessStep.Adjusting,
        items: input.items,
        location: input.location,
        eventTime: input.eventTime
    });
}
export function createTransformationEvent(input) {
    return new TransformationEvent({
        bizStep: BusinessStep.Transforming,
        inputItems: input.inputItems,
        outputItems: input.outputItems,
        eventTime: input.eventTime
    });
}
export function createShippingTransactionEvent(input) {
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
export function createReceivingTransactionEvent(input) {
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
