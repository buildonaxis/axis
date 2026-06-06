import type { EpcisEvent } from "./EpcisBody.js";

function hasField<K extends string>(
  event: EpcisEvent,
  field: K
): event is EpcisEvent & Record<K, unknown> {
  return field in event;
}

function onlyStrings(values: unknown[]): string[] {
  return values.filter(
    (value): value is string => typeof value === "string"
  );
}

export function extractEpcs(event: EpcisEvent): string[] {
  const epcs: string[] = [];

  if (hasField(event, "epcList") && Array.isArray(event.epcList)) {
    epcs.push(...onlyStrings(event.epcList));
  }

  if (hasField(event, "parentId") && typeof event.parentId === "string") {
    epcs.push(event.parentId);
  }

  if (hasField(event, "childEpcs") && Array.isArray(event.childEpcs)) {
    epcs.push(...onlyStrings(event.childEpcs));
  }

  if (hasField(event, "inputEpcs") && Array.isArray(event.inputEpcs)) {
    epcs.push(...onlyStrings(event.inputEpcs));
  }

  if (hasField(event, "outputEpcs") && Array.isArray(event.outputEpcs)) {
    epcs.push(...onlyStrings(event.outputEpcs));
  }

  return [...new Set(epcs)];
}