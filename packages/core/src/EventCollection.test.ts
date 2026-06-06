import { describe, expect, it } from "vitest";
import { EpcCollection } from "./EpcCollection.js";

describe("EpcCollection", () => {
  it("removes duplicates", () => {
    const collection = new EpcCollection([
      "epc1",
      "epc1",
      "epc2"
    ]);

    expect(collection.count()).toBe(2);
  });

  it("checks containment", () => {
    const collection = new EpcCollection([
      "epc1",
      "epc2"
    ]);

    expect(collection.contains("epc1")).toBe(true);
    expect(collection.contains("missing")).toBe(false);
  });
});