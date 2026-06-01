export class QuantityElement {
    epcClass;
    quantity;
    uom;
    constructor(input) {
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
