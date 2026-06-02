import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { AssociationEvent } from "./AssociationEvent.js";
export type EpcisEvent = ObjectEvent | AggregationEvent | TransactionEvent | TransformationEvent | AssociationEvent;
export interface EpcisBodyInput {
    events?: EpcisEvent[];
}
export declare class EpcisBody {
    readonly events: EpcisEvent[];
    constructor(input?: EpcisBodyInput);
    addEvent(event: EpcisEvent): EpcisBody;
    toJSON(): {
        eventList: ({
            eventType: string;
            action: "ADD" | "OBSERVE" | "DELETE";
            parentId: string | undefined;
            childEpcs: string[];
            bizStep: string | undefined;
            location: string | undefined;
            eventTime: string;
        } | {
            eventType: string;
            action: "ADD" | "OBSERVE" | "DELETE";
            bizStep: import("./BusinessStep.js").BusinessStep | undefined;
            disposition: import("./Disposition.js").Disposition | undefined;
            eventTime: string;
            location: string | undefined;
            epcList: string[];
        } | {
            eventType: string;
            eventTime: string;
            bizStep: import("./BusinessStep.js").BusinessStep | undefined;
            disposition: import("./Disposition.js").Disposition | undefined;
            inputEPCList: string[];
            outputEPCList: string[];
        })[];
    };
    static parse(input: unknown): EpcisBody;
}
