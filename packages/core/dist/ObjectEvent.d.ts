import { SerializedItem } from "./SerializedItem.js";
export interface ObjectEventInput {
    action: "ADD" | "OBSERVE" | "DELETE";
    bizStep: string;
    location?: string;
    eventTime?: string;
    items: SerializedItem[];
}
export declare class ObjectEvent {
    readonly eventType = "ObjectEvent";
    readonly action: string;
    readonly bizStep: string;
    readonly location?: string;
    readonly eventTime: string;
    readonly items: SerializedItem[];
    constructor(input: ObjectEventInput);
    get epcList(): string[];
    toJSON(): {
        eventType: string;
        action: string;
        bizStep: string;
        eventTime: string;
        location: string | undefined;
        epcList: string[];
    };
}
