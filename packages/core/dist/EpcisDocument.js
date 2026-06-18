import { EpcisBody } from "./EpcisBody.js";
import { EventCollection } from "./EventCollection.js";
import { Trace } from "./Trace.js";
import { EpcCollection } from "./EpcCollection.js";
import { extractEpcs } from "./extractEpcs.js";
import { TraceGraph } from "./TraceGraph.js";
import { TraceNode } from "./TraceNode.js";
export class EpcisDocument {
    header;
    body;
    schemaVersion;
    creationDate;
    constructor(input = {}) {
        this.header = input.header;
        this.body = input.body ?? new EpcisBody();
        this.schemaVersion = input.schemaVersion ?? "2.0";
        this.creationDate =
            input.creationDate ?? new Date().toISOString();
    }
    events() {
        return new EventCollection(this.body.events);
    }
    eventsByBizStep(bizStep) {
        return this.body.events.filter((event) => event.bizStep === bizStep);
    }
    eventsByAction(action) {
        return this.body.events.filter((event) => "action" in event &&
            event.action === action);
    }
    eventsByType(type) {
        return this.body.events.filter((event) => event.eventType === type);
    }
    stats() {
        const events = this.body.events;
        return {
            totalEvents: events.length,
            objectEvents: events.filter((event) => event.eventType === "ObjectEvent").length,
            aggregationEvents: events.filter((event) => event.eventType === "AggregationEvent").length,
            transformationEvents: events.filter((event) => event.eventType === "TransformationEvent").length,
            transactionEvents: events.filter((event) => event.eventType === "TransactionEvent").length,
            associationEvents: events.filter((event) => event.eventType === "AssociationEvent").length
        };
    }
    findEPC(epc) {
        return this.events().whereEpc(epc);
    }
    trace(epc) {
        return new Trace(epc, this.findEPC(epc).toArray());
    }
    allEpcs() {
        const epcs = new Set();
        for (const event of this.body.events) {
            for (const epc of extractEpcs(event)) {
                epcs.add(epc);
            }
        }
        return new EpcCollection([...epcs]);
    }
    buildTraceGraph() {
        const graph = new TraceGraph();
        for (const epc of this.allEpcs().toArray()) {
            graph.addNode(new TraceNode({
                epc,
                events: this.findEPC(epc).toArray()
            }));
        }
        for (const event of this.body.events) {
            const json = event.toJSON();
            if ("parentId" in json &&
                typeof json.parentId === "string" &&
                "childEpcs" in json &&
                Array.isArray(json.childEpcs)) {
                for (const childEpc of json.childEpcs) {
                    if (typeof childEpc === "string") {
                        graph.connect(json.parentId, childEpc);
                    }
                }
            }
        }
        return graph;
    }
    toJSON() {
        return {
            type: "EPCISDocument",
            schemaVersion: this.schemaVersion,
            creationDate: this.creationDate,
            epcisHeader: this.header?.toJSON(),
            epcisBody: this.body.toJSON()
        };
    }
    static parse(input) {
        if (typeof input !== "object" ||
            input === null) {
            throw new Error("Invalid EPCIS document");
        }
        const document = input;
        return new EpcisDocument({
            schemaVersion: document.schemaVersion,
            creationDate: document.creationDate,
            body: EpcisBody.parse(document.epcisBody ?? { eventList: [] })
        });
    }
}
