import {
  SerializedItem,
  parseIdentity,
  gtin,
  gln,
  sscc,
  serialized,
  lot
} from "@buildonaxis/core";

const barcode = "01000312345678901726123121ABC123";

console.log("\n=== Raw GS1 Barcode ===");
console.log(barcode);

console.log("\n=== Parsed Identity ===");
console.log(parseIdentity(barcode));

const item = SerializedItem.fromBarcode(barcode);

console.log("\n=== Serialized Item ===");
console.log({
  raw: item.raw,
  gtin: item.gtin,
  serial: item.serial,
  expiration: item.expiration,
  epcUri: item.toEpcUri()
});

console.log("\n=== Identifier Helpers ===");
console.log({
  gtin: gtin("00031234567890"),
  gln: gln("0031234000010"),
  sscc: sscc("000312345678901234")
});

console.log("\n=== Build Serialized Item From GTIN + Serial ===");
console.log(
  serialized("00031234567890", "ABC123").toJSON()
);

console.log("\n=== Build Lot-Tracked Item From GTIN + Lot ===");
console.log(
  lot("00031234567890", "LOT2026A").toJSON()
);