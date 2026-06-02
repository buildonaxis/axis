import { EpcisHeader } from "./EpcisHeader.js";
import { EpcisBody } from "./EpcisBody.js";
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
