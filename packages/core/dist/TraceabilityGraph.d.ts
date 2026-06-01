import { Shipment } from "./Shipment.js";
import { Aggregation } from "./Aggregation.js";
import { SerializedItem } from "./SerializedItem.js";
export declare class TraceabilityGraph {
    readonly shipments: Shipment[];
    readonly aggregations: Aggregation[];
    addShipment(shipment: Shipment): void;
    addAggregation(aggregation: Aggregation): void;
    shipmentCount(): number;
    aggregationCount(): number;
    findItem(epc: string): SerializedItem | undefined;
}
