import { describe, expect, it } from "vitest";

import { TraceabilityGraph } from "./TraceabilityGraph.js";
import { Shipment } from "./Shipment.js";
import { Location } from "./Location.js";
import { SerializedItem } from "./SerializedItem.js";
import { Aggregation } from "./Aggregation.js";

describe("TraceabilityGraph", () => {
  it("stores shipments", () => {
    const graph = new TraceabilityGraph();

    const shipment = new Shipment({
      from: new Location("1111111.00001.0"),
      to: new Location("2222222.00001.0"),
      items: []
    });

    graph.addShipment(shipment);

    expect(graph.shipmentCount()).toBe(1);
  });

  it("stores aggregations", () => {
    const graph = new TraceabilityGraph();

    const parent = SerializedItem.fromBarcode(
      "010031234567890121ABC123"
    );

    const child = SerializedItem.fromBarcode(
      "010031234567890121DEF456"
    );

    const aggregation = new Aggregation(
      parent,
      [child]
    );

    graph.addAggregation(aggregation);

    expect(graph.aggregationCount()).toBe(1);
  });
});

it("finds items by epc", () => {
  const graph = new TraceabilityGraph();

  const parent = SerializedItem.fromBarcode(
    "010031234567890121ABC123"
  );

  const child = SerializedItem.fromBarcode(
    "010031234567890121DEF456"
  );

  graph.addAggregation(
    new Aggregation(parent, [child])
  );

  const result = graph.findItem(
    child.toEpcUri()!
  );

  expect(result).toBeDefined();
  expect(result?.serial).toBe("DEF456");
});