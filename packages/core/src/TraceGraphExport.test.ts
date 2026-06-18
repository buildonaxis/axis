import { describe, expect, it } from "vitest";

import { TraceGraph } from "./TraceGraph.js";
import { TraceNode } from "./TraceNode.js";

describe("TraceGraph exports", () => {
  it("exports graph as JSON", () => {
    const graph = new TraceGraph();

    graph.addNode(
      new TraceNode({
        epc: "parent",
        events: []
      })
    );

    graph.addNode(
      new TraceNode({
        epc: "child",
        events: []
      })
    );

    graph.connect("parent", "child");

    const json = graph.toJSON();

    expect(json.nodes.length).toBe(2);
    expect(json.edges.length).toBe(1);

    expect(json.edges[0]).toEqual({
      source: "parent",
      target: "child"
    });
  });

  it("exports graph as Mermaid", () => {
    const graph = new TraceGraph();

    graph.addNode(
      new TraceNode({
        epc: "parent",
        events: []
      })
    );

    graph.addNode(
      new TraceNode({
        epc: "child",
        events: []
      })
    );

    graph.connect("parent", "child");

    const mermaid = graph.toMermaid();

    expect(mermaid).toContain("graph LR");
    expect(mermaid).toContain('"parent" --> "child"');
  });
});