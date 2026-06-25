import {
  AggregationEvent,
  EpcisDocument,
  InventorySnapshot,
  SerializedItem,
} from "../../packages/core/src";

// -----------------------------------------------------------------------------
// Create some serialized identifiers
// -----------------------------------------------------------------------------

const pallet = new SerializedItem({
  gtin: "06141411111111",
  serial: "PALLET-001",
});

const caseA = new SerializedItem({
  gtin: "06141411111111",
  serial: "CASE-A",
});

const caseB = new SerializedItem({
  gtin: "06141411111111",
  serial: "CASE-B",
});

const item1 = new SerializedItem({
  gtin: "06141411111111",
  serial: "ITEM-001",
});

const item2 = new SerializedItem({
  gtin: "06141411111111",
  serial: "ITEM-002",
});

const item3 = new SerializedItem({
  gtin: "06141411111111",
  serial: "ITEM-003",
});

const item4 = new SerializedItem({
  gtin: "06141411111111",
  serial: "ITEM-004",
});

// -----------------------------------------------------------------------------
// Build a simple EPCIS document using Aggregation Events
// -----------------------------------------------------------------------------

const document = new EpcisDocument({
  body: {
    events: [
      new AggregationEvent({
        action: "ADD",
        parent: pallet,
        children: [caseA, caseB],
        bizStep: "packing",
      }),

      new AggregationEvent({
        action: "ADD",
        parent: caseA,
        children: [item1, item2],
        bizStep: "packing",
      }),

      new AggregationEvent({
        action: "ADD",
        parent: caseB,
        children: [item3, item4],
        bizStep: "packing",
      }),
    ],
  },
});

// -----------------------------------------------------------------------------
// Build an inventory snapshot
// -----------------------------------------------------------------------------

const inventory = InventorySnapshot.from(document);

// -----------------------------------------------------------------------------
// Statistics
// -----------------------------------------------------------------------------

console.log("\n=== Inventory Statistics ===");
console.table(inventory.stats());

// -----------------------------------------------------------------------------
// Children
// -----------------------------------------------------------------------------

console.log("\n=== Children of Pallet ===");
console.log(inventory.childrenOf(pallet.toEpcUri()));

// -----------------------------------------------------------------------------
// Recursive Contents
// -----------------------------------------------------------------------------

console.log("\n=== All Contents of Pallet ===");
console.log(inventory.contentsOf(pallet.toEpcUri()));

// -----------------------------------------------------------------------------
// Parent Lookup
// -----------------------------------------------------------------------------

console.log("\n=== Parent of Item 2 ===");
console.log(inventory.parentOf(item2.toEpcUri()));

// -----------------------------------------------------------------------------
// Root Container
// -----------------------------------------------------------------------------

console.log("\n=== Root Container of Item 2 ===");
console.log(inventory.rootContainerOf(item2.toEpcUri()));

// -----------------------------------------------------------------------------
// Path to Root
// -----------------------------------------------------------------------------

console.log("\n=== Path to Root (Item 2) ===");
console.log(inventory.pathToRoot(item2.toEpcUri()));

// -----------------------------------------------------------------------------
// Record Lookup
// -----------------------------------------------------------------------------

console.log("\n=== Inventory Record ===");
console.log(inventory.find(item2.toEpcUri()));

// -----------------------------------------------------------------------------
// Container View
// -----------------------------------------------------------------------------

console.log("\n=== Container View ===");
console.log(inventory.container(pallet.toEpcUri()));

// -----------------------------------------------------------------------------
// Discovery APIs
// -----------------------------------------------------------------------------

console.log("\n=== Root Containers ===");
console.log(inventory.roots());

console.log("\n=== Containers ===");
console.log(inventory.containers());

console.log("\n=== Leaf Items ===");
console.log(inventory.leafItems());

// -----------------------------------------------------------------------------
// Export Helpers
// -----------------------------------------------------------------------------

console.log("\n=== Relationships ===");
console.log(inventory.toRelationships());

console.log("\n=== Rows ===");
console.table(inventory.toRows());

console.log("\n=== Hierarchy ===");
console.dir(inventory.toHierarchy(), {
  depth: null,
});

/*
Expected Output

✓ Inventory statistics
✓ Parent/child relationships
✓ Recursive inventory traversal
✓ Root container lookup
✓ Path-to-root discovery
✓ Record lookup
✓ Container view
✓ Inventory discovery
✓ Export helpers

This example demonstrates how Axis reconstructs an in-memory
serialized inventory from EPCIS Aggregation Events.
*/