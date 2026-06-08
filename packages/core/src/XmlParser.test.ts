import { describe, expect, it } from "vitest";
import { XmlParser } from "./XmlParser.js";

describe("XmlParser", () => {
  it("parses a minimal EPCIS document", () => {
    const xml = `
      <EPCISDocument schemaVersion="2.0">
      </EPCISDocument>
    `;

    const document = XmlParser.parse(xml);

    expect(document.schemaVersion)
      .toBe("2.0");
  });

  it("throws for invalid xml", () => {
    expect(() =>
      XmlParser.parse("<hello />")
    ).toThrow(
      "Invalid EPCIS XML document"
    );
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
});