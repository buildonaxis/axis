import { describe, expect, it } from "vitest";
import { BusinessStep } from "./BusinessStep.js";
describe("BusinessStep", () => {
    it("contains shipping", () => {
        expect(BusinessStep.Shipping).toBe("shipping");
    });
    it("contains receiving", () => {
        expect(BusinessStep.Receiving).toBe("receiving");
    });
});
