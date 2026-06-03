import { SerializedItem } from "./SerializedItem.js";
function itemFromEpcUri(epc) {
    const prefix = "urn:epc:id:sgtin:";
    const value = epc.startsWith(prefix)
        ? epc.slice(prefix.length)
        : epc;
    const [gtin, serial] = value.split(".");
    return new SerializedItem({
        raw: epc,
        identifierType: "serialized",
        gtin,
        serial
    });
}
export class TransactionEvent {
    eventType = "TransactionEvent";
    action;
    bizStep;
    disposition;
    location;
    eventTime;
    items;
    transactions;
    constructor(input) {
        this.action = input.action;
        this.bizStep = input.bizStep;
        this.disposition = input.disposition;
        this.location = input.location;
        this.items = input.items;
        this.transactions = input.transactions;
        this.eventTime = input.eventTime ?? new Date().toISOString();
    }
    get epcList() {
        return this.items
            .map((item) => item.toEpcUri())
            .filter((epc) => epc !== undefined);
    }
    static parse(input) {
        if (typeof input !== "object" ||
            input === null) {
            throw new Error("Invalid TransactionEvent");
        }
        const event = input;
        return new TransactionEvent({
            action: event.action,
            bizStep: event.bizStep,
            disposition: event.disposition,
            location: event.location,
            eventTime: event.eventTime,
            items: (event.epcList ?? []).map((epc) => itemFromEpcUri(epc)),
            transactions: event.bizTransactionList ?? []
        });
    }
    toJSON() {
        return {
            eventType: this.eventType,
            action: this.action,
            bizStep: this.bizStep,
            disposition: this.disposition,
            location: this.location,
            eventTime: this.eventTime,
            epcList: this.epcList,
            bizTransactionList: this.transactions
        };
    }
}
