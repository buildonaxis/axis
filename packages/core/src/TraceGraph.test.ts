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
      parents: [parent]
    });

    parent.children.push(child);

    expect(parent.childCount()).toBe(1);
    expect(child.parentCount()).toBe(1);
    expect(child.parents[0]).toBe(parent);
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
    expect(child?.parentCount()).toBe(1);
    expect(child?.parents[0]).toBe(parent);
  });

  it("finds root nodes", () => {
    const graph = new TraceGraph();

    const parent = new TraceNode({
      epc: "parent"
    });

    const child = new TraceNode({
      epc: "child"
    });

    graph.addNode(parent);
    graph.addNode(child);

    graph.connect("parent", "child");

    const roots = graph.roots();

    expect(roots).toHaveLength(1);
    expect(roots[0]?.epc).toBe("parent");
  });

  it("finds leaf nodes", () => {
    const graph = new TraceGraph();

    const parent = new TraceNode({
      epc: "parent"
    });

    const child = new TraceNode({
      epc: "child"
    });

    graph.addNode(parent);
    graph.addNode(child);

    graph.connect("parent", "child");

    const leaves = graph.leaves();

    expect(leaves).toHaveLength(1);
    expect(leaves[0]?.epc).toBe("child");
  });

  it("returns ancestors for a node", () => {
    const graph = new TraceGraph();

    const pallet = new TraceNode({
      epc: "pallet"
    });

    const caseNode = new TraceNode({
      epc: "case"
    });

    const item = new TraceNode({
      epc: "item"
    });

    graph.addNode(pallet);
    graph.addNode(caseNode);
    graph.addNode(item);

    graph.connect("pallet", "case");
    graph.connect("case", "item");

    const ancestors = item.ancestors();

    expect(ancestors).toHaveLength(2);
    expect(ancestors.map((node) => node.epc)).toEqual([
      "case",
      "pallet"
    ]);
  });

  it("returns descendants for a node", () => {
    const graph = new TraceGraph();

    const pallet = new TraceNode({
      epc: "pallet"
    });

    const caseNode = new TraceNode({
      epc: "case"
    });

    const item = new TraceNode({
      epc: "item"
    });

    graph.addNode(pallet);
    graph.addNode(caseNode);
    graph.addNode(item);

    graph.connect("pallet", "case");
    graph.connect("case", "item");

    const descendants = pallet.descendants();

    expect(descendants).toHaveLength(2);
    expect(descendants.map((node) => node.epc)).toEqual([
      "case",
      "item"
    ]);
  });

  it("returns graph ancestors", () => {
    const graph = new TraceGraph();

    const pallet = new TraceNode({ epc: "pallet" });
    const caseNode = new TraceNode({ epc: "case" });
    const item = new TraceNode({ epc: "item" });

    graph.addNode(pallet);
    graph.addNode(caseNode);
    graph.addNode(item);

    graph.connect("pallet", "case");
    graph.connect("case", "item");

    expect(
      graph.ancestors("item").map((node) => node.epc)
    ).toEqual(["case", "pallet"]);
  });

  it("returns graph descendants", () => {
    const graph = new TraceGraph();

    const pallet = new TraceNode({ epc: "pallet" });
    const caseNode = new TraceNode({ epc: "case" });
    const item = new TraceNode({ epc: "item" });

    graph.addNode(pallet);
    graph.addNode(caseNode);
    graph.addNode(item);

    graph.connect("pallet", "case");
    graph.connect("case", "item");

    expect(
      graph.descendants("pallet").map((node) => node.epc)
    ).toEqual(["case", "item"]);
  });

  it("supports multiple parents for a node", () => {
    const graph = new TraceGraph();

    const ingredientA = new TraceNode({
      epc: "ingredient-a"
    });

    const ingredientB = new TraceNode({
      epc: "ingredient-b"
    });

    const batch = new TraceNode({
      epc: "batch"
    });

    graph.addNode(ingredientA);
    graph.addNode(ingredientB);
    graph.addNode(batch);

    graph.connect("ingredient-a", "batch");
    graph.connect("ingredient-b", "batch");

    expect(batch.parentCount()).toBe(2);
    expect(
      graph.ancestors("batch").map((node) => node.epc)
    ).toEqual(["ingredient-a", "ingredient-b"]);
  });

    it("finds a path between two connected nodes", () => {
    const graph = new TraceGraph();

    const pallet = new TraceNode({ epc: "pallet" });
    const caseNode = new TraceNode({ epc: "case" });
    const item = new TraceNode({ epc: "item" });

    graph.addNode(pallet);
    graph.addNode(caseNode);
    graph.addNode(item);

    graph.connect("pallet", "case");
    graph.connect("case", "item");

    expect(
      graph.path("pallet", "item").map((node) => node.epc)
    ).toEqual(["pallet", "case", "item"]);
  });


});