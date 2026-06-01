import { ParsedIdentity } from "./types.js";
export declare class SerializedItem {
    readonly raw: string;
    readonly gtin?: string;
    readonly serial?: string;
    readonly lot?: string;
    readonly expiration?: string;
    constructor(identity: ParsedIdentity);
    static fromBarcode(raw: string): SerializedItem;
    isSerialized(): boolean;
    isLotTracked(): boolean;
    toEpcUri(): string | undefined;
    toJSON(): {
        raw: string;
        gtin: string | undefined;
        serial: string | undefined;
        lot: string | undefined;
        expiration: string | undefined;
        epcUri: string | undefined;
        isSerialized: boolean;
        isLotTracked: boolean;
    };
}
