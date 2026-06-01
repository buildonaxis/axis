import { describe, expect, it } from "vitest";
import { Location } from "./Location.js";
import { ReadPoint } from "./ReadPoint.js";
describe("ReadPoint", () => {
    it("creates a read point from a location", () => {
        const readPoint = new ReadPoint(new Location("0614141.00777.0", "Dock Door 3"));
        expect(readPoint.toJSON()).toEqual({
            id: "urn:epc:id:sgln:0614141.00777.0"
        });
    });
});
