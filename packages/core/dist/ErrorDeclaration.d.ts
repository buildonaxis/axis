export interface ErrorDeclarationInput {
    declarationTime: string;
    reason: string;
    correctiveEventIds?: string[];
}
export declare class ErrorDeclaration {
    readonly declarationTime: string;
    readonly reason: string;
    readonly correctiveEventIds: string[];
    constructor(input: ErrorDeclarationInput);
    toJSON(): {
        declarationTime: string;
        reason: string;
        correctiveEventIds: string[];
    };
}
