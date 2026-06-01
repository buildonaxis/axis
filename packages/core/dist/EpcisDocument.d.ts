import { EpcisHeader } from "./EpcisHeader.js";
export type EpcisDocumentEvent = {
    toJSON: () => unknown;
};
export interface EpcisDocumentInput {
    header?: EpcisHeader;
    events?: EpcisDocumentEvent[];
    schemaVersion?: string;
    creationDate?: string;
}
export declare class EpcisDocument {
    readonly header?: EpcisHeader;
    readonly schemaVersion: string;
    readonly creationDate: string;
    events: EpcisDocumentEvent[];
    constructor(input?: EpcisDocumentInput);
    addEvent(event: EpcisDocumentEvent): void;
    object(input: {
        epc: string;
    }): EpcisDocumentEvent;
    aggregate(input: {
        parent: string;
        children: string[];
    }): EpcisDocumentEvent;
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
            eventList: unknown[];
        };
    };
}
