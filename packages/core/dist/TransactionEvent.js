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
