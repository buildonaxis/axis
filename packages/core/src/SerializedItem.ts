import { parseIdentity } from "./parseIdentity.js";
import { ParsedIdentity } from "./types.js";

export class SerializedItem {
  readonly raw: string;
  readonly gtin?: string;
  readonly serial?: string;
  readonly lot?: string;
  readonly expiration?: string;

  constructor(identity: ParsedIdentity) {
    this.raw = identity.raw;
    this.gtin = identity.gtin;
    this.serial = identity.serial;
    this.lot = identity.lot;
    this.expiration = identity.expiration;
  }

  static fromBarcode(raw: string): SerializedItem {
    const identity = parseIdentity(raw);
    return new SerializedItem(identity);
  }

  isSerialized(): boolean {
    return Boolean(this.serial);
  }

  isLotTracked(): boolean {
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