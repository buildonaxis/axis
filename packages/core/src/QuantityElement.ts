export interface QuantityElementInput {
  epcClass: string;
  quantity: number;
  uom?: string;
}

export class QuantityElement {
  readonly epcClass: string;
  readonly quantity: number;
  readonly uom?: string;

  constructor(input: QuantityElementInput) {
    this.epcClass = input.epcClass;
    this.quantity = input.quantity;
    this.uom = input.uom;
  }

  toJSON() {
    return {
      epcClass: this.epcClass,
      quantity: this.quantity,
      uom: this.uom
    };
  }
}