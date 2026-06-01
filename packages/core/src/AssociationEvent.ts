import { SerializedItem } from "./SerializedItem.js";
import type { BusinessStep } from "./BusinessStep.js";
import type { Disposition } from "./Disposition.js";

export interface AssociationEventInput {
  action: "ADD" | "OBSERVE" | "DELETE";
  parent: SerializedItem;
  children: SerializedItem[];
  bizStep?: BusinessStep;
  disposition?: Disposition;
  location?: string;
  eventTime?: string;
}

export class AssociationEvent {
  readonly eventType = "AssociationEvent";
  readonly action: "ADD" | "OBSERVE" | "DELETE";
  readonly parent: SerializedItem;
  readonly children: SerializedItem[];
  readonly bizStep?: BusinessStep;
  readonly disposition?: Disposition;
  readonly location?: string;
  readonly eventTime: string;

  constructor(input: AssociationEventInput) {
    this.action = input.action;
    this.parent = input.parent;
    this.children = input.children;
    this.bizStep = input.bizStep;
    this.disposition = input.disposition;
    this.location = input.location;
    this.eventTime = input.eventTime ?? new Date().toISOString();
  }

  get parentId(): string | undefined {
    return this.parent.toEpcUri();
  }

  get childEpcs(): string[] {
    return this.children
      .map((child) => child.toEpcUri())
      .filter((epc): epc is string => epc !== undefined);
  }

  toJSON() {
    return {
      eventType: this.eventType,
      action: this.action,
      parentId: this.parentId,
      childEpcs: this.childEpcs,
      bizStep: this.bizStep,
      disposition: this.disposition,
      location: this.location,
      eventTime: this.eventTime
    };
  }
}