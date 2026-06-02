import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";
export interface ObjectEventInput {
    action: "ADD" | "OBSERVE" | "DELETE";
    bizStep?: BusinessStep;
    disposition?: Disposition;
    location?: string;
    eventTime?: string;
    items: SerializedItem[];
}
export declare class ObjectEvent {
    readonly eventType = "ObjectEvent";
    readonly action: "ADD" | "OBSERVE" | "DELETE";
    readonly bizStep?: BusinessStep;
    readonly disposition?: Disposition;
    readonly location?: string;
    readonly eventTime: string;
    readonly items: SerializedItem[];
    constructor(input: ObjectEventInput);
    get epcList(): string[];
    static parse(input: unknown): ObjectEvent;
    toJSON(): {
        eventType: string;
        action: "ADD" | "OBSERVE" | "DELETE";
        bizStep: BusinessStep | undefined;
        disposition: Disposition | undefined;
        eventTime: string;
        location: string | undefined;
        epcList: string[];
    };
}
