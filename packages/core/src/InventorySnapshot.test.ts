import { describe, expect, it } from "vitest";
import { InventorySnapshot } from "./InventorySnapshot";
import { AggregationEvent } from "./AggregationEvent";
import { EpcisDocument } from "./EpcisDocument";
import { SerializedItem } from "./SerializedItem";


describe("InventorySnapshot", () => {
  it("finds parent relationships", () => {
    const pallet =
      "urn:epc:id:sscc:0614141.0000000001";

    const item =
      "urn:epc:id:sgtin:0614141.112345.400";

    const inventory =
      InventorySnapshot.fromRelationships([
        {
          parentEpc: pallet,
          childEpcs: [item],
        },
      ]);

    expect(
      inventory.parentOf(item)
    ).toBe(pallet);
  });

  it("finds children relationships", () => {
    const pallet =
      "urn:epc:id:sscc:0614141.0000000001";

    const item =
      "urn:epc:id:sgtin:0614141.112345.400";

    const inventory =
      InventorySnapshot.fromRelationships([
        {
          parentEpc: pallet,
          childEpcs: [item],
        },
      ]);

    expect(
      inventory.childrenOf(pallet)
    ).toEqual([item]);
  });

  it("returns recursive contents", () => {
  const pallet = "pallet";
  const caseEpc = "case";
  const item = "item";

  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: pallet,
        childEpcs: [caseEpc],
      },
      {
        parentEpc: caseEpc,
        childEpcs: [item],
      },
    ]);

  expect(
    inventory.contentsOf(pallet)
  ).toEqual([caseEpc, item]);
    });

    it("detects containment", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.contains("pallet", "item")
  ).toBe(true);
    });

    it("finds root container", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.rootContainerOf("item")
  ).toBe("pallet");
    });

    it("returns path to root", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.pathToRoot("item")
  ).toEqual(["case", "pallet"]);
    });

    it("identifies containers", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.isContainer("pallet")
  ).toBe(true);

  expect(
    inventory.isContainer("item")
  ).toBe(false);
    });

    it("builds an inventory snapshot from an EPCIS document", () => {
  const pallet = new SerializedItem({
    gtin: "0614141000000",
    serial: "0000000001",
  });

  const item = new SerializedItem({
    gtin: "0614141112345",
    serial: "400",
  });

  const document = new EpcisDocument({
    body: {
      events: [
        new AggregationEvent({
          action: "ADD",
          parent: pallet,
          children: [item],
          bizStep: "packing",
        }),
      ],
    },
  });

  const inventory = InventorySnapshot.from(document);

  expect(inventory.parentOf(item.toEpcUri())).toBe(pallet.toEpcUri());
  expect(inventory.childrenOf(pallet.toEpcUri())).toEqual([
    item.toEpcUri(),
  ]);
  });

  it("returns all EPCs in the inventory snapshot", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
  ]);

  expect(inventory.all()).toEqual(["pallet", "case", "item"]);
  });

  it("returns item and container views", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
  ]);

  expect(inventory.containers()).toEqual(["pallet", "case"]);
  expect(inventory.items()).toEqual(["item"]);
  });

  it("returns loose items", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
    {
      parentEpc: "virtual-root",
      childEpcs: ["loose-item"],
    },
  ]);

  expect(inventory.looseItems()).toEqual([]);
  });

  it("counts inventory entities", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
  ]);

  expect(inventory.count()).toBe(3);
  expect(inventory.countContainers()).toBe(2);
  expect(inventory.countItems()).toBe(1);
  });


  it("locates an EPC within the inventory hierarchy", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
  ]);

  expect(inventory.locate("item")).toEqual({
    epc: "item",
    parentEpc: "case",
    rootContainerEpc: "pallet",
    pathToRoot: ["case", "pallet"],
  });
  });

  it("returns a subtree for a container", () => {
    const inventory = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

    expect(inventory.subtree("pallet")).toEqual({
      epc: "pallet",
      children: [
        {
          epc: "case",
          children: [
            {
              epc: "item",
              children: [],
            },
          ],
        },
      ],
    });
  });

  it("returns inventory trees from root containers", () => {
    const inventory = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet-a",
        childEpcs: ["case-a"],
      },
      {
        parentEpc: "case-a",
        childEpcs: ["item-a"],
      },
      {
        parentEpc: "pallet-b",
        childEpcs: ["item-b"],
      },
    ]);

  expect(inventory.toTree()).toEqual([
    {
      epc: "pallet-a",
      children: [
        {
          epc: "case-a",
          children: [
            {
              epc: "item-a",
              children: [],
            },
          ],
        },
      ],
    },
    {
      epc: "pallet-b",
      children: [
        {
          epc: "item-b",
          children: [],
        },
      ],
    },
  ]);
  });


  it("finds a complete inventory record", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
  ]);

  expect(inventory.find("item")).toEqual({
    epc: "item",
    parentEpc: "case",
    rootContainerEpc: "pallet",
    childEpcs: [],
    pathToRoot: ["case", "pallet"],
    isContainer: false,
  });
  });

  it("returns undefined when finding an unknown EPC", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["item"],
    },
  ]);

  expect(inventory.find("missing")).toBeUndefined();
  });

  it("returns a container view", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.container("pallet")
  ).toEqual({
    epc: "pallet",
    directChildren: ["case"],
    allContents: ["case", "item"],
    itemCount: 2,
  });
  });

it("returns undefined for non-containers", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.container("item")
  ).toBeUndefined();
  });

    it("returns all containers", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.containers()
  ).toEqual(["pallet", "case"]);
  });

    it("returns all items", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.items()
  ).toEqual(["item"]);
  });


    it("returns root containers", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

  expect(
    inventory.roots()
  ).toEqual(["pallet"]);
  });

  it("returns leaf items", () => {
  const inventory =
    InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item1", "item2"],
      },
    ]);

  expect(
    inventory.leafItems()
  ).toEqual([
    "item1",
    "item2",
  ]);
  });

  it("returns inventory statistics", () => {
  const inventory = InventorySnapshot.fromRelationships([
    {
      parentEpc: "pallet",
      childEpcs: ["case"],
    },
    {
      parentEpc: "case",
      childEpcs: ["item"],
    },
  ]);

  const stats = inventory.stats();

  expect(stats.totalEpcs).toBe(3);
  expect(stats.containers).toBe(2);
  expect(stats.items).toBe(1);
  expect(stats.leafItems).toBe(1);
  expect(stats.rootContainers).toBe(1);
  });

  it("calculates inventory deltas", () => {
    const before = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet1",
        childEpcs: ["item1", "item2"],
      },
    ]);

    const after = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet2",
        childEpcs: ["item2", "item3"],
      },
    ]);

    const delta = after.diff(before);

    expect(delta.added).toEqual(expect.arrayContaining(["item3", "pallet2"]));
    expect(delta.added).toHaveLength(2);

    expect(delta.removed).toEqual(expect.arrayContaining(["pallet1", "item1"]));
    expect(delta.removed).toHaveLength(2);

    expect(delta.moved).toContainEqual({
      epc: "item2",
      from: "pallet1",
      to: "pallet2",
    });
  });

  it("exports relationships", () => {
    const inventory = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["item"],
      },
    ]);

    expect(inventory.toRelationships()).toEqual([
      {
        parentEpc: "pallet",
        childEpcs: ["item"],
      },
    ]);
  });

  it("exports inventory rows", () => {
    const inventory = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["item"],
      },
    ]);

    const rows = inventory.toRows();

    expect(rows).toContainEqual({
      epc: "item",
      parentEpc: "pallet",
      rootContainerEpc: "pallet",
      childEpcs: [],
      childCount: 0,
      isContainer: false,
    });

    expect(rows).toContainEqual({
      epc: "pallet",
      parentEpc: undefined,
      rootContainerEpc: undefined,
      childEpcs: ["item"],
      childCount: 1,
      isContainer: true,
    });
  });

  it("exports hierarchy", () => {
    const inventory = InventorySnapshot.fromRelationships([
      {
        parentEpc: "pallet",
        childEpcs: ["case"],
      },
      {
        parentEpc: "case",
        childEpcs: ["item"],
      },
    ]);

    const tree = inventory.toHierarchy();

    expect(tree).toHaveLength(1);
    expect(tree[0].epc).toBe("pallet");
    expect(tree[0].children[0].epc).toBe("case");
    expect(tree[0].children[0].children[0].epc).toBe("item");
  });

});