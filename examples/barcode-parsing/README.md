# Barcode Parsing Example

This example shows how to use Axis to parse GS1 barcodes and work with traceability identifiers.

It demonstrates how developers can move from raw identifier strings into structured TypeScript objects.

---

## Run

```bash
npm install
npm start
```

---

## What This Example Demonstrates

- Parsing GS1 barcode strings
- Extracting GTINs
- Extracting serial numbers
- Extracting expiration dates
- Creating serialized item objects
- Creating lot-tracked item objects
- Converting identifiers into EPC URIs

---

## Understanding the Output

When building identifiers from parts, Axis only includes the information provided.

For example:

```js
serialized("00031234567890", "ABC123")
```

creates a serialized item from a GTIN and serial number only. Since no expiration date was supplied, the resulting object will have:

```js
expiration: undefined
```

Likewise:

```js
lot("00031234567890", "LOT2026A")
```

creates a lot-tracked item rather than a serialized item. Lot-tracked items do not currently generate EPC URIs, so the resulting object will have:

```js
epcUri: undefined
```

This behavior reflects the information available when constructing the identifier.

---

## Example

```js
import {
  SerializedItem,
  parseIdentity
} from "@buildonaxis/core";

const barcode = "01000312345678901726123121ABC123";

const parsed = parseIdentity(barcode);

const item = SerializedItem.fromBarcode(barcode);

console.log(parsed);

console.log(item.toEpcUri());
```

---

## Why This Matters

Traceability applications often start with identifiers.

Before a developer can build inventory tools, product genealogy, recall analysis, or supply chain visibility, they need to reliably parse and structure identifiers.

Axis turns barcode strings into application-ready objects.