export interface SourceInput {
    type: string;
    value: string;
}
export declare class Source {
    readonly type: string;
    readonly value: string;
    constructor(input: SourceInput);
    toJSON(): {
        type: string;
        value: string;
    };
}
