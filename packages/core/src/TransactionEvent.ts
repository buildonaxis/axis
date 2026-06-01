import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";

interface TransactionBusinessTransaction {
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

export class TransactionEvent {
  readonly eventType = "TransactionEvent";
  readonly action: "ADD" | "OBSERVE" | "DELETE";
  readonly bizStep?: BusinessStep;
  readonly disposition?: Disposition;
  readonly location?: string;
  readonly eventTime: string;
  readonly items: SerializedItem[];
  readonly transactions: TransactionBusinessTransaction[];

  constructor(input: TransactionEventInput) {
    this.action = input.action;
    this.bizStep = input.bizStep;
    this.disposition = input.disposition;
    this.location = input.location;
    this.items = input.items;
    this.transactions = input.transactions;
    this.eventTime = input.eventTime ?? new Date().toISOString();
  }

  get epcList(): string[] {
    return this.items
      .map((item) => item.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
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