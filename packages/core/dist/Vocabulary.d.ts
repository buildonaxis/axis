import { VocabularyElement } from "./VocabularyElement.js";
export interface VocabularyInput {
    type: string;
    elements?: VocabularyElement[];
}
export declare class Vocabulary {
    readonly type: string;
    readonly elements: VocabularyElement[];
    constructor(input: VocabularyInput);
    add(element: VocabularyElement): Vocabulary;
    find(id: string): VocabularyElement | undefined;
    toJSON(): {
        type: string;
        vocabularyElementList: {
            id: string;
            attributes: import("./VocabularyElement.js").VocabularyAttribute[];
        }[];
    };
}
