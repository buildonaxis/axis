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
export declare function createReceivingEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createShippingEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createCommissioningEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createDecommissioningEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createPackingEvent(input: AggregationEventBuilderInput): AggregationEvent;
export declare function createUnpackingEvent(input: AggregationEventBuilderInput): AggregationEvent;
export declare function createRepackingEvent(input: AggregationEventBuilderInput): AggregationEvent;
export declare function createInspectionEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createSamplingEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createDestructionEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createReturnEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createRecallEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createQualityHoldEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createReleaseEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createInventoryCountEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createInventoryAdjustmentEvent(input: ObjectEventBuilderInput): ObjectEvent;
export declare function createTransformationEvent(input: TransformationEventBuilderInput): TransformationEvent;
export declare function createShippingTransactionEvent(input: TransactionEventBuilderInput): TransactionEvent;
export declare function createReceivingTransactionEvent(input: TransactionEventBuilderInput): TransactionEvent;
export {};
