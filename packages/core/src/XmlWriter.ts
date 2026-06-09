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

        if (json.eventType === "TransformationEvent") {
          return XmlWriter.writeTransformationEvent(json);
        }

        if (json.eventType === "TransactionEvent") {
          return XmlWriter.writeTransactionEvent(json);
        }

        return "";
      })
      .filter(Boolean)
      .join("\n");

      const header = document.header
      ? XmlWriter.writeHeader(document.header.toJSON())
      : "";

    return [
      `<EPCISDocument schemaVersion="${document.schemaVersion}">`,
      header,
      "  <EPCISBody>",
      "    <EventList>",
      events,
      "    </EventList>",
      "  </EPCISBody>",
      "</EPCISDocument>"
    ]
      .filter(Boolean)
      .join("\n");
  }

  private static writeHeader(header: {
    epcisMasterData?: {
      vocabularyList?: {
        type: string;
        vocabularyElementList: {
          id: string;
          attributes: {
            id: string;
            value: unknown;
          }[];
        }[];
      }[];
    };
  }): string {
    const vocabularies =
      header.epcisMasterData?.vocabularyList ?? [];

    const lines = [
      "  <EPCISHeader>",
      "    <extension>",
      "      <EPCISMasterData>",
      "        <VocabularyList>"
    ];

    for (const vocabulary of vocabularies) {
      lines.push(
        `          <Vocabulary type="${vocabulary.type}">`
      );
      lines.push("            <VocabularyElementList>");

      for (const element of vocabulary.vocabularyElementList) {
        lines.push(
          `              <VocabularyElement id="${element.id}">`
        );

        for (const attribute of element.attributes) {
          lines.push(
            `                <attribute id="${attribute.id}">${String(attribute.value)}</attribute>`
          );
        }

        lines.push("              </VocabularyElement>");
      }

      lines.push("            </VocabularyElementList>");
      lines.push("          </Vocabulary>");
    }

    lines.push("        </VocabularyList>");
    lines.push("      </EPCISMasterData>");
    lines.push("    </extension>");
    lines.push("  </EPCISHeader>");

    return lines.join("\n");
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

  private static writeTransformationEvent(event: {
  eventTime: string;
  bizStep?: string;
  disposition?: string;
  inputEPCList: string[];
  outputEPCList: string[];
}): string {
  const lines = [
    "      <TransformationEvent>",
    `        <eventTime>${event.eventTime}</eventTime>`
  ];

  lines.push("        <inputEPCList>");
  for (const epc of event.inputEPCList) {
    lines.push(`          <epc>${epc}</epc>`);
  }
  lines.push("        </inputEPCList>");

  lines.push("        <outputEPCList>");
  for (const epc of event.outputEPCList) {
    lines.push(`          <epc>${epc}</epc>`);
  }
  lines.push("        </outputEPCList>");

  if (event.bizStep) {
    lines.push(`        <bizStep>${event.bizStep}</bizStep>`);
  }

  if (event.disposition) {
    lines.push(`        <disposition>${event.disposition}</disposition>`);
  }

  lines.push("      </TransformationEvent>");

  return lines.join("\n");
}

private static writeTransactionEvent(event: {
  action: string;
  bizStep?: string;
  disposition?: string;
  location?: string;
  eventTime: string;
  epcList: string[];
  bizTransactionList: {
    type: string;
    id: string;
  }[];
}): string {
  const lines = [
    "      <TransactionEvent>",
    `        <eventTime>${event.eventTime}</eventTime>`,
    `        <action>${event.action}</action>`
  ];

  if (event.bizStep) {
    lines.push(
      `        <bizStep>${event.bizStep}</bizStep>`
    );
  }

  if (event.disposition) {
    lines.push(
      `        <disposition>${event.disposition}</disposition>`
    );
  }

  if (event.location) {
    lines.push("        <readPoint>");
    lines.push(
      `          <id>${event.location}</id>`
    );
    lines.push("        </readPoint>");
  }

  lines.push("        <epcList>");

  for (const epc of event.epcList) {
    lines.push(`          <epc>${epc}</epc>`);
  }

  lines.push("        </epcList>");

  lines.push("        <bizTransactionList>");

  for (const tx of event.bizTransactionList) {
    lines.push(
      `          <bizTransaction type="${tx.type}">${tx.id}</bizTransaction>`
    );
  }

  lines.push("        </bizTransactionList>");

  lines.push("      </TransactionEvent>");

  return lines.join("\n");
}


}