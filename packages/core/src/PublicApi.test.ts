import * as Axis from "./index.js";
import { describe, expect, it } from "vitest";

describe("public api", () => {
  it("exports core sdk surface", () => {
    expect(Axis.EpcisDocument).toBeDefined();
    expect(Axis.TraceGraph).toBeDefined();
    expect(Axis.TraceNode).toBeDefined();
    expect(Axis.XmlWriter).toBeDefined();
  });
});