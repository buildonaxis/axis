import { EpcisHeader } from "./EpcisHeader.js";
import { EpcisBody } from "./EpcisBody.js";
import { EventCollection } from "./EventCollection.js";
import { Trace } from "./Trace.js";
import { EpcCollection } from "./EpcCollection.js";
import { extractEpcs } from "./extractEpcs.js";
import { TraceGraph } from "./TraceGraph.js";
import { TraceNode } from "./TraceNode.js";

export interface EpcisDocumentInput {
  header?: EpcisHeader;
  body?: EpcisBody;
  schemaVersion?: string;
  creationDate?: string;
}

export class EpcisDocument {
  readonly header?: EpcisHeader;
  readonly body: EpcisBody;
  readonly schemaVersion: string;
  readonly creationDate: string;

  constructor(input: EpcisDocumentInput = {}) {
    this.header = input.header;
    this.body = input.body ?? new EpcisBody();
    this.schemaVersion = input.schemaVersion ?? "2.0";
    this.creationDate =
      input.creationDate ?? new Date().toISOString();
  }

    events(): EventCollection {
    return new EventCollection(this.body.events);
  }

  findEPC(epc: string): EventCollection {
  return this.events().whereEpc(epc);
  }

  trace(epc: string): Trace {
  return new Trace(
    epc,
    this.findEPC(epc).toArray()
  );
  }

  allEpcs(): EpcCollection {
  const epcs = new Set<string>();

  for (const event of this.body.events) {
    for (const epc of extractEpcs(event)) {
      epcs.add(epc);
    }
  }

  return new EpcCollection([...epcs]);
}

buildTraceGraph(): TraceGraph {
  const graph = new TraceGraph();

  for (const epc of this.allEpcs().toArray()) {
    graph.addNode(
      new TraceNode({
        epc,
        events: this.findEPC(epc).toArray()
      })
    );
  }

  for (const event of this.body.events) {
    const json = event.toJSON();

    if (
      "parentId" in json &&
      typeof json.parentId === "string" &&
      "childEpcs" in json &&
      Array.isArray(json.childEpcs)
    ) {
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

  static parse(input: unknown): EpcisDocument {
    if (
      typeof input !== "object" ||
      input === null
    ) {
      throw new Error("Invalid EPCIS document");
    }

    const document = input as {
      schemaVersion?: string;
      creationDate?: string;
      epcisBody?: unknown;
    };

    return new EpcisDocument({
      schemaVersion: document.schemaVersion,
      creationDate: document.creationDate,
      body: EpcisBody.parse(
        document.epcisBody ?? { eventList: [] }
      )
    });
  }
}