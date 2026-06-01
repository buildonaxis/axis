export interface QuantityElementInput {
    epcClass: string;
    quantity: number;
    uom?: string;
}
export declare class QuantityElement {
    readonly epcClass: string;
    readonly quantity: number;
    readonly uom?: string;
    constructor(input: QuantityElementInput);
    toJSON(): {
        epcClass: string;
        quantity: number;
        uom: string | undefined;
    };
}
