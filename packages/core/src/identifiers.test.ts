import { describe, expect, it } from "vitest";
import {
  gtin,
  sscc,
  gln,
  serialized
} from "./identifiers.js";

describe("identifiers", () => {
  it("creates gtin", () => {
    expect(
      gtin("00312345678901")
    ).toBe("00312345678901");
  });

  it("creates sscc", () => {
    expect(
      sscc("123456789012345678")
    ).toBe("123456789012345678");
  });

  it("creates gln", () => {
    expect(
      gln("0614141000007")
    ).toBe("0614141000007");
  });

  it("creates serialized item", () => {
    const item = serialized(
      "00312345678901",
      "ABC123"
    );

    expect(item.gtin).toBe(
      "00312345678901"
    );

    expect(item.serial).toBe(
      "ABC123"
    );
  });
});