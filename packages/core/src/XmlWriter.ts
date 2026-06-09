import { EpcisDocument } from "./EpcisDocument.js";

export class XmlWriter {
  static write(document: EpcisDocument): string {
    const events = document.body.events
      .map((event) => {
        const json = event.toJSON();

        if (json.eventType === "ObjectEvent") {
          return XmlWriter.writeObjectEvent(json);
        }

        if (json.eventType === "AggregationEvent") {
          return XmlWriter.writeAggregationEvent(json);
        }

        return "";
      })
      .filter(Boolean)
      .join("\n");

    return [
      `<EPCISDocument schemaVersion="${document.schemaVersion}">`,
      "  <EPCISBody>",
      "    <EventList>",
      events,
      "    </EventList>",
      "  </EPCISBody>",
      "</EPCISDocument>"
    ].join("\n");
  }

  private static writeObjectEvent(event: {
    action: string;
    bizStep?: string;
    disposition?: string;
    eventTime: string;
    location?: string;
    epcList: string[];
  }): string {
    const lines = [
      "      <ObjectEvent>",
      `        <eventTime>${event.eventTime}</eventTime>`,
      `        <action>${event.action}</action>`
    ];

    if (event.bizStep) {
      lines.push(`        <bizStep>${event.bizStep}</bizStep>`);
    }

    if (event.disposition) {
      lines.push(`        <disposition>${event.disposition}</disposition>`);
    }

    if (event.location) {
      lines.push("        <readPoint>");
      lines.push(`          <id>${event.location}</id>`);
      lines.push("        </readPoint>");
    }

    lines.push("        <epcList>");

    for (const epc of event.epcList) {
      lines.push(`          <epc>${epc}</epc>`);
    }

    lines.push("        </epcList>");
    lines.push("      </ObjectEvent>");

    return lines.join("\n");
  }

  private static writeAggregationEvent(event: {
    action: string;
    parentId?: string;
    childEpcs: string[];
    bizStep?: string;
    location?: string;
    eventTime: string;
  }): string {
    const lines = [
      "      <AggregationEvent>",
      `        <eventTime>${event.eventTime}</eventTime>`,
      `        <action>${event.action}</action>`
    ];

    if (event.parentId) {
      lines.push(`        <parentID>${event.parentId}</parentID>`);
    }

    lines.push("        <childEPCs>");

    for (const childEpc of event.childEpcs) {
      lines.push(`          <epc>${childEpc}</epc>`);
    }

    lines.push("        </childEPCs>");

    if (event.bizStep) {
      lines.push(`        <bizStep>${event.bizStep}</bizStep>`);
    }

    if (event.location) {
      lines.push("        <readPoint>");
      lines.push(`          <id>${event.location}</id>`);
      lines.push("        </readPoint>");
    }

    lines.push("      </AggregationEvent>");

    return lines.join("\n");
  }
}