import { describe, expect, it } from "vitest";
import { BusinessTransaction } from "./BusinessTransaction.js";
describe("BusinessTransaction", () => {
    it("creates a transaction", () => {
        const tx = new BusinessTransaction({
            type: "po",
            identifier: "PO12345"
        });
        expect(tx.type).toBe("po");
        expect(tx.identifier).toBe("PO12345");
    });
    it("serializes to json", () => {
        const tx = new BusinessTransaction({
            type: "invoice",
            identifier: "INV999"
        });
        expect(tx.toJSON()).toEqual({
            type: "invoice",
            identifier: "INV999"
        });
    });
});
