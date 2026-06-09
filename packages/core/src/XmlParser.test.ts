import { describe, expect, it } from "vitest";

import { EpcisBody } from "./EpcisBody.js";
import { EpcisDocument } from "./EpcisDocument.js";
import { SerializedItem } from "./SerializedItem.js";
import { XmlParser } from "./XmlParser.js";
import { XmlWriter } from "./XmlWriter.js";
import {
  createPackingEvent,
  createShippingEvent
} from "./events.js";

describe("XmlParser", () => {
  it("parses a minimal EPCIS document", () => {
    const xml = `
      <EPCISDocument schemaVersion="2.0">
      </EPCISDocument>
    `;

    const document = XmlParser.parse(xml);

    expect(document.schemaVersion).toBe("2.0");
  });

  it("throws for invalid xml", () => {
    expect(() =>
      XmlParser.parse("<hello />")
    ).toThrow("Invalid EPCIS XML document");
  });

  it("parses an ObjectEvent from XML", () => {
    const xml = `
      <EPCISDocument schemaVersion="2.0">
        <EPCISBody>
          <EventList>
            <ObjectEvent>
              <eventTime>2026-01-01T00:00:00.000Z</eventTime>
              <action>OBSERVE</action>
              <bizStep>shipping</bizStep>
              <disposition>in_transit</disposition>
            </ObjectEvent>
          </EventList>
        </EPCISBody>
      </EPCISDocument>
    `;

    const document = XmlParser.parse(xml);

    expect(document.events().count()).toBe(1);

    const event = document.events().first();

    expect(event?.eventType).toBe("ObjectEvent");
    expect(event?.eventTime).toBe("2026-01-01T00:00:00.000Z");
  });

  it("round trips an aggregation event", () => {
  const parent = SerializedItem.fromBarcode(
    "01000312345678901726123121CASE123"
  );

  const child = SerializedItem.fromBarcode(
    "01000312345678901726123121ITEM123"
  );

  const original = new EpcisDocument({
    schemaVersion: "2.0",
    body: new EpcisBody({
      events: [
        createPackingEvent({
          parent,
          children: [child],
          eventTime: "2026-01-01T00:00:00.000Z",
          location: "warehouse"
        })
      ]
    })
  });

  const xml = XmlWriter.write(original);
  const parsed = XmlParser.parse(xml);

  expect(parsed.events().count()).toBe(1);

  const event = parsed.events().first();

  expect(event?.toJSON()).toMatchObject({
    eventType: "AggregationEvent",
    action: "ADD",
    bizStep: "packing",
    eventTime: "2026-01-01T00:00:00.000Z",
    location: "warehouse",
    parentId: parent.toEpcUri(),
    childEpcs: [child.toEpcUri()]
  });
});

  it("round trips an object event", () => {
    const item = SerializedItem.fromBarcode(
      "01000312345678901726123121ABC123"
    );

    const original = new EpcisDocument({
      schemaVersion: "2.0",
      body: new EpcisBody({
        events: [
          createShippingEvent({
            items: [item],
            eventTime: "2026-01-01T00:00:00.000Z",
            location: "warehouse"
          })
        ]
      })
    });

    const xml = XmlWriter.write(original);
    const parsed = XmlParser.parse(xml);

    expect(parsed.schemaVersion).toBe(original.schemaVersion);
    expect(parsed.events().count()).toBe(1);

    const event = parsed.events().first();

    expect(event?.toJSON()).toMatchObject({
      eventType: "ObjectEvent",
      action: "OBSERVE",
      bizStep: "shipping",
      eventTime: "2026-01-01T00:00:00.000Z",
      location: "warehouse"
    });
    expect(event?.toJSON()).toMatchObject({
      epcList: [
        item.toEpcUri()
      ]
    });
  });

  



});