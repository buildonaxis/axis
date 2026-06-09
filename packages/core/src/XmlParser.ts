import { XMLParser } from "fast-xml-parser";

import { EpcisBody } from "./EpcisBody.js";
import { EpcisDocument } from "./EpcisDocument.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { SerializedItem } from "./SerializedItem.js";
import { AggregationEvent } from "./AggregationEvent.js";

function itemFromEpcUri(epc: string): SerializedItem {
  const prefix = "urn:epc:id:sgtin:";
  const value = epc.startsWith(prefix)
    ? epc.slice(prefix.length)
    : epc;

  const parts = value.split(".");

  const gtin =
    parts.length === 3
      ? `${parts[0]}.${parts[1]}`
      : parts[0];

  const serial =
    parts.length === 3
      ? parts[2]
      : parts[1];

  return new SerializedItem({
    raw: epc,
    identifierType: "serialized",
    gtin,
    serial
  });
}

function normalizeArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export class XmlParser {
  static parse(xml: string): EpcisDocument {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });

    const parsed = parser.parse(xml);

    const root =
      parsed.EPCISDocument ??
      parsed["epcis:EPCISDocument"];

    if (!root) {
      throw new Error(
        "Invalid EPCIS XML document"
      );
    }

    const eventList =
      root.EPCISBody?.EventList ??
      root["epcis:EPCISBody"]?.["epcis:EventList"] ??
      root["epcis:EPCISBody"]?.EventList ??
      root.EPCISBody?.["epcis:EventList"];

    const events = [];

    const objectEvents =
      eventList?.ObjectEvent ??
      eventList?.["epcis:ObjectEvent"];

    if (objectEvents) {
      const normalizedEvents = normalizeArray(objectEvents);

      for (const event of normalizedEvents) {
        const epcs = normalizeArray<string>(
          event.epcList?.epc
        );

        events.push(
          new ObjectEvent({
            action: event.action ?? "OBSERVE",
            bizStep: event.bizStep,
            disposition: event.disposition,
            eventTime: event.eventTime,
            location: event.readPoint?.id,
            items: epcs.map((epc) =>
              itemFromEpcUri(epc)
            )
          })
        );
      }
    }

    const aggregationEvents =
  eventList?.AggregationEvent ??
  eventList?.["epcis:AggregationEvent"];

    if (aggregationEvents) {
      const normalizedEvents =
        normalizeArray(aggregationEvents);

      for (const event of normalizedEvents) {
        const childEpcs = normalizeArray<string>(
          event.childEPCs?.epc
        );

        events.push(
          new AggregationEvent({
            action: event.action ?? "ADD",
            parent: itemFromEpcUri(event.parentID),
            children: childEpcs.map((epc) =>
              itemFromEpcUri(epc)
            ),
            bizStep: event.bizStep,
            location: event.readPoint?.id,
            eventTime: event.eventTime
          })
        );
      }
    }


    return new EpcisDocument({
      schemaVersion:
        root["@_schemaVersion"] ?? "2.0",
      body: new EpcisBody({
        events
      })
    });
  }
}