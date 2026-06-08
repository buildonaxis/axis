import { XMLParser } from "fast-xml-parser";

import { EpcisBody } from "./EpcisBody.js";
import { EpcisDocument } from "./EpcisDocument.js";
import { ObjectEvent } from "./ObjectEvent.js";

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

    const objectEvents = eventList?.ObjectEvent
      ?? eventList?.["epcis:ObjectEvent"];

    if (objectEvents) {
      const normalizedEvents = Array.isArray(objectEvents)
        ? objectEvents
        : [objectEvents];

      for (const event of normalizedEvents) {
        events.push(
          new ObjectEvent({
            action: event.action ?? "OBSERVE",
            bizStep: event.bizStep,
            disposition: event.disposition,
            eventTime: event.eventTime,
            location: event.readPoint?.id,
            items: []
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