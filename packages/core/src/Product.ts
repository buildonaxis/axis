export interface ProductInput {
  gtin: string;
  name: string;
  manufacturer?: string;
  brand?: string;
}

export class Product {
  readonly gtin: string;
  readonly name: string;
  readonly manufacturer?: string;
  readonly brand?: string;

  constructor(input: ProductInput) {
    this.gtin = input.gtin;
    this.name = input.name;
    this.manufacturer = input.manufacturer;
    this.brand = input.brand;
  }

  toJSON() {
    return {
      gtin: this.gtin,
      name: this.name,
      manufacturer: this.manufacturer,
      brand: this.brand
    };
  }
}