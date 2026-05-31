import { describe, expect, it } from "vitest";
import { parseIdentity } from "./parseIdentity.js";

describe("parseIdentity", () => {
  it("parses GTIN and serial", () => {
    const result = parseIdentity("010003123456789021ABC123");

    expect(result.gtin).toBe("00031234567890");
    expect(result.serial).toBe("ABC123");
    expect(result.identifierType).toBe("serialized");
  });

  it("parses GTIN only", () => {
    const result = parseIdentity("0100031234567890");

    expect(result.gtin).toBe("00031234567890");
    expect(result.identifierType).toBe("unknown");
  });

  it("parses lot tracked products", () => {
    const result = parseIdentity("010003123456789010LOT123");

    expect(result.lot).toBe("LOT123");
    expect(result.identifierType).toBe("lot-tracked");
  });
});