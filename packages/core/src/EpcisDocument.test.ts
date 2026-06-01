import { describe, expect, it } from "vitest";
import { EpcisDocument } from "./EpcisDocument.js";

describe("EpcisDocument", () => {
  it("stores events", () => {
    const doc = new EpcisDocument();

    doc.addEvent({
      toJSON: () => ({
        type: "ObjectEvent"
      })
    });

    expect(doc.events.length).toBe(1);
  });

  it("creates object events", () => {
    const doc = new EpcisDocument();

    doc.object({
      epc: "urn:epc:id:sgtin:0614141.112345.400"
    });

    expect(doc.events.length).toBe(1);
  });
});