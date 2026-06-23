import {
  EpcisDocument,
  EpcisBody,
  SerializedItem,
  createCommissioningEvent,
  createPackingEvent,
  createShippingEvent,
  validateDocument
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
        items: [pallet, caseA, caseB, bottleA, bottleB, bottleC, bottleD],
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
const caseAEpc = caseA.toEpcUri();
const bottleBEpc = bottleB.toEpcUri();

console.log("\n=== Validation ===");
console.log(validateDocument(document));

console.log("\n=== Recall Scenario ===");
console.log("Bottle B has been flagged for investigation.");
console.log(bottleBEpc);

console.log("\n=== What contains Bottle B? ===");
console.log(
  graph.ancestors(bottleBEpc).map((node) => node.epc)
);

console.log("\n=== What shipment unit contains Bottle B? ===");
console.log(
  graph.path(palletEpc, bottleBEpc).map((node) => node.epc)
);

console.log("\n=== If Case A is affected, what products are impacted? ===");
console.log(
  graph.descendants(caseAEpc).map((node) => node.epc)
);

console.log("\n=== If the full pallet is affected, what products are impacted? ===");
console.log(
  graph.descendants(palletEpc).map((node) => node.epc)
);

console.log("\n=== Traceability Graph ===");
console.log(JSON.stringify(graph.toJSON(), null, 2));

console.log("\n=== Mermaid Graph ===");
console.log(graph.toMermaid());