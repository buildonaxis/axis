export interface BusinessTransactionInput {
    type: string;
    identifier: string;
}
export declare class BusinessTransaction {
    readonly type: string;
    readonly identifier: string;
    constructor(input: BusinessTransactionInput);
    toJSON(): {
        type: string;
        identifier: string;
    };
}
