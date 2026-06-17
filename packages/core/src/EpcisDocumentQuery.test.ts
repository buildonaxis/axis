import { describe, expect, it } from "vitest";
import { EpcisDocument } from "./EpcisDocument.js";
import { EpcisBody } from "./EpcisBody.js";
import {
  createShippingEvent,
  createPackingEvent,
  createTransformationEvent
} from "./events.js";
import { SerializedItem } from "./SerializedItem.js";

describe("EpcisDocument query helpers", () => {

  it("finds events by biz step", () => {
    const item = SerializedItem.fromBarcode(
      "010003123456789017261231ABC123"
    );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({ items: [item] })
        ]
      })
    });

    expect(
      document.eventsByBizStep("shipping")
    ).toHaveLength(1);
  });

  it("finds events by action", () => {
    const item = SerializedItem.fromBarcode(
      "010003123456789017261231ABC123"
    );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({ items: [item] })
        ]
      })
    });

    expect(
      document.eventsByAction("OBSERVE")
    ).toHaveLength(1);
  });

  it("finds events by type", () => {
    const item = SerializedItem.fromBarcode(
      "010003123456789017261231ABC123"
    );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({ items: [item] })
        ]
      })
    });

    expect(
      document.eventsByType("ObjectEvent")
    ).toHaveLength(1);
  });

  it("returns document statistics", () => {
    const item = SerializedItem.fromBarcode(
      "010003123456789017261231ABC123"
    );

    const parent = SerializedItem.fromBarcode(
      "010003123456789017261231CASE123"
    );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({
            items: [item]
          }),
          createPackingEvent({
            parent,
            children: [item]
          }),
          createTransformationEvent({
            inputItems: [item],
            outputItems: [item]
          })
        ]
      })
    });

    const stats = document.stats();

    expect(stats.totalEvents).toBe(3);
    expect(stats.objectEvents).toBe(1);
    expect(stats.aggregationEvents).toBe(1);
    expect(stats.transformationEvents).toBe(1);
  });

});