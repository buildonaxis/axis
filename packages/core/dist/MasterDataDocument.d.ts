import { Vocabulary } from "./Vocabulary.js";
export interface MasterDataDocumentInput {
    vocabularies?: Vocabulary[];
}
export declare class MasterDataDocument {
    readonly vocabularies: Vocabulary[];
    constructor(input?: MasterDataDocumentInput);
    addVocabulary(vocabulary: Vocabulary): MasterDataDocument;
    getVocabulary(type: string): Vocabulary | undefined;
    toJSON(): {
        vocabularyList: {
            type: string;
            vocabularyElementList: {
                id: string;
                attributes: import("./VocabularyElement.js").VocabularyAttribute[];
            }[];
        }[];
    };
}
