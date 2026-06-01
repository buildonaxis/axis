import { parseIdentity } from "./parseIdentity.js";
export class SerializedItem {
    raw;
    gtin;
    serial;
    lot;
    expiration;
    constructor(identity) {
        this.raw = identity.raw;
        this.gtin = identity.gtin;
        this.serial = identity.serial;
        this.lot = identity.lot;
        this.expiration = identity.expiration;
    }
    static fromBarcode(raw) {
        const identity = parseIdentity(raw);
        return new SerializedItem(identity);
    }
    isSerialized() {
        return Boolean(this.serial);
    }
    isLotTracked() {
        return Boolean(this.lot) && !this.serial;
    }
    toJSON() {
        return {
            raw: this.raw,
            gtin: this.gtin,
            serial: this.serial,
            lot: this.lot,
            expiration: this.expiration,
            isSerialized: this.isSerialized(),
            isLotTracked: this.isLotTracked()
        };
    }
}
