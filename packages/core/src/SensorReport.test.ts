import { describe, expect, it } from "vitest";
import { SensorReport } from "./SensorReport.js";

describe("SensorReport", () => {
  it("creates a sensor report", () => {
    const report = new SensorReport({
      type: "Temperature",
      value: 4.2,
      uom: "CEL",
      time: "2025-01-01T10:00:00Z"
    });

    expect(report.toJSON()).toEqual({
      type: "Temperature",
      value: 4.2,
      uom: "CEL",
      time: "2025-01-01T10:00:00Z"
    });
  });
});