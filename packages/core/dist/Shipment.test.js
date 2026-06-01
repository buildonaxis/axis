import { describe, expect, it } from "vitest";
import { Shipment } from "./Shipment.js";
import { Location } from "./Location.js";
import { SerializedItem } from "./SerializedItem.js";
describe("Shipment", () => {
    it("tracks shipment details", () => {
        const warehouse = new Location("0614141.12345.0", "Warehouse");
        const pharmacy = new Location("0614141.99999.0", "Pharmacy");
        const item = SerializedItem.fromBarcode("010003123456789021ABC123");
        const shipment = new Shipment({
            from: warehouse,
            to: pharmacy,
            items: [item]
        });
        expect(shipment.itemCount).toBe(1);
    });
    it("serializes shipment", () => {
        const shipment = new Shipment({
            from: new Location("0614141.12345.0"),
            to: new Location("0614141.99999.0"),
            items: []
        });
        expect(shipment.toJSON().itemCount).toBe(0);
    });
});
