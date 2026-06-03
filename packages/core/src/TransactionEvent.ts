import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";

function itemFromEpcUri(epc: string): SerializedItem {
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

  static parse(input: unknown): TransactionEvent {
    if (
      typeof input !== "object" ||
      input === null
    ) {
      throw new Error("Invalid TransactionEvent");
    }

    const event = input as {
      action: "ADD" | "OBSERVE" | "DELETE";
      bizStep?: BusinessStep;
      disposition?: Disposition;
      location?: string;
      eventTime?: string;
      epcList?: string[];
      bizTransactionList?: TransactionBusinessTransaction[];
    };

    return new TransactionEvent({
      action: event.action,
      bizStep: event.bizStep,
      disposition: event.disposition,
      location: event.location,
      eventTime: event.eventTime,
      items: (event.epcList ?? []).map((epc) =>
        itemFromEpcUri(epc)
      ),
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