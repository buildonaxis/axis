import { SerializedItem } from "./SerializedItem.js";
export interface AggregationEventInput {
    action: "ADD" | "OBSERVE" | "DELETE";
    parent: SerializedItem;
    children: SerializedItem[];
    bizStep?: string;
    location?: string;
    eventTime?: string;
}
export declare class AggregationEvent {
    readonly eventType = "AggregationEvent";
    readonly action: "ADD" | "OBSERVE" | "DELETE";
    readonly parent: SerializedItem;
    readonly children: SerializedItem[];
    readonly bizStep?: string;
    readonly location?: string;
    readonly eventTime: string;
    constructor(input: AggregationEventInput);
    get parentId(): string | undefined;
    get childEpcs(): string[];
    static parse(input: unknown): AggregationEvent;
    toJSON(): {
        eventType: string;
        action: "ADD" | "OBSERVE" | "DELETE";
        parentId: string | undefined;
        childEpcs: string[];
        bizStep: string | undefined;
        location: string | undefined;
        eventTime: string;
    };
}
