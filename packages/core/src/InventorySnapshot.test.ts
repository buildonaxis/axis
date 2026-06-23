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
});