import { describe, expect, it } from "vitest";
import { PersistentDisposition } from "./PersistentDisposition.js";
describe("PersistentDisposition", () => {
    it("stores set and unset values", () => {
        const disposition = new PersistentDisposition({
            set: ["urn:epcglobal:cbv:disp:active"],
            unset: ["urn:epcglobal:cbv:disp:in_progress"]
        });
        expect(disposition.set).toHaveLength(1);
        expect(disposition.unset).toHaveLength(1);
    });
    it("defaults to empty arrays", () => {
        const disposition = new PersistentDisposition();
        expect(disposition.set).toEqual([]);
        expect(disposition.unset).toEqual([]);
    });
});
