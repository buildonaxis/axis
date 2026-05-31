import { parseGS1 } from "./gs1.js";
export function parseIdentity(raw) {
    const values = parseGS1(raw);
    const result = {
        raw,
        identifierType: "unknown"
    };
    for (const item of values) {
        if (item.name === "gtin") {
            result.gtin = item.value;
        }
        if (item.name === "serial") {
            result.serial = item.value;
        }
        if (item.name === "lot") {
            result.lot = item.value;
        }
        if (item.name === "expiration") {
            result.expiration = item.value;
        }
    }
    if (result.serial) {
        result.identifierType = "serialized";
    }
    else if (result.lot) {
        result.identifierType = "lot-tracked";
    }
    return result;
}
