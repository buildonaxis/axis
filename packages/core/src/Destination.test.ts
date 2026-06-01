import { describe, expect, it } from "vitest";
import { Destination } from "./Destination.js";

describe("Destination", () => {
  it("creates a destination", () => {
    const destination = new Destination({
      type: "owning_party",
      value: "urn:epc:id:pgln:0614141.99999"
    });

    expect(destination.type).toBe("owning_party");
    expect(destination.value).toBe(
      "urn:epc:id:pgln:0614141.99999"
    );
  });

  it("serializes to json", () => {
    const destination = new Destination({
      type: "location",
      value: "urn:epc:id:sgln:0614141.00002.0"
    });

    expect(destination.toJSON()).toEqual({
      type: "location",
      value: "urn:epc:id:sgln:0614141.00002.0"
    });
  });
});