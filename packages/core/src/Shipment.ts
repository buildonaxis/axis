import { Location } from "./Location.js";
import { SerializedItem } from "./SerializedItem.js";

export interface ShipmentInput {
  from: Location;
  to: Location;
  items: SerializedItem[];
  shipDate?: string;
}

export class Shipment {
  readonly from: Location;
  readonly to: Location;
  readonly items: SerializedItem[];
  readonly shipDate: string;

  constructor(input: ShipmentInput) {
    this.from = input.from;
    this.to = input.to;
    this.items = input.items;
    this.shipDate =
      input.shipDate ??
      new Date().toISOString();
  }

  get itemCount(): number {
    return this.items.length;
  }

  toJSON() {
    return {
      from: this.from.toJSON(),
      to: this.to.toJSON(),
      shipDate: this.shipDate,
      itemCount: this.itemCount,
      epcs: this.items
        .map(item => item.toEpcUri())
        .filter(Boolean)
    };
  }
}