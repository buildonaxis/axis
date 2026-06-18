import { describe, expect, it } from "vitest";
import { parseGS1, isValidGTIN, isValidGLN, isValidSSCC } from "./gs1.js";
describe("parseGS1", () => {
    it("parses GTIN", () => {
        const result = parseGS1("0100031234567890");
        expect(result).toEqual([
            {
                ai: "01",
                name: "gtin",
                value: "00031234567890"
            }
        ]);
    });
    it("parses GTIN and serial", () => {
        const result = parseGS1("010003123456789021ABC123");
        expect(result.length).toBe(2);
        expect(result[0]).toEqual({
            ai: "01",
            name: "gtin",
            value: "00031234567890"
        });
        expect(result[1]).toEqual({
            ai: "21",
            name: "serial",
            value: "ABC123"
        });
    });
    it("parses expiration, lot, and serial", () => {
        const result = parseGS1("01000312345678901726123110LOT12321ABC123");
        expect(result.length).toBe(4);
    });
    it("validates GTIN values", () => {
        expect(isValidGTIN("00031234567890")).toBe(true);
        expect(isValidGTIN("123")).toBe(false);
        expect(isValidGTIN("ABC123")).toBe(false);
    });
    it("validates GLN values", () => {
        expect(isValidGLN("0614141073467")).toBe(true);
        expect(isValidGLN("061414107346")).toBe(false);
        expect(isValidGLN("ABC")).toBe(false);
    });
    it("validates SSCC values", () => {
        expect(isValidSSCC("000312345678901234")).toBe(true);
        expect(isValidSSCC("00031234567890123")).toBe(false);
        expect(isValidSSCC("ABC")).toBe(false);
    });
});
