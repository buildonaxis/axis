import { describe, expect, it } from "vitest";
import { Source } from "./Source.js";
describe("Source", () => {
    it("creates a source", () => {
        const source = new Source({
            type: "owning_party",
            value: "urn:epc:id:pgln:0614141.12345"
        });
        expect(source.type).toBe("owning_party");
    });
    it("serializes", () => {
        const source = new Source({
            type: "location",
            value: "urn:epc:id:sgln:0614141.00001.0"
        });
        expect(source.toJSON()).toEqual({
            type: "location",
            value: "urn:epc:id:sgln:0614141.00001.0"
        });
    });
});
