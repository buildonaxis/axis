import { describe, expect, it } from "vitest";

import { TraceGraph } from "./TraceGraph.js";
import { TraceNode } from "./TraceNode.js";

describe("TraceGraph", () => {
  it("stores nodes", () => {
    const graph = new TraceGraph();

    graph.addNode(
      new TraceNode({
        epc: "epc1"
      })
    );

    expect(graph.count()).toBe(1);
  });

  it("retrieves nodes", () => {
    const graph = new TraceGraph();

    const node = new TraceNode({
      epc: "epc1"
    });

    graph.addNode(node);

    expect(graph.node("epc1")).toBe(node);
  });
});