import { describe, expect, it } from "vitest";
import { SensorElement } from "./SensorElement.js";
import { SensorReport } from "./SensorReport.js";
describe("SensorElement", () => {
    it("contains sensor reports", () => {
        const element = new SensorElement({
            reports: [
                new SensorReport({
                    type: "Temperature",
                    value: 5,
                    uom: "CEL",
                    time: "2025-01-01T10:00:00Z"
                })
            ]
        });
        expect(element.reports).toHaveLength(1);
    });
});
