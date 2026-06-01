import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { AggregationEvent } from "./AggregationEvent.js";

describe("AggregationEvent", () => {
  it("creates an aggregation event with parent and child EPCs", () => {
    const parent = SerializedItem.fromBarcode(
      "01000312345678901726123121CASE123"
    );

    const child = SerializedItem.fromBarcode(
      "01000312345678901726123121BOTTLE123"
    );

    const event = new AggregationEvent({
      action: "ADD",
      parent,
      children: [child],
      bizStep: "packing",
      location: "urn:epc:id:sgln:0031234.00001.0",
      eventTime: "2026-01-01T00:00:00.000Z"
    });

    expect(event.toJSON()).toEqual({
      eventType: "AggregationEvent",
      action: "ADD",
      parentId: "urn:epc:id:sgtin:00031234567890.CASE123",
      childEpcs: [
        "urn:epc:id:sgtin:00031234567890.BOTTLE123"
      ],
      bizStep: "packing",
      location: "urn:epc:id:sgln:0031234.00001.0",
      eventTime: "2026-01-01T00:00:00.000Z"
    });
  });
});