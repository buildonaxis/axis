import {
  EpcisDocument,
  EpcisBody,
  SerializedItem,
  createCommissioningEvent,
  createPackingEvent,
  createShippingEvent,
  validateDocument,
  XmlWriter
} from "@buildonaxis/core";

const warehouse = "urn:epc:id:sgln:0031234.00001.0";

const caseItem = SerializedItem.fromBarcode(
  "01000312345678901726123121CASE123"
);

const bottleA = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLEA"
);

const bottleB = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLEB"
);

const document = new EpcisDocument({
  body: new EpcisBody({
    events: [
      createCommissioningEvent({
        items: [caseItem, bottleA, bottleB],
        location: warehouse,
        eventTime: "2026-01-01T09:00:00.000Z"
      }),

      createPackingEvent({
        parent: caseItem,
        children: [bottleA, bottleB],
        location: warehouse,
        eventTime: "2026-01-01T09:15:00.000Z"
      }),

      createShippingEvent({
        items: [caseItem],
        location: warehouse,
        eventTime: "2026-01-01T10:00:00.000Z"
      })
    ]
  })
});

console.log("\n=== Document Stats ===");
console.log(document.stats());

console.log("\n=== Validation ===");
console.log(validateDocument(document));

console.log("\n=== EPCIS JSON ===");
console.log(JSON.stringify(document.toJSON(), null, 2));

console.log("\n=== EPCIS XML ===");
console.log(XmlWriter.write(document));