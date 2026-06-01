import { describe, expect, it } from "vitest";
import { QuantityElement } from "./QuantityElement.js";

describe("QuantityElement", () => {
  it("creates a quantity element", () => {
    const quantity = new QuantityElement({
      epcClass: "urn:epc:idpat:sgtin:0614141.011111.*",
      quantity: 500,
      uom: "KGM"
    });

    expect(quantity.epcClass).toBe(
      "urn:epc:idpat:sgtin:0614141.011111.*"
    );

    expect(quantity.quantity).toBe(500);
    expect(quantity.uom).toBe("KGM");
  });

  it("supports quantity without uom", () => {
    const quantity = new QuantityElement({
      epcClass: "urn:epc:idpat:sgtin:0614141.011111.*",
      quantity: 25
    });

    expect(quantity.quantity).toBe(25);
  });
});