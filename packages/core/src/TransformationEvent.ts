import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";

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
      input.eventTime ??
      new Date().toISOString();

    this.bizStep = input.bizStep;
    this.disposition = input.disposition;

    this.inputItems = input.inputItems;
    this.outputItems = input.outputItems;
  }

  get inputEpcs(): string[] {
    return this.inputItems
      .map(item => item.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
  }

  get outputEpcs(): string[] {
    return this.outputItems
      .map(item => item.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
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