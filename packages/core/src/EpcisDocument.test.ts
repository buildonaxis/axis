import { describe, expect, it } from "vitest";
import { EpcisDocument } from "./EpcisDocument.js";
import { EpcisBody } from "./EpcisBody.js";
import { EpcisHeader } from "./EpcisHeader.js";
import { MasterDataDocument } from "./MasterDataDocument.js";
import { SerializedItem } from "./SerializedItem.js";
import {
  createPackingEvent,
  createShippingEvent
} from "./events.js";

describe("EpcisDocument", () => {
  it("creates with default body", () => {
    const doc = new EpcisDocument();

    expect(doc.body).toBeDefined();
    expect(doc.body.events).toHaveLength(0);
  });

  it("stores header and body", () => {
    const header = new EpcisHeader({
      masterData: new MasterDataDocument()
    });

    const body = new EpcisBody();

    const doc = new EpcisDocument({
      header,
      body
    });

    expect(doc.header).toBe(header);
    expect(doc.body).toBe(body);
  });

  it("serializes as an EPCIS document", () => {
    const doc = new EpcisDocument();

    expect(doc.toJSON()).toHaveProperty("type", "EPCISDocument");
    expect(doc.toJSON()).toHaveProperty("schemaVersion", "2.0");
    expect(doc.toJSON()).toHaveProperty("epcisBody");
  });

  it("throws for invalid input", () => {
    expect(() => EpcisDocument.parse(null)).toThrow(
      "Invalid EPCIS document"
    );
  });

  it("parses a minimal EPCIS document", () => {
    const json = {
      type: "EPCISDocument",
      schemaVersion: "2.0",
      creationDate: "2025-01-01T00:00:00.000Z",
      epcisBody: {
        eventList: []
      }
    };

    const doc = EpcisDocument.parse(json);

    expect(doc.schemaVersion).toBe("2.0");
    expect(doc.body.events.length).toBe(0);
  });

  it("round trips a minimal EPCIS document", () => {
    const original = new EpcisDocument({
      schemaVersion: "2.0",
      creationDate: "2025-01-01T00:00:00.000Z",
      body: new EpcisBody()
    });

    const json = original.toJSON();
    const parsed = EpcisDocument.parse(json);

    expect(parsed.toJSON()).toEqual(json);
  });

  it("returns all EPCs in a document", () => {
    const item = SerializedItem.fromBarcode(
      "01000312345678901726123121ABC123"
    );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({
            items: [item]
          })
        ]
      })
    });

    const epcs = document.allEpcs();
    const epc = item.toEpcUri();

    expect(epc).toBeDefined();
    expect(epcs.count()).toBe(1);
    expect(epcs.contains(epc!)).toBe(true);
  });

  it("builds a trace graph", () => {
  const item = SerializedItem.fromBarcode(
    "01000312345678901726123121ABC123"
  );

  const document = new EpcisDocument({
    body: new EpcisBody({
      events: [
        createShippingEvent({
          items: [item]
        })
      ]
    })
  });

  const graph = document.buildTraceGraph();

  expect(graph.count()).toBe(1);

  const node = graph.node(item.toEpcUri()!);

  expect(node).toBeDefined();
  expect(node?.eventCount()).toBe(1);
});

  it("builds trace graph relationships from aggregation events", () => {
    const parent = SerializedItem.fromBarcode(
      "01000312345678901726123121CASE123"
    );

    const child = SerializedItem.fromBarcode(
      "01000312345678901726123121ITEM123"
    );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createPackingEvent({
            parent,
            children: [child]
          })
        ]
      })
    });

    const graph = document.buildTraceGraph();

    const parentNode = graph.node(parent.toEpcUri()!);
    const childNode = graph.node(child.toEpcUri()!);

    expect(parentNode).toBeDefined();
    expect(childNode).toBeDefined();

    expect(parentNode?.childCount()).toBe(1);
    expect(childNode?.parentCount()).toBe(1);
    expect(childNode?.parents[0]).toBe(parentNode);
  });
});