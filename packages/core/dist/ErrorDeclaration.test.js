import { describe, expect, it } from "vitest";
import { ErrorDeclaration } from "./ErrorDeclaration.js";
describe("ErrorDeclaration", () => {
    it("creates an error declaration", () => {
        const declaration = new ErrorDeclaration({
            declarationTime: "2025-01-01T12:00:00Z",
            reason: "Incorrect EPC commissioned",
            correctiveEventIds: ["event-123"]
        });
        expect(declaration.reason).toBe("Incorrect EPC commissioned");
        expect(declaration.correctiveEventIds).toContain("event-123");
    });
    it("defaults corrective events to empty array", () => {
        const declaration = new ErrorDeclaration({
            declarationTime: "2025-01-01T12:00:00Z",
            reason: "Duplicate event"
        });
        expect(declaration.correctiveEventIds).toEqual([]);
    });
});
