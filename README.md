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
const shipments = document
  .events()
  .whereEventType("ObjectEvent")
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

Future releases will add upstream and downstream traversal APIs for genealogy and recall analysis.

---

## What Makes Axis Different?

Most EPCIS tooling focuses on moving documents.

Axis focuses on helping developers answer questions.

```ts
document.trace(epc);

document.allEpcs();

document
  .events()
  .whereBizStep("shipping")
  .whereLocation("warehouse-a");

const graph = document.buildTraceGraph();
```

Axis is designed to become the application layer for traceability software.

---

## Current Status

### v0.2.0 — Query & Trace Foundations

Implemented:

#### EPCIS Domain Model

- EPCISDocument
- EPCISHeader
- EPCISBody
- MasterDataDocument

#### EPCIS Events

- ObjectEvent
- AggregationEvent
- AssociationEvent
- TransactionEvent
- TransformationEvent

#### GS1 Identity

- SerializedItem
- TradingPartner
- Location

#### Query APIs

- EventCollection
- EpcCollection
- Fluent filtering
- EPC discovery

#### Traceability APIs

- Trace
- TraceNode
- TraceGraph

#### Capabilities

- Parsing
- JSON Serialization
- Strong Typing
- EPC Discovery
- Trace Generation
- Graph Generation

#### Quality

- 89 automated tests
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

Traceability, genealogy, and supply-chain intelligence are core concepts of the platform.

---

## Installation

Axis is currently under active development and is not yet published to npm.

Early access is available directly from the repository.

---

## Open Source

Axis is being built in the open under the MIT License.

Contributions, feedback, and discussions are welcome.

---

## Roadmap

### v0.3.0 — Relationship Graphs

- Aggregation parent/child relationships
- Transformation input/output relationships
- Upstream traversal
- Downstream traversal

### v0.4.0 — EPCIS XML Support

- EPCIS XML writer
- EPCIS XML parser
- Round-trip compatibility

### v0.5.0 — Validation

- EPCIS validation APIs
- GS1 compliance validation
- Schema validation

### Future

- Supply chain genealogy
- Recall analysis
- Graph analytics
- AI-ready traceability tooling
- Visualization components
- Developer playground

---

## Vision

Axis aims to become the foundational developer toolkit for the next generation of supply chain, product intelligence, and traceability software.

Developers should be able to build everything from EPCIS integrations to digital product passports, genealogy systems, recall platforms, and AI-powered traceability applications using a single modern TypeScript SDK.