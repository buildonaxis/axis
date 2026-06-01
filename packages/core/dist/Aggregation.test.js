import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { Aggregation } from "./Aggregation.js";
describe("Aggregation", () => {
    it("creates parent child relationships", () => {
        const parent = SerializedItem.fromBarcode("01000312345678901726123121CASE123");
        const child1 = SerializedItem.fromBarcode("01000312345678901726123121BOTTLE001");
        const child2 = SerializedItem.fromBarcode("01000312345678901726123121BOTTLE002");
        const aggregation = new Aggregation(parent, [child1, child2]);
        expect(aggregation.childCount).toBe(2);
        expect(aggregation.contains("urn:epc:id:sgtin:00031234567890.BOTTLE001")).toBe(true);
    });
    it("adds children", () => {
        const parent = SerializedItem.fromBarcode("01000312345678901726123121CASE123");
        const aggregation = new Aggregation(parent, []);
        const child = SerializedItem.fromBarcode("01000312345678901726123121BOTTLE001");
        const updated = aggregation.addChild(child);
        expect(updated.childCount).toBe(1);
    });
    it("removes children", () => {
        const parent = SerializedItem.fromBarcode("01000312345678901726123121CASE123");
        const child = SerializedItem.fromBarcode("01000312345678901726123121BOTTLE001");
        const aggregation = new Aggregation(parent, [child]);
        const updated = aggregation.removeChild("urn:epc:id:sgtin:00031234567890.BOTTLE001");
        expect(updated.childCount).toBe(0);
    });
});
