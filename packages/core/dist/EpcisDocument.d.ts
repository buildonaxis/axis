import { EpcisHeader } from "./EpcisHeader.js";
import { EpcisBody } from "./EpcisBody.js";
import { EventCollection } from "./EventCollection.js";
import { Trace } from "./Trace.js";
import { EpcCollection } from "./EpcCollection.js";
import { TraceGraph } from "./TraceGraph.js";
export interface EpcisDocumentInput {
    header?: EpcisHeader;
    body?: EpcisBody;
    schemaVersion?: string;
    creationDate?: string;
}
export declare class EpcisDocument {
    readonly header?: EpcisHeader;
    readonly body: EpcisBody;
    readonly schemaVersion: string;
    readonly creationDate: string;
    constructor(input?: EpcisDocumentInput);
    events(): EventCollection;
    eventsByBizStep(bizStep: string): import("./EpcisBody.js").EpcisEvent[];
    eventsByAction(action: string): import("./EpcisBody.js").EpcisEvent[];
    eventsByType(type: string): import("./EpcisBody.js").EpcisEvent[];
    stats(): {
        totalEvents: number;
        objectEvents: number;
        aggregationEvents: number;
        transformationEvents: number;
        transactionEvents: number;
        associationEvents: number;
    };
    findEPC(epc: string): EventCollection;
    trace(epc: string): Trace;
    allEpcs(): EpcCollection;
    buildTraceGraph(): TraceGraph;
    toJSON(): {
        type: string;
        schemaVersion: string;
        creationDate: string;
        epcisHeader: {
            epcisMasterData: {
                vocabularyList: {
                    type: string;
                    vocabularyElementList: {
                        id: string;
                        attributes: import("./VocabularyElement.js").VocabularyAttribute[];
                    }[];
                }[];
            } | undefined;
        } | undefined;
        epcisBody: {
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
    };
    static parse(input: unknown): EpcisDocument;
}
