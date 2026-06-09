import { XMLParser } from "fast-xml-parser";

import { EpcisBody } from "./EpcisBody.js";
import { EpcisDocument } from "./EpcisDocument.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { SerializedItem } from "./SerializedItem.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";
import { EpcisHeader } from "./EpcisHeader.js";
import { MasterDataDocument } from "./MasterDataDocument.js";
import { Vocabulary } from "./Vocabulary.js";
import { VocabularyElement } from "./VocabularyElement.js";

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

    const headerRoot =
      root.EPCISHeader ??
      root["epcis:EPCISHeader"];

    const masterDataRoot =
      headerRoot?.extension?.EPCISMasterData ??
      headerRoot?.extension?.["epcis:EPCISMasterData"];

    const vocabularyList =
      masterDataRoot?.VocabularyList ??
      masterDataRoot?.["epcis:VocabularyList"];

    const vocabularies = normalizeArray(
      vocabularyList?.Vocabulary ??
      vocabularyList?.["epcis:Vocabulary"]
    );

    const header =
      vocabularies.length > 0
        ? new EpcisHeader({
            masterData: new MasterDataDocument({
              vocabularies: vocabularies.map((vocabulary) => {
                const elements = normalizeArray(
                  vocabulary.VocabularyElementList?.VocabularyElement ??
                    vocabulary.VocabularyElementList?.[
                      "epcis:VocabularyElement"
                    ]
                );

                return new Vocabulary({
                  type: vocabulary["@_type"],
                  elements: elements.map((element) => {
                    const attributes = normalizeArray(
                      element.attribute ??
                        element["epcis:attribute"]
                    );

                    return new VocabularyElement({
                      id: element["@_id"],
                      attributes: attributes.map((attribute) => ({
                        id: attribute["@_id"],
                        value: attribute["#text"] ?? attribute
                      }))
                    });
                  })
                });
              })
            })
          })
        : undefined;

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

    const transformationEvents =
  eventList?.TransformationEvent ??
  eventList?.["epcis:TransformationEvent"];

  if (transformationEvents) {
    const normalizedEvents =
      normalizeArray(transformationEvents);

    for (const event of normalizedEvents) {
      const inputEpcs = normalizeArray<string>(
        event.inputEPCList?.epc
      );

      const outputEpcs = normalizeArray<string>(
        event.outputEPCList?.epc
      );

      events.push(
        new TransformationEvent({
          eventTime: event.eventTime,
          bizStep: event.bizStep,
          disposition: event.disposition,
          inputItems: inputEpcs.map((epc) =>
            itemFromEpcUri(epc)
          ),
          outputItems: outputEpcs.map((epc) =>
            itemFromEpcUri(epc)
          )
        })
      );
    }
  }


  const transactionEvents =
  eventList?.TransactionEvent ??
  eventList?.["epcis:TransactionEvent"];

    if (transactionEvents) {
      const normalizedEvents =
        normalizeArray(transactionEvents);

      for (const event of normalizedEvents) {
        const epcs =
          normalizeArray<string>(
            event.epcList?.epc
          );

        const transactions =
          normalizeArray(
            event.bizTransactionList?.bizTransaction
          );

        events.push(
          new TransactionEvent({
            action: event.action ?? "OBSERVE",
            bizStep: event.bizStep,
            disposition: event.disposition,
            location: event.readPoint?.id,
            eventTime: event.eventTime,
            items: epcs.map((epc) =>
              itemFromEpcUri(epc)
            ),
            transactions: transactions.map(
              (tx) => ({
                type: tx["@_type"],
                id: tx["#text"] ?? tx
              })
            )
          })
        );
      }
    }


  return new EpcisDocument({
    schemaVersion:
      root["@_schemaVersion"] ?? "2.0",
    header,
    body: new EpcisBody({
      events
    })
  });
  }
}