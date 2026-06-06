import { describe, expect, it } from "vitest";
import { EpcCollection } from "./EpcCollection.js";

describe("EpcCollection", () => {
  it("removes duplicate EPCs", () => {
    const collection = new EpcCollection([
      "epc1",
      "epc1",
      "epc2"
    ]);

    expect(collection.count()).toBe(2);
  });

  it("returns the first EPC", () => {
    const collection = new EpcCollection([
      "epc1",
      "epc2"
    ]);

    expect(collection.first()).toBe("epc1");
  });

  it("checks whether an EPC exists", () => {
    const collection = new EpcCollection([
      "epc1",
      "epc2"
    ]);

    expect(collection.contains("epc1")).toBe(true);
    expect(collection.contains("missing")).toBe(false);
  });
});