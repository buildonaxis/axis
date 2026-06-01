import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";
export interface AssociationEventInput {
    action: "ADD" | "OBSERVE" | "DELETE";
    parent: SerializedItem;
    children: SerializedItem[];
    bizStep?: BusinessStep;
    disposition?: Disposition;
    location?: string;
    eventTime?: string;
}
export declare class AssociationEvent {
    readonly eventType = "AssociationEvent";
    readonly action: "ADD" | "OBSERVE" | "DELETE";
    readonly parent: SerializedItem;
    readonly children: SerializedItem[];
    readonly bizStep?: BusinessStep;
    readonly disposition?: Disposition;
    readonly location?: string;
    readonly eventTime: string;
    constructor(input: AssociationEventInput);
    get parentId(): string | undefined;
    get childEpcs(): string[];
    toJSON(): {
        eventType: string;
        action: "ADD" | "OBSERVE" | "DELETE";
        parentId: string | undefined;
        childEpcs: string[];
        bizStep: BusinessStep | undefined;
        disposition: Disposition | undefined;
        location: string | undefined;
        eventTime: string;
    };
}
