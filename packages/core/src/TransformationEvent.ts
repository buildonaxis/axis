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

export interface TransformationEventInput {
  eventTime?: string;
  bizStep?: BusinessStep;
  disposition?: Disposition;
  inputItems: SerializedItem[];
  outputItems: SerializedItem[];
}

export class TransformationEvent {
  readonly eventType = "TransformationEvent";
  readonly eventTime: string;
  readonly bizStep?: BusinessStep;
  readonly disposition?: Disposition;
  readonly inputItems: SerializedItem[];
  readonly outputItems: SerializedItem[];

  constructor(input: TransformationEventInput) {
    this.eventTime =
      input.eventTime ?? new Date().toISOString();

    this.bizStep = input.bizStep;
    this.disposition = input.disposition;
    this.inputItems = input.inputItems;
    this.outputItems = input.outputItems;
  }

  get inputEpcs(): string[] {
    return this.inputItems
      .map((item) => item.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
  }

  get outputEpcs(): string[] {
    return this.outputItems
      .map((item) => item.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
  }

  static parse(input: unknown): TransformationEvent {
    if (
      typeof input !== "object" ||
      input === null
    ) {
      throw new Error("Invalid TransformationEvent");
    }

    const event = input as {
      eventTime?: string;
      bizStep?: BusinessStep;
      disposition?: Disposition;
      inputEPCList?: string[];
      outputEPCList?: string[];
    };

    return new TransformationEvent({
      eventTime: event.eventTime,
      bizStep: event.bizStep,
      disposition: event.disposition,
      inputItems: (event.inputEPCList ?? []).map((epc) =>
        itemFromEpcUri(epc)
      ),
      outputItems: (event.outputEPCList ?? []).map((epc) =>
        itemFromEpcUri(epc)
      )
    });
  }

  toJSON() {
    return {
      eventType: this.eventType,
      eventTime: this.eventTime,
      bizStep: this.bizStep,
      disposition: this.disposition,
      inputEPCList: this.inputEpcs,
      outputEPCList: this.outputEpcs
    };
  }
}