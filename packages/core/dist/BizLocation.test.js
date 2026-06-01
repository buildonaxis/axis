import { describe, expect, it } from "vitest";
import { Location } from "./Location.js";
import { BizLocation } from "./BizLocation.js";
describe("BizLocation", () => {
    it("creates a business location from a location", () => {
        const bizLocation = new BizLocation(new Location("0614141.00888.0", "Warehouse A"));
        expect(bizLocation.toJSON()).toEqual({
            id: "urn:epc:id:sgln:0614141.00888.0"
        });
    });
});
