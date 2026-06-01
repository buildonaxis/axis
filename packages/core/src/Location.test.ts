import { describe, expect, it } from "vitest";
import { Location } from "./Location.js";

describe("Location", () => {
  it("creates SGLN URIs", () => {
    const location = new Location(
      "0614141.12345.0",
      "Warehouse A"
    );

    expect(location.toSgln()).toBe(
      "urn:epc:id:sgln:0614141.12345.0"
    );
  });

  it("serializes to JSON", () => {
    const location = new Location(
      "0614141.12345.0",
      "Warehouse A"
    );

    expect(location.toJSON()).toEqual({
      gln: "0614141.12345.0",
      sgln: "urn:epc:id:sgln:0614141.12345.0",
      name: "Warehouse A"
    });
  });
});