# Axis

A modern TypeScript SDK for EPCIS, GS1 identifiers, and traceability applications.

Axis helps developers build serialization, supply chain, product intelligence, and traceability software using strongly typed domain objects instead of XML-first workflows.

Rather than manipulating EPCIS XML directly, developers work with documents, events, identifiers, queries, traces, and graphs.

---

## Installation

```bash
npm install @buildonaxis/core
```

```ts
import {
  EpcisDocument,
  EpcisBody,
  ObjectEvent,
  SerializedItem
} from "@buildonaxis/core";
```

---

## Think of Axis as React for EPCIS

Most EPCIS tooling focuses on generating, validating, or transporting EPCIS documents.

Axis focuses on helping developers build applications.

Instead of working directly with XML structures and EPCIS schemas, developers work with modern TypeScript domain objects.

```ts
const event = new ObjectEvent({
  action: "OBSERVE",
  bizStep: "shipping",
  items: [item]
});
```

instead of:

```ts
xml.createElement("ObjectEvent");
```

Axis handles EPCIS complexity so developers can focus on business logic.

---

## Why Axis?

Building EPCIS applications today often requires developers to:

- Parse XML
- Navigate nested document structures
- Manage EPC relationships manually
- Build custom traceability logic
- Create graph models from EPCIS events

Axis provides a developer-friendly application layer that makes EPCIS data feel like any modern TypeScript framework.

---

## Quick Start

```ts
import {
  SerializedItem,
  ObjectEvent,
  EpcisBody,
  EpcisDocument
} from "@buildonaxis/core";

const item = SerializedItem.fromBarcode(
  "010003123456789017261231ABC123"
);

const event = new ObjectEvent({
  action: "OBSERVE",
  bizStep: "shipping",
  disposition: "in_transit",
  items: [item]
});

const document = new EpcisDocument({
  body: new EpcisBody({
    events: [event]
  })
});

console.log(document.toJSON());
```

---

## Query API

Filter EPCIS events using a fluent query interface.

```ts
const shipped = document
  .events()
  .whereType("ObjectEvent")
  .whereBizStep("shipping");
```

Chain filters naturally:

```ts
const warehouseShipments = document
  .events()
  .whereType("ObjectEvent")
  .whereBizStep("shipping")
  .whereLocation("warehouse-a");
```

---

## Trace API

Build a trace for a serialized item.

```ts
const trace = document.trace(
  "urn:epc:id:sgtin:0614141.107346.2017"
);
```

Trace APIs expose the full lifecycle of an EPC.

```ts
trace.events();
trace.firstSeen();
trace.lastSeen();
```

---

## Trace Graphs

Generate graph structures directly from EPCIS aggregation and association events.

```ts
const graph = document.buildTraceGraph();
```

Navigate relationships:

```ts
graph.ancestors(epc);

graph.descendants(epc);

graph.path(parentEpc, childEpc);

graph.roots();

graph.leaves();
```

Example:

```text
Case
 ├── Bottle A
 ├── Bottle B
 └── Bottle C
```

```ts
graph.descendants(caseEpc);
```

Returns all contained EPCs.

---

## GS1 Identity APIs

Parse and work with GS1 identifiers.

```ts
const item = SerializedItem.fromBarcode(
  "010003123456789017261231ABC123"
);

console.log(item.gtin);
console.log(item.serial);
```

Parse raw identifiers:

```ts
import { parseIdentity } from "@buildonaxis/core";

const parsed = parseIdentity(
  "010003123456789017261231ABC123"
);
```

---

## EPC Discovery

Find every EPC referenced in a document.

```ts
const epcs = document.allEpcs();
```

Filter and enumerate:

```ts
epcs.count();

epcs.toArray();
```

---

## XML Support

Generate EPCIS-compatible XML.

```ts
import { XmlWriter } from "@buildonaxis/core";

const xml = XmlWriter.write(document);
```

Parse EPCIS XML:

```ts
import { XmlParser } from "@buildonaxis/core";

const document = XmlParser.parse(xml);
```

---

## Current Status

### Version 0.1.0

Status: Early developer preview.

Axis is stable enough for experimentation, prototypes, internal tools, and developer feedback.

Implemented capabilities include:

### EPCIS Domain Model

- EPCIS Document
- EPCIS Header
- EPCIS Body
- Master Data Support

### EPCIS Events

- ObjectEvent
- AggregationEvent
- AssociationEvent
- TransactionEvent
- TransformationEvent

### GS1 Identity

- SerializedItem
- TradingPartner
- Location
- ReadPoint
- BizLocation

### Query APIs

- EventCollection
- EpcCollection
- Fluent Filtering
- EPC Discovery

### Traceability APIs

- Trace
- TraceNode
- TraceGraph
- Ancestor Traversal
- Descendant Traversal
- Path Discovery
- Root Detection
- Leaf Detection
- Multi-Parent Relationships

### Serialization

- JSON Serialization
- JSON Parsing
- XML Writing
- XML Parsing

### Validation

- EPCIS Validation APIs
- Error Reporting
- Validation Framework

### Quality

- 150+ automated tests
- Fully passing build pipeline
- TypeScript strict mode

---

## Design Philosophy

### EPCIS First

Developers should work with EPCIS concepts, not XML nodes.

```ts
const event = new ObjectEvent({...});
```

Not:

```ts
xml.createElement("ObjectEvent");
```

### Strong Typing

TypeScript should catch mistakes before runtime.

### Developer Experience

Working with EPCIS should feel like working with modern application frameworks.

### Traceability as a First-Class Concept

Axis is more than an EPCIS parser.

Traceability, genealogy, and supply chain intelligence are core concepts of the SDK.

---

## Roadmap

### v0.2.x

- Additional query operators
- Advanced graph traversal
- EPC lineage helpers
- Relationship analytics

### v0.3.x

- EPCIS validation profiles
- Schema validation
- Rich error reporting
- Validation rule engine

### Future

- Supply Chain Genealogy
- Recall Analysis
- Digital Product Passport Support
- Supply Chain Intelligence APIs
- Visualization Components
- AI-Assisted Traceability
- Developer Playground

---

## Open Source

Axis is open source under the MIT License.

---

## Vision

Axis aims to become the foundational developer toolkit for the next generation of traceability software.

Developers should be able to build everything from EPCIS integrations and serialization platforms to digital product passports, genealogy systems, recall platforms, inventory applications, and AI-powered traceability solutions using a single modern TypeScript SDK.