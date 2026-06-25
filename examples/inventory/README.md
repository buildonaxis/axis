# Inventory Example

This example demonstrates how to reconstruct a serialized inventory from EPCIS Aggregation Events using the Axis SDK.

Rather than manually traversing EPCIS XML, Axis builds an in-memory inventory model that can be queried using a developer-friendly API.

## What You'll Learn

This example demonstrates how to:

* Build an `InventorySnapshot` from an EPCIS document
* Traverse parent and child relationships
* Find the root container for any serialized item
* Retrieve all nested contents of a container
* Query inventory statistics
* Inspect inventory records
* Discover containers and leaf items
* Export inventory as relationships, rows, and hierarchies

## Inventory Structure

The example constructs the following inventory hierarchy:

```text
Pallet
├── Case A
│   ├── Item 1
│   └── Item 2
└── Case B
    ├── Item 3
    └── Item 4
```

## Running the Example

From the root of the repository:

```bash
pnpm tsx examples/inventory/01-build-inventory.ts
```

## Example Output

The example prints:

* Inventory statistics
* Parent/child relationships
* Recursive container contents
* Root container lookups
* Path-to-root traversal
* Inventory records
* Container views
* Inventory discovery APIs
* Export helpers

## Why This Matters

Most EPCIS libraries stop at parsing events.

Axis goes one step further by reconstructing the current serialized inventory state, allowing developers to work with inventory concepts instead of raw EPCIS data.

Instead of manually processing Aggregation Events, developers can write code such as:

```ts
const inventory = InventorySnapshot.from(document);

inventory.contentsOf(palletEpc);

inventory.rootContainerOf(itemEpc);

inventory.pathToRoot(itemEpc);

inventory.stats();
```

This dramatically simplifies building applications such as:

* Serialized inventory management
* Warehouse management systems (WMS)
* Receiving and shipping workflows
* Traceability dashboards
* Pharmaceutical supply chain applications
* DSCSA compliance solutions

---

Learn more about Axis at:

https://github.com/buildonaxis/axis
