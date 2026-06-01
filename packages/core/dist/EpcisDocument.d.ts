export type EpcisDocumentEvent = {
    toJSON: () => unknown;
};
export declare class EpcisDocument {
    events: EpcisDocumentEvent[];
    addEvent(event: EpcisDocumentEvent): void;
    object(input: {
        epc: string;
    }): EpcisDocumentEvent;
    toJSON(): {
        events: unknown[];
    };
}
