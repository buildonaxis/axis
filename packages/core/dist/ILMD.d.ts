export interface ILMDInput {
    lotNumber?: string;
    expirationDate?: string;
    productionDate?: string;
    bestBeforeDate?: string;
    [key: string]: unknown;
}
export declare class ILMD {
    readonly attributes: Record<string, unknown>;
    constructor(input?: ILMDInput);
    get(key: string): unknown;
    has(key: string): boolean;
    toJSON(): Record<string, unknown>;
}
