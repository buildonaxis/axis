# Product Genealogy Example

This example demonstrates one of the most common traceability use cases: building a product genealogy graph from EPCIS events.

Axis transforms EPCIS data into a queryable graph that developers can use to build inventory systems, recall tools, genealogy applications, and supply chain visibility platforms.

## Scenario

A manufacturer packages serialized products into cases and then packs those cases onto a pallet.

```text
Pallet
 ├── Case A
 │    ├── Bottle A
 │    └── Bottle B
 └── Case B
      ├── Bottle C
      └── Bottle D
```

The pallet is then shipped.

From these EPCIS events, Axis builds a traceability graph that can answer questions about product relationships.

---

## Installation

```bash
npm install
```

---

## Run

```bash
npm start
```

---

## What This Example Demonstrates

### Commissioning Products

Create serialized products and introduce them into the supply chain.

```ts
createCommissioningEvent({
  items: [...]
});
```

### Packing Bottles Into Cases

Associate serialized bottles with a parent case.

```ts
createPackingEvent({
  parent: caseA,
  children: [bottleA, bottleB]
});
```

### Packing Cases Onto a Pallet

Associate cases with a parent pallet.

```ts
createPackingEvent({
  parent: pallet,
  children: [caseA, caseB]
});
```

### Shipping a Pallet

Record shipment activity.

```ts
createShippingEvent({
  items: [pallet]
});
```

### Building a Traceability Graph

Convert EPCIS events into a graph structure.

```ts
const graph = document.buildTraceGraph();
```

---

## Questions Axis Can Answer

### What is inside this pallet?

```ts
graph.descendants(palletEpc);
```

Returns:

```text
Case A
Case B
Bottle A
Bottle B
Bottle C
Bottle D
```

### What contains Bottle A?

```ts
graph.ancestors(bottleAEpc);
```

Returns:

```text
Case A
Pallet
```

### What is the path from the pallet to Bottle A?

```ts
graph.path(palletEpc, bottleAEpc);
```

Returns:

```text
Pallet
 → Case A
 → Bottle A
```

### What does the traceability graph look like?

```ts
graph.toMermaid();
```

Produces:

```mermaid
graph LR
  "PALLET123" --> "CASEA123"
  "PALLET123" --> "CASEB123"
  "CASEA123" --> "BOTTLEA"
  "CASEA123" --> "BOTTLEB"
  "CASEB123" --> "BOTTLEC"
  "CASEB123" --> "BOTTLED"
```

---

## Why This Matters

Raw EPCIS documents describe events.

Applications need relationships.

Axis reconstructs those relationships and provides a graph-based application model that developers can query directly.

Instead of manually traversing EPCIS event history, developers can ask questions such as:

* What is inside this shipment?
* What products are affected by a recall?
* Which case contained this item?
* Where did this product originate?
* What products share a common ancestor?

---

## Example Output

When you run the example, Axis will:

* Generate EPCIS events
* Build a traceability graph
* Validate the document
* Export Mermaid graph output
* Generate EPCIS XML

The example demonstrates how a small number of EPCIS events can be transformed into a rich application model.

---

## Notes

This example focuses on traceability relationships and application development.

It intentionally does not include:

* SBDH envelopes
* Trading partner routing metadata
* Industry-specific compliance profiles
* Production deployment concerns

Those capabilities can be layered on top of Axis depending on the requirements of the application being built.

---

## Learn More

* Axis GitHub Repository
* Axis Documentation
* Additional Examples

If you're building traceability software, build on Axis.
