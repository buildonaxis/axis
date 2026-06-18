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

const pallet = SerializedItem.fromBarcode(
  "01000312345678901726123121PALLET123"
);

const caseA = SerializedItem.fromBarcode(
  "01000312345678901726123121CASEA123"
);

const caseB = SerializedItem.fromBarcode(
  "01000312345678901726123121CASEB123"
);

const bottleA = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLEA"
);

const bottleB = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLEB"
);

const bottleC = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLEC"
);

const bottleD = SerializedItem.fromBarcode(
  "01000312345678901726123121BOTTLED"
);

const document = new EpcisDocument({
  body: new EpcisBody({
    events: [
      createCommissioningEvent({
        items: [
          pallet,
          caseA,
          caseB,
          bottleA,
          bottleB,
          bottleC,
          bottleD
        ],
        location: warehouse,
        eventTime: "2026-01-01T09:00:00.000Z"
      }),

      createPackingEvent({
        parent: caseA,
        children: [bottleA, bottleB],
        location: warehouse,
        eventTime: "2026-01-01T09:15:00.000Z"
      }),

      createPackingEvent({
        parent: caseB,
        children: [bottleC, bottleD],
        location: warehouse,
        eventTime: "2026-01-01T09:20:00.000Z"
      }),

      createPackingEvent({
        parent: pallet,
        children: [caseA, caseB],
        location: warehouse,
        eventTime: "2026-01-01T09:30:00.000Z"
      }),

      createShippingEvent({
        items: [pallet],
        location: warehouse,
        eventTime: "2026-01-01T10:00:00.000Z"
      })
    ]
  })
});

const graph = document.buildTraceGraph();

const palletEpc = pallet.toEpcUri();
const bottleAEpc = bottleA.toEpcUri();

console.log("\n=== Document Stats ===");
console.log(document.stats());

console.log("\n=== Validation ===");
console.log(validateDocument(document));

console.log("\n=== What is inside this pallet? ===");
console.log(
  graph.descendants(palletEpc).map((node) => node.epc)
);

console.log("\n=== What contains Bottle A? ===");
console.log(
  graph.ancestors(bottleAEpc).map((node) => node.epc)
);

console.log("\n=== Path from Pallet to Bottle A ===");
console.log(
  graph.path(palletEpc, bottleAEpc).map((node) => node.epc)
);

console.log("\n=== Mermaid Graph ===");
console.log(graph.toMermaid());

console.log("\n=== XML Preview ===");
console.log(XmlWriter.write(document).slice(0, 1500));