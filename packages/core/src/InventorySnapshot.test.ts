import { describe, expect, it } from "vitest";
import { InventorySnapshot } from "./InventorySnapshot";

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

});