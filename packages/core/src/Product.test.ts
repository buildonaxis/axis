import { describe, expect, it } from "vitest";
import { Product } from "./Product.js";

describe("Product", () => {
  it("creates a product", () => {
    const product = new Product({
      gtin: "00031234567890",
      name: "Example Drug",
      manufacturer: "Example Pharma",
      brand: "Example Brand"
    });

    expect(product.toJSON()).toEqual({
      gtin: "00031234567890",
      name: "Example Drug",
      manufacturer: "Example Pharma",
      brand: "Example Brand"
    });
  });

  it("supports minimal product data", () => {
    const product = new Product({
      gtin: "00031234567890",
      name: "Example Drug"
    });

    expect(product.gtin).toBe("00031234567890");
    expect(product.name).toBe("Example Drug");
  });
});