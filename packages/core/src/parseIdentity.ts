import { ParsedIdentity } from "./types.js";

export function parseIdentity(raw: string): ParsedIdentity {
  const result: ParsedIdentity = {
    raw,
    identifierType: "unknown"
  };

  if (raw.startsWith("01")) {
    result.gtin = raw.substring(2, 16);
  }

  const remaining = raw.substring(16);

  if (remaining.startsWith("21")) {
    result.serial = remaining.substring(2);
    result.identifierType = "serialized";
  }

  if (remaining.startsWith("10")) {
    result.lot = remaining.substring(2);
    result.identifierType = "lot-tracked";
  }

  return result;
}