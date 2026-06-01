import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { TraceEvent } from "./TraceEvent.js";

describe("TraceEvent", () => {
  it("creates an object event from serialized items", () => {
    const item = SerializedItem.fromBarcode(
      "01000312345678901726123110LOT12321ABC123"
    );

    const event = new TraceEvent({
      action: "OBSERVE",
      bizStep: "receiving",
      location: "urn:epc:id:sgln:0031234.00001.0",
      items: [item],
      eventTime: "2026-01-01T00:00:00.000Z"
    });

    expect(event.toJSON()).toEqual({
      eventType: "ObjectEvent",
      action: "OBSERVE",
      bizStep: "receiving",
      disposition: undefined,
      location: "urn:epc:id:sgln:0031234.00001.0",
      eventTime: "2026-01-01T00:00:00.000Z",
      epcList: [
        "urn:epc:id:sgtin:00031234567890.ABC123"
      ]
    });
  });
});