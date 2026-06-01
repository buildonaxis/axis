import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { createReceivingEvent, createShippingEvent, createPackingEvent } from "./events.js";
describe("event factories", () => {
    it("creates a receiving event", () => {
        const item = SerializedItem.fromBarcode("01000312345678901726123121ABC123");
        const event = createReceivingEvent({
            items: [item],
            location: "urn:epc:id:sgln:0031234.00001.0",
            eventTime: "2026-01-01T00:00:00.000Z"
        });
        expect(event.toJSON().bizStep).toBe("receiving");
        expect(event.toJSON().epcList).toEqual([
            "urn:epc:id:sgtin:00031234567890.ABC123"
        ]);
    });
    it("creates a shipping event", () => {
        const item = SerializedItem.fromBarcode("01000312345678901726123121ABC123");
        const event = createShippingEvent({
            items: [item],
            eventTime: "2026-01-01T00:00:00.000Z"
        });
        expect(event.toJSON().bizStep).toBe("shipping");
    });
    it("creates a packing event", () => {
        const parent = SerializedItem.fromBarcode("01000312345678901726123121CASE123");
        const child = SerializedItem.fromBarcode("01000312345678901726123121BOTTLE123");
        const event = createPackingEvent({
            parent,
            children: [child],
            eventTime: "2026-01-01T00:00:00.000Z"
        });
        expect(event.toJSON().bizStep).toBe("packing");
        expect(event.toJSON().parentId).toBe("urn:epc:id:sgtin:00031234567890.CASE123");
    });
});
