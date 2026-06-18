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
export class TraceabilityGraph {
    shipments = [];
    aggregations = [];
    addShipment(shipment) {
        this.shipments.push(shipment);
    }
    addAggregation(aggregation) {
        this.aggregations.push(aggregation);
    }
    shipmentCount() {
        return this.shipments.length;
    }
    aggregationCount() {
        return this.aggregations.length;
    }
    findItem(epc) {
        for (const aggregation of this.aggregations) {
            if (aggregation.parent.toEpcUri() === epc) {
                return aggregation.parent;
            }
            const child = aggregation.children.find((item) => item.toEpcUri() === epc);
            if (child) {
                return child;
            }
        }
        return undefined;
    }
}
