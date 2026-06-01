import { SerializedItem } from "./SerializedItem.js";
export type TraceAction = "ADD" | "OBSERVE" | "DELETE";
export interface TraceEventInput {
    action: TraceAction;
    bizStep?: string;
    disposition?: string;
    location?: string;
    items: SerializedItem[];
    eventTime?: string;
}
export declare class TraceEvent {
    readonly eventType = "ObjectEvent";
    readonly action: TraceAction;
    readonly bizStep?: string;
    readonly disposition?: string;
    readonly location?: string;
    readonly items: SerializedItem[];
    readonly eventTime: string;
    constructor(input: TraceEventInput);
    toJSON(): {
        eventType: string;
        action: TraceAction;
        bizStep: string | undefined;
        disposition: string | undefined;
        location: string | undefined;
        eventTime: string;
        epcList: string[];
    };
}
