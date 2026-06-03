import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";
export interface TransactionBusinessTransaction {
    type: string;
    id: string;
}
export interface TransactionEventInput {
    action: "ADD" | "OBSERVE" | "DELETE";
    bizStep?: BusinessStep;
    disposition?: Disposition;
    location?: string;
    eventTime?: string;
    items: SerializedItem[];
    transactions: TransactionBusinessTransaction[];
}
export declare class TransactionEvent {
    readonly eventType = "TransactionEvent";
    readonly action: "ADD" | "OBSERVE" | "DELETE";
    readonly bizStep?: BusinessStep;
    readonly disposition?: Disposition;
    readonly location?: string;
    readonly eventTime: string;
    readonly items: SerializedItem[];
    readonly transactions: TransactionBusinessTransaction[];
    constructor(input: TransactionEventInput);
    get epcList(): string[];
    static parse(input: unknown): TransactionEvent;
    toJSON(): {
        eventType: string;
        action: "ADD" | "OBSERVE" | "DELETE";
        bizStep: BusinessStep | undefined;
        disposition: Disposition | undefined;
        location: string | undefined;
        eventTime: string;
        epcList: string[];
        bizTransactionList: TransactionBusinessTransaction[];
    };
}
