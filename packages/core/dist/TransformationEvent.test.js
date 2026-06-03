import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { TransformationEvent } from "./TransformationEvent.js";
describe("TransformationEvent", () => {
    it("creates transformation events", () => {
        const input = SerializedItem.fromBarcode("010031234567890121INPUT1");
        const output = SerializedItem.fromBarcode("010031234567890121OUTPUT1");
        const event = new TransformationEvent({
            bizStep: "commissioning",
            disposition: "active",
            inputItems: [input],
            outputItems: [output]
        });
        expect(event.inputEpcs.length).toBe(1);
        expect(event.outputEpcs.length).toBe(1);
        expect(event.toJSON().eventType).toBe("TransformationEvent");
    });
    it("parses a minimal transformation event", () => {
        const event = TransformationEvent.parse({
            eventType: "TransformationEvent",
            bizStep: "commissioning",
            disposition: "active",
            inputEPCList: [
                "urn:epc:id:sgtin:00312345678901.INPUT1"
            ],
            outputEPCList: [
                "urn:epc:id:sgtin:00312345678901.OUTPUT1"
            ]
        });
        expect(event.eventType).toBe("TransformationEvent");
        expect(event.inputEpcs).toHaveLength(1);
        expect(event.outputEpcs).toHaveLength(1);
    });
    it("throws for invalid input", () => {
        expect(() => TransformationEvent.parse(null)).toThrow("Invalid TransformationEvent");
    });
});
