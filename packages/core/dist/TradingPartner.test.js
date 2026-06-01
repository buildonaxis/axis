import { describe, expect, it } from "vitest";
import { TradingPartner } from "./TradingPartner.js";
describe("TradingPartner", () => {
    it("creates a trading partner", () => {
        const partner = new TradingPartner({
            gln: "0614141123452",
            name: "Pfizer",
            role: "manufacturer"
        });
        expect(partner.toJSON()).toEqual({
            gln: "0614141123452",
            name: "Pfizer",
            role: "manufacturer"
        });
    });
    it("supports minimal partner data", () => {
        const partner = new TradingPartner({
            gln: "0614141123452",
            name: "Pfizer"
        });
        expect(partner.gln).toBe("0614141123452");
        expect(partner.name).toBe("Pfizer");
    });
});
