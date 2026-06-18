import { SerializedItem } from "./SerializedItem.js";

export function gtin(value: string): string {
  return value;
}

export function sscc(value: string): string {
  return value;
}

export function gln(value: string): string {
  return value;
}

export function serialized(
  gtin: string,
  serial: string
): SerializedItem {
  return new SerializedItem({
    identifierType: "serialized",
    gtin,
    serial,
    raw: `urn:epc:id:sgtin:${gtin}.${serial}`
  });
}

export function lot(
  gtin: string,
  lot: string
): SerializedItem {
  return new SerializedItem({
    identifierType: "lot-tracked",
    gtin,
    lot,
    raw: `${gtin}:${lot}`
  });
}