# @buildonaxis/core

TypeScript SDK for EPCIS 2.0, GS1 identifiers, and traceability applications.

Axis helps developers build serialization, inventory, genealogy, recall, and supply chain applications without starting from raw EPCIS XML.

---

## Installation

```bash
npm install @buildonaxis/core
```

---

## Why Axis?

Traditional EPCIS development often requires developers to work directly with XML documents and schema structures.

Axis provides a modern TypeScript-first developer experience with:

* Strongly typed EPCIS domain objects
* GS1 identifier parsing
* EPCIS document generation and parsing
* Query APIs
* Traceability graph generation
* Genealogy traversal
* Aggregation relationship analysis
* Developer-friendly abstractions

Instead of:

```ts
xml.createElement("ObjectEvent");
```

Developers work with:

```ts
const event = new ObjectEvent({
  epcList: [epc],
  bizStep: "shipping",
});
```

---

## Quick Start

### Parse a GS1 Identifier

```ts
import { parseIdentity } from "@buildonaxis/core";

const result = parseIdentity(
  "01000312345678901726123121ABC123"
);

console.log(result);
```

---

### Create an EPCIS Document

```ts
import {
  EPCISDocument,
  ObjectEvent
} from "@buildonaxis/core";

const event = new ObjectEvent({
  epcList: [
    "urn:epc:id:sgtin:0614141.112345.400"
  ],
  bizStep: "shipping"
});

const document = new EPCISDocument({
  events: [event]
});
```

---

### Build a Traceability Graph

```ts
const graph = document.buildTraceGraph();

graph.ancestors(epc);
graph.descendants(epc);
graph.path(parentEpc, childEpc);
```

---

## Current Features

### EPCIS Domain Model

* EPCISDocument
* EPCISHeader
* EPCISBody
* Master Data support

### EPCIS Events

* ObjectEvent
* AggregationEvent
* AssociationEvent
* TransactionEvent
* TransformationEvent

### GS1 Support

* SGTIN
* SSCC
* GTIN
* GLN
* GRAI
* GIAI

### Query APIs

* Event filtering
* EPC discovery
* Event lookup
* Collection traversal

### Traceability Graphs

* Ancestor traversal
* Descendant traversal
* Root node discovery
* Leaf node discovery
* Path finding
* Multi-parent relationships

### Developer Experience

* TypeScript-first API
* Strong typing
* JSON serialization
* Round-trip parsing
* Automated test coverage

---

## Examples

See the examples directory:

* Product Genealogy
* Barcode Parsing
* EPCIS Generation
* EPCIS Parsing
* Recall Analysis

Repository:

https://github.com/buildonaxis/axis

---

## Roadmap

### v0.5.0

Inventory & Aggregation APIs

### v0.6.0

Validation Engine

### v0.7.0

Developer Playground

---

## Vision

Axis aims to become the foundational TypeScript framework for building traceability applications.

Rather than focusing solely on EPCIS parsing, Axis provides developers with higher-level building blocks for inventory, genealogy, recall, serialization, and supply chain intelligence solutions.

---

## License

MIT
