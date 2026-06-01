import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { ObjectEvent } from "./ObjectEvent.js";
describe("ObjectEvent", () => {
    it("creates an object event with EPCs", () => {
        const item = SerializedItem.fromBarcode("01000312345678901726123121ABC123");
        const event = new ObjectEvent({
            action: "OBSERVE",
            bizStep: "shipping",
            disposition: "in_transit",
            location: "urn:epc:id:sgln:0614141.12345.0",
            eventTime: "2026-01-01T00:00:00.000Z",
            items: [item]
        });
        expect(event.toJSON()).toEqual({
            eventType: "ObjectEvent",
            action: "OBSERVE",
            bizStep: "shipping",
            disposition: "in_transit",
            eventTime: "2026-01-01T00:00:00.000Z",
            location: "urn:epc:id:sgln:0614141.12345.0",
            epcList: [
                "urn:epc:id:sgtin:00031234567890.ABC123"
            ]
        });
    });
});
