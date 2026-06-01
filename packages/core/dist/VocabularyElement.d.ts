export interface VocabularyAttribute {
    id: string;
    value: unknown;
}
export interface VocabularyElementInput {
    id: string;
    attributes?: VocabularyAttribute[];
}
export declare class VocabularyElement {
    readonly id: string;
    readonly attributes: VocabularyAttribute[];
    constructor(input: VocabularyElementInput);
    addAttribute(id: string, value: unknown): VocabularyElement;
    getAttribute(id: string): unknown;
    toJSON(): {
        id: string;
        attributes: VocabularyAttribute[];
    };
}
