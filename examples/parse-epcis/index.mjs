import {
  XmlParser,
  validateDocument
} from "@buildonaxis/core";

const xml = `
<EPCISDocument schemaVersion="2.0">
  <EPCISBody>
    <EventList>
      <ObjectEvent>
        <eventTime>2026-01-01T09:00:00.000Z</eventTime>
        <action>ADD</action>
        <bizStep>commissioning</bizStep>
        <readPoint>
          <id>urn:epc:id:sgln:0031234.00001.0</id>
        </readPoint>
        <epcList>
          <epc>urn:epc:id:sgtin:00031234567890.CASE123</epc>
          <epc>urn:epc:id:sgtin:00031234567890.BOTTLEA</epc>
          <epc>urn:epc:id:sgtin:00031234567890.BOTTLEB</epc>
        </epcList>
      </ObjectEvent>

      <AggregationEvent>
        <eventTime>2026-01-01T09:15:00.000Z</eventTime>
        <action>ADD</action>
        <parentID>urn:epc:id:sgtin:00031234567890.CASE123</parentID>
        <childEPCs>
          <epc>urn:epc:id:sgtin:00031234567890.BOTTLEA</epc>
          <epc>urn:epc:id:sgtin:00031234567890.BOTTLEB</epc>
        </childEPCs>
        <bizStep>packing</bizStep>
        <readPoint>
          <id>urn:epc:id:sgln:0031234.00001.0</id>
        </readPoint>
      </AggregationEvent>

      <ObjectEvent>
        <eventTime>2026-01-01T10:00:00.000Z</eventTime>
        <action>OBSERVE</action>
        <bizStep>shipping</bizStep>
        <readPoint>
          <id>urn:epc:id:sgln:0031234.00001.0</id>
        </readPoint>
        <epcList>
          <epc>urn:epc:id:sgtin:00031234567890.CASE123</epc>
        </epcList>
      </ObjectEvent>
    </EventList>
  </EPCISBody>
</EPCISDocument>
`;

const document = XmlParser.parse(xml);

console.log("\n=== Parsed Document Stats ===");
console.log(document.stats());

console.log("\n=== Validation ===");
console.log(validateDocument(document));

console.log("\n=== All EPCs ===");
console.log(document.allEpcs().toArray());

console.log("\n=== Shipping Events ===");

const shippingEvents =
  document.eventsByBizStep("shipping");

console.log(
  shippingEvents.map((event) => event.toJSON())
);

const graph = document.buildTraceGraph();

console.log("\n=== Traceability Graph ===");
console.log(graph.toJSON());

console.log("\n=== Mermaid Graph ===");
console.log(graph.toMermaid());