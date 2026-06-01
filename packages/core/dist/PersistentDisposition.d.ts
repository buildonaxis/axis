export interface PersistentDispositionInput {
    set?: string[];
    unset?: string[];
}
export declare class PersistentDisposition {
    readonly set: string[];
    readonly unset: string[];
    constructor(input?: PersistentDispositionInput);
    toJSON(): {
        set: string[];
        unset: string[];
    };
}
