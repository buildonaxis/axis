# Axis

[![npm version](https://img.shields.io/npm/v/@buildonaxis/core)](https://www.npmjs.com/package/@buildonaxis/core)
[![npm downloads](https://img.shields.io/npm/dm/@buildonaxis/core)](https://www.npmjs.com/package/@buildonaxis/core)
[![license](https://img.shields.io/npm/l/@buildonaxis/core)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Tests](https://img.shields.io/badge/tests-153%20passing-brightgreen)]()

A modern TypeScript SDK for EPCIS, GS1 identifiers, and traceability applications.

Axis helps developers build serialization, supply chain, inventory, product intelligence, and traceability software without starting from raw EPCIS XML.

Instead of forcing developers to work directly with XML nodes, Axis gives them modern TypeScript objects for EPCIS documents, events, identifiers, validation, queries, and traceability graphs.

```bash
npm install @buildonaxis/core
```

---

## Why Axis?

Most EPCIS tooling focuses on documents.

Axis focuses on applications.

EPCIS is powerful, but building software on top of it often means developers have to:

* Parse complex XML
* Understand EPCIS event structures
* Rebuild parent-child relationships
* Track serialized identifiers manually
* Validate missing data
* Build custom traceability graphs from scratch

Axis turns EPCIS data into a developer-friendly application layer.

---

## Think of Axis as React for Traceability

Most EPCIS libraries help developers move documents.

Axis helps developers build applications.

Instead of working directly with XML structures, developers work with:

* Documents
* Events
* Identifiers
* Queries
* Traces
* Graphs

Axis transforms traceability data into a developer-friendly application model.

```ts
const graph = document.buildTraceGraph();

const descendants = graph.descendants(palletEpc);

const trace = document.trace(epc);
```

The goal is simple:

```text
If you're building traceability software, build on Axis.
```

---

## Quick Start

```ts
import {
  EpcisDocument,
  EpcisBody,
  SerializedItem,
  createPackingEvent,
  createShippingEvent,
  validateDocument,
  XmlWriter
} from "@buildonaxis/core";

const caseItem = SerializedItem.fromBarcode(
  "01000312345678901726123121CASE123"
);

const bottle = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLE123"
);

const document = new EpcisDocument({
  body: new EpcisBody({
    events: [
      createPackingEvent({
        parent: caseItem,
        children: [bottle],
        location: "urn:epc:id:sgln:0031234.00001.0"
      }),
      createShippingEvent({
        items: [caseItem],
        location: "urn:epc:id:sgln:0031234.00001.0"
      })
    ]
  })
});

const graph = document.buildTraceGraph();

console.log(graph.toMermaid());

const validation = validateDocument(document);

console.log(validation);

const xml = XmlWriter.write(document);

console.log(xml);
```

---

## What Axis Can Do Today

Axis Core v0.1.0 includes:

* EPCIS domain objects
* GS1 identifier helpers
* Event builders
* EPCIS XML writing
* EPCIS XML parsing
* EPC discovery
* Query helpers
* Validation results
* Trace generation
* Trace graph construction
* Graph export to JSON
* Graph export to Mermaid

---

## Build EPCIS Events

Axis includes helper functions for common EPCIS workflows.

```ts
import {
  SerializedItem,
  createCommissioningEvent,
  createPackingEvent,
  createShippingEvent
} from "@buildonaxis/core";

const bottle = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLE123"
);

const commissioning = createCommissioningEvent({
  items: [bottle]
});

const shipping = createShippingEvent({
  items: [bottle],
  location: "urn:epc:id:sgln:0031234.00001.0"
});
```

Available event builders include:

* `createReceivingEvent`
* `createShippingEvent`
* `createPackingEvent`
* `createUnpackingEvent`
* `createCommissioningEvent`
* `createDecommissioningEvent`
* `createRepackingEvent`
* `createInspectionEvent`
* `createSamplingEvent`
* `createDestructionEvent`
* `createReturnEvent`
* `createRecallEvent`
* `createQualityHoldEvent`
* `createReleaseEvent`
* `createInventoryCountEvent`
* `createInventoryAdjustmentEvent`
* `createTransformationEvent`
* `createShippingTransactionEvent`
* `createReceivingTransactionEvent`

---

## Build a Traceability Graph

EPCIS events describe what happened.

Axis helps developers understand what is connected.

```ts
const graph = document.buildTraceGraph();
```

Given aggregation events like:

```text
Pallet
 └── Case
      └── Bottle
```

Axis can answer:

```ts
graph.descendants(palletEpc);

graph.ancestors(bottleEpc);

graph.path(palletEpc, bottleEpc);

graph.commonAncestor(bottleA, bottleB);
```

Export graph data:

```ts
console.log(graph.toJSON());
```

Export Mermaid:

```ts
console.log(graph.toMermaid());
```

---

## Parse and Write EPCIS XML

Write EPCIS XML:

```ts
import { XmlWriter } from "@buildonaxis/core";

const xml = XmlWriter.write(document);
```

Parse EPCIS XML:

```ts
import { XmlParser } from "@buildonaxis/core";

const document = XmlParser.parse(xml);
```

Axis supports XML round-tripping for core EPCIS document structures including:

* EPCISDocument
* EPCISHeader
* EPCISBody
* Master Data
* ObjectEvent
* AggregationEvent
* TransformationEvent
* TransactionEvent

---

## Validate EPCIS Documents

Axis includes a validation foundation for checking document and event quality.

```ts
import { validateDocument } from "@buildonaxis/core";

const result = validateDocument(document);

if (!result.valid) {
  console.log(result.errors);
}
```

This makes validation results usable in:

* Developer tools
* CI pipelines
* UI error displays
* Data quality reports
* EPCIS onboarding workflows

---

## Work With GS1 Identifiers

```ts
import {
  SerializedItem,
  parseIdentity,
  isValidGTIN,
  isValidGLN,
  isValidSSCC
} from "@buildonaxis/core";

const item = SerializedItem.fromBarcode(
  "01000312345678901726123121ABC123"
);

console.log(item.gtin);
console.log(item.serial);

const parsed = parseIdentity(
  "01000312345678901726123121ABC123"
);

console.log(parsed);
```

---

## Query EPCIS Documents

Axis provides document-level helpers for common questions.

```ts
document.eventsByBizStep("shipping");

document.eventsByAction("OBSERVE");

document.eventsByType("ObjectEvent");

document.stats();
```

---

## Example Use Cases

Developers can use Axis to build:

* EPCIS import/export tools
* Serialized inventory systems
* Warehouse receiving applications
* Product recall tools
* EPCIS validation services
* Traceability graph viewers
* Digital product passport prototypes
* Supply chain visibility dashboards
* Product provenance systems
* Manufacturing genealogy tools
* Regulatory traceability applications

---

## What Axis Is Not Yet

Axis Core v0.1.0 is a public alpha release.

It is not yet a complete end-to-end traceability platform.

Current limitations include:

* SBDH envelope generation is not yet implemented
* Full EPCIS schema validation is not yet implemented
* Partner-specific compliance profiles are not yet implemented
* Production trading partner workflows require additional application logic
* EPCIS 1.2 compatibility is still evolving

Axis is currently best used for:

* Developer experimentation
* Internal prototypes
* Traceability application foundations
* EPCIS modeling
* XML parsing and generation
* Graph-based relationship analysis

---

## Design Philosophy

### EPCIS-first

Developers should work with EPCIS concepts, not XML nodes.

```ts
const event = createShippingEvent({
  items: [item]
});
```

Not:

```ts
xml.createElement("ObjectEvent");
```

### TypeScript-first

Axis is built for modern TypeScript development with strong typing and clear domain objects.

### Graph-first Traceability

Traceability is not just a list of events.

Axis treats relationships between EPCs as a first-class concept.

### Developer Experience Matters

EPCIS is complex enough.

The SDK should make common tasks obvious.

---

## Current Status

### Axis Core v0.1.0

Status: Public alpha release.

Quality:

* TypeScript strict mode
* 153 passing tests
* Published npm package
* XML parser and writer
* Trace graph support
* Validation foundation

---

## Roadmap

### Near Term

* More real-world examples
* Improved documentation
* Public examples folder
* More graph utilities
* Better location and GLN helpers
* SBDH envelope support
* Stronger EPCIS validation

### Future

* Validation profiles
* Industry-specific traceability profiles
* EPCIS 1.2 compatibility
* CLI tools
* Developer playground
* Visualization components
* Recall analysis helpers
* Digital Product Passport support
* Traceability application framework

---

## Installation

```bash
npm install @buildonaxis/core
```

---

## License

MIT

---

## Vision

Axis aims to become the developer foundation for modern traceability software.

Developers should be able to build everything from EPCIS integrations and inventory systems to digital product passports, genealogy platforms, recall applications, and AI-powered traceability solutions using a single modern TypeScript SDK.

The goal is simple:

```text
If you're building traceability software, build on Axis.
```
