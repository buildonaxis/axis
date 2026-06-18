import { Shipment } from "./Shipment.js";
import { Aggregation } from "./Aggregation.js";
import { SerializedItem } from "./SerializedItem.js";
/**
 * @deprecated
 *
 * Legacy traceability model retained for backwards compatibility.
 *
 * New development should use:
 *
 * EpcisDocument.buildTraceGraph()
 * TraceGraph
 * TraceNode
 *
 * Future versions will replace this model with EPCIS-native graph generation.
 */
export declare class TraceabilityGraph {
    readonly shipments: Shipment[];
    readonly aggregations: Aggregation[];
    addShipment(shipment: Shipment): void;
    addAggregation(aggregation: Aggregation): void;
    shipmentCount(): number;
    aggregationCount(): number;
    findItem(epc: string): SerializedItem | undefined;
}
