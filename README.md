# Axis

A modern TypeScript SDK for building traceability applications with EPCIS and GS1 standards.

Axis aims to become the foundational developer toolkit for the next generation of supply chain, product intelligence, and traceability software.

Instead of working directly with EPCIS XML, developers work with domain objects.

## Why Axis?

Most EPCIS tooling focuses on generating, validating, or transporting EPCIS documents.

Axis focuses on helping developers build software.

The goal is to make EPCIS data feel as natural to work with as any modern TypeScript library.

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

## Current Status

### v0.1.0 Core Domain Layer

Implemented:

- EPCIS Document Model
- EPCIS Header Model
- EPCIS Body Model
- Master Data Model

Events:

- ObjectEvent
- AggregationEvent
- AssociationEvent
- TransactionEvent
- TransformationEvent

Identity:

- SerializedItem
- TradingPartner
- Location

Capabilities:

- Parsing
- JSON Serialization
- Strong Typing

Tests:

- 80 automated tests
- 100% passing

Current Release:

- v0.1.0 Core Domain Layer

## Design Philosophy

### EPCIS First

Developers work with EPCIS concepts, not XML nodes.

### Strong Typing

TypeScript should catch mistakes before runtime.

### Developer Experience

Working with EPCIS should feel like working with modern application frameworks.

## Installation

Axis is currently under active development and is not yet published to npm.

Early access is available directly from the repository.

### Open Source

Axis is being built in the open.

## Roadmap

### v0.2

- EPCIS XML Writer

### v0.3

- EPCIS XML Parser

### v0.4

- Validation APIs

### Future

- Traceability Query APIs
- Graph Analysis
- Developer Playground
- AI-friendly tooling