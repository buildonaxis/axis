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

  it("supports parent child relationships", () => {
  const parent = new TraceNode({
    epc: "parent"
  });

  const child = new TraceNode({
    epc: "child",
    parent
  });

  parent.children.push(child);

  expect(parent.childCount()).toBe(1);
  expect(child.parent).toBe(parent);
  });

  it("connects parent and child nodes", () => {
  const graph = new TraceGraph();

  graph.addNode(
    new TraceNode({
      epc: "parent"
    })
  );

  graph.addNode(
    new TraceNode({
      epc: "child"
    })
  );

  graph.connect("parent", "child");

  const parent = graph.getNode("parent");
  const child = graph.getNode("child");

  expect(parent?.childCount()).toBe(1);
  expect(child?.parent).toBe(parent);
  });
});