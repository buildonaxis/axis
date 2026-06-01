export class Product {
    gtin;
    name;
    manufacturer;
    brand;
    constructor(input) {
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
