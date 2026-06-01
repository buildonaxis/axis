import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";
export interface TransformationEventInput {
    eventTime?: string;
    bizStep?: BusinessStep;
    disposition?: Disposition;
    inputItems: SerializedItem[];
    outputItems: SerializedItem[];
}
export declare class TransformationEvent {
    readonly eventType = "TransformationEvent";
    readonly eventTime: string;
    readonly bizStep?: BusinessStep;
    readonly disposition?: Disposition;
    readonly inputItems: SerializedItem[];
    readonly outputItems: SerializedItem[];
    constructor(input: TransformationEventInput);
    get inputEpcs(): string[];
    get outputEpcs(): string[];
    toJSON(): {
        eventType: string;
        eventTime: string;
        bizStep: BusinessStep | undefined;
        disposition: Disposition | undefined;
        inputEPCList: string[];
        outputEPCList: string[];
    };
}
