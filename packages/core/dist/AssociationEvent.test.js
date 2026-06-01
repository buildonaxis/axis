import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { AssociationEvent } from "./AssociationEvent.js";
describe("AssociationEvent", () => {
    it("creates an association event with parent and child EPCs", () => {
        const parent = SerializedItem.fromBarcode("01000312345678901726123121KIT123");
        const child = SerializedItem.fromBarcode("01000312345678901726123121ITEM123");
        const event = new AssociationEvent({
            action: "ADD",
            parent,
            children: [child],
            bizStep: "packing",
            disposition: "active",
            location: "urn:epc:id:sgln:0031234.00001.0",
            eventTime: "2026-01-01T00:00:00.000Z"
        });
        expect(event.toJSON()).toEqual({
            eventType: "AssociationEvent",
            action: "ADD",
            parentId: "urn:epc:id:sgtin:00031234567890.KIT123",
            childEpcs: [
                "urn:epc:id:sgtin:00031234567890.ITEM123"
            ],
            bizStep: "packing",
            disposition: "active",
            location: "urn:epc:id:sgln:0031234.00001.0",
            eventTime: "2026-01-01T00:00:00.000Z"
        });
    });
});
