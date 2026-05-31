import { ParsedIdentity } from "./types.js";

function parseExpiration(value: string): string {
  const year = Number(value.slice(0, 2));
  const fullYear = year >= 50 ? 1900 + year : 2000 + year;
  const month = value.slice(2, 4);
  const day = value.slice(4, 6);

  return `${fullYear}-${month}-${day}`;
}

export function parseIdentity(raw: string): ParsedIdentity {
  const result: ParsedIdentity = {
    raw,
    identifierType: "unknown"
  };

  let cursor = 0;

  while (cursor < raw.length) {
    const ai = raw.slice(cursor, cursor + 2);
    cursor += 2;

    if (ai === "01") {
      result.gtin = raw.slice(cursor, cursor + 14);
      cursor += 14;
      continue;
    }

    if (ai === "17") {
      result.expiration = parseExpiration(raw.slice(cursor, cursor + 6));
      cursor += 6;
      continue;
    }

    if (ai === "10") {
      const nextAiIndex = raw.slice(cursor).search(/(?:17|21)/);
      if (nextAiIndex >= 0) {
        result.lot = raw.slice(cursor, cursor + nextAiIndex);
        cursor = cursor + nextAiIndex;
      } else {
        result.lot = raw.slice(cursor);
        cursor = raw.length;
      }
      continue;
    }

    if (ai === "21") {
      result.serial = raw.slice(cursor);
      cursor = raw.length;
      continue;
    }

    break;
  }

  if (result.serial) {
    result.identifierType = "serialized";
  } else if (result.lot) {
    result.identifierType = "lot-tracked";
  }

  return result;
}