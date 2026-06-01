import { Shipment } from "./Shipment.js";
import { Aggregation } from "./Aggregation.js";
import { SerializedItem } from "./SerializedItem.js";

export class TraceabilityGraph {
  readonly shipments: Shipment[] = [];
  readonly aggregations: Aggregation[] = [];

  addShipment(shipment: Shipment): void {
    this.shipments.push(shipment);
  }

  addAggregation(aggregation: Aggregation): void {
    this.aggregations.push(aggregation);
  }

  shipmentCount(): number {
    return this.shipments.length;
  }

  aggregationCount(): number {
    return this.aggregations.length;
  }

  findItem(epc: string): SerializedItem | undefined {
    for (const aggregation of this.aggregations) {
      if (aggregation.parent.toEpcUri() === epc) {
        return aggregation.parent;
      }

      const child = aggregation.children.find(
        (item) => item.toEpcUri() === epc
      );

      if (child) {
        return child;
      }
    }

    return undefined;
  }
}