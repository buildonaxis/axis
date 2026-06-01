import { MasterDataDocument } from "./MasterDataDocument.js";
export interface EpcisHeaderInput {
    masterData?: MasterDataDocument;
}
export declare class EpcisHeader {
    readonly masterData?: MasterDataDocument;
    constructor(input?: EpcisHeaderInput);
    toJSON(): {
        epcisMasterData: {
            vocabularyList: {
                type: string;
                vocabularyElementList: {
                    id: string;
                    attributes: import("./VocabularyElement.js").VocabularyAttribute[];
                }[];
            }[];
        } | undefined;
    };
}
