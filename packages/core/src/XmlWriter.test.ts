import { describe, expect, it } from "vitest";

import { EpcisDocument } from "./EpcisDocument.js";
import { XmlWriter } from "./XmlWriter.js";
import { EpcisBody } from "./EpcisBody.js";
import { SerializedItem } from "./SerializedItem.js";
import {
  createPackingEvent,
  createShippingEvent
} from "./events.js";


describe("XmlWriter", () => {
  it("writes a minimal EPCIS document", () => {
    const document = new EpcisDocument({
      schemaVersion: "2.0",
      creationDate: "2026-01-01T00:00:00.000Z"
    });

    const xml = XmlWriter.write(document);

    expect(xml).toContain("<EPCISDocument");
    expect(xml).toContain('schemaVersion="2.0"');
    expect(xml).toContain("<EPCISBody>");
    expect(xml).toContain("<EventList>");
  });

    it("writes object events", () => {
    const item = SerializedItem.fromBarcode(
      "01000312345678901726123121ABC123"
    );

    const document = new EpcisDocument({
      schemaVersion: "2.0",
      body: new EpcisBody({
        events: [
          createShippingEvent({
            items: [item],
            location: "urn:epc:id:sgln:0614141.07346.1234",
            eventTime: "2026-01-01T00:00:00.000Z"
          })
        ]
      })
    });

    const xml = XmlWriter.write(document);

    expect(xml).toContain("<ObjectEvent>");
    expect(xml).toContain(
      "<eventTime>2026-01-01T00:00:00.000Z</eventTime>"
    );
    expect(xml).toContain("<action>OBSERVE</action>");
    expect(xml).toContain("<bizStep>shipping</bizStep>");
    expect(xml).toContain("<readPoint>");
    expect(xml).toContain("<epcList>");
    expect(xml).toContain(`<epc>${item.toEpcUri()}</epc>`);
  });

    it("writes aggregation events", () => {
    const parent = SerializedItem.fromBarcode(
      "01000312345678901726123121CASE123"
    );

    const child = SerializedItem.fromBarcode(
      "01000312345678901726123121ITEM123"
    );

    const document = new EpcisDocument({
      schemaVersion: "2.0",
      body: new EpcisBody({
        events: [
          createPackingEvent({
            parent,
            children: [child],
            location: "urn:epc:id:sgln:0614141.07346.1234",
            eventTime: "2026-01-01T00:00:00.000Z"
          })
        ]
      })
    });

    const xml = XmlWriter.write(document);

    expect(xml).toContain("<AggregationEvent>");
    expect(xml).toContain(
      "<eventTime>2026-01-01T00:00:00.000Z</eventTime>"
    );
    expect(xml).toContain("<action>ADD</action>");
    expect(xml).toContain(`<parentID>${parent.toEpcUri()}</parentID>`);
    expect(xml).toContain("<childEPCs>");
    expect(xml).toContain(`<epc>${child.toEpcUri()}</epc>`);
    expect(xml).toContain("<bizStep>packing</bizStep>");
    expect(xml).toContain("<readPoint>");
  });

  
  
});