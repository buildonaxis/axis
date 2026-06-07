# Axis

A modern TypeScript SDK for EPCIS, GS1 identifiers, and traceability applications.

Axis helps developers build supply chain, serialization, product intelligence, and traceability software using strongly typed domain objects instead of EPCIS XML.

Instead of working directly with XML documents, developers work with EPCIS concepts, GS1 identifiers, events, and traceability graphs.

---

## Why Axis?

Most EPCIS tooling focuses on generating, validating, or transporting EPCIS documents.

Axis focuses on helping developers build software.

The goal is to make EPCIS data feel as natural to work with as any modern TypeScript library.

---

## Example

```ts
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

Filter events using a fluent interface.

```ts
const shipped = document
  .events()
  .whereType("ObjectEvent")
  .whereBizStep("shipping");
```

---

## Trace API

Build a trace for a serialized item.

```ts
const trace = document.trace(
  "urn:epc:id:sgtin:0614141.107346.2017"
);
```

---

## Trace Graphs

Generate graph structures directly from EPCIS data.

```ts
const graph = document.buildTraceGraph();
```

Graph intelligence APIs provide ancestry, descendant traversal, and path discovery across EPC relationships.

```ts
graph.ancestors(epc);

graph.descendants(epc);

graph.path(parentEpc, childEpc);

graph.roots();

graph.leaves();
```

---

## What Makes Axis Different?

Most EPCIS tooling focuses on moving documents.

Axis focuses on helping developers answer questions.

```ts
document.trace(epc);
```

```ts
document.allEpcs();
```

```ts
document
  .events()
  .whereBizStep("shipping")
  .whereLocation("warehouse-a");
```

```ts
const graph = document.buildTraceGraph();
```

Axis is designed to become the application layer for traceability software.

---

## Current Status

### v0.3.0 – Graph Intelligence

Implemented:

### EPCIS Domain Model

- EPCIS Document
- EPCIS Header
- EPCIS Body
- Master Data

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

### Capabilities

- Parsing
- JSON Serialization
- Strong Typing
- EPC Discovery
- Trace Generation
- Graph Generation

### Quality

- 100 automated tests
- 100% passing

---

## Design Philosophy

### EPCIS First

Developers work with EPCIS concepts, not XML nodes.

```ts
const event = new ObjectEvent({...});
```

instead of

```ts
xml.createElement("ObjectEvent");
```

### Strong Typing

TypeScript should catch mistakes before runtime.

### Developer Experience

Working with EPCIS should feel like working with modern application frameworks.

### Traceability as a First-Class Concept

Axis is not just an EPCIS parser.

Traceability, genealogy, and supply chain intelligence are core concepts of the platform.

---

## Installation

Axis is currently under active development and is not yet published to npm.

Early access is available directly from the repository.

---

## Open Source

Axis is being built in the open under the MIT License.

---

## Roadmap

### v0.1.0 – Core Domain Layer ✅

- EPCIS Document Model
- EPCIS Header Model
- EPCIS Body Model
- Master Data Model
- EPCIS Event Models
- GS1 Identity Models
- JSON Serialization
- Round-trip Parsing

### v0.2.0 – Query & Trace Foundations ✅

- EventCollection
- EpcCollection
- EPC Discovery
- Trace
- TraceNode
- TraceGraph
- Fluent Query APIs
- Query Composition

### v0.3.0 – Graph Intelligence ✅

- Parent traversal
- Child traversal
- Ancestor traversal
- Descendant traversal
- Root node detection
- Leaf node detection
- Path discovery
- Multi-parent trace graphs

### v0.4.0 – EPCIS XML Support

- EPCIS XML Writer
- EPCIS XML Parser
- EPCIS 1.2 compatibility layer
- EPCIS 2.0 full support
- Round-trip XML support

### v0.5.0 – Validation

- EPCIS Validation APIs
- GS1 Validation APIs
- Schema Validation
- Error Reporting
- Validation Profiles

### Future

- Supply Chain Genealogy
- Recall Analysis
- Digital Product Passport Support
- AI-Assisted Traceability
- Visualization Components
- Developer Playground

---

## Vision

Axis aims to become the foundational developer toolkit for the next generation of supply chain, product intelligence, and traceability software.

Developers should be able to build everything from EPCIS integrations to digital product passports, genealogy systems, recall platforms, and AI-powered traceability applications using a single modern TypeScript SDK.