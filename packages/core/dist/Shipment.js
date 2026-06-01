export class Shipment {
    from;
    to;
    items;
    shipDate;
    constructor(input) {
        this.from = input.from;
        this.to = input.to;
        this.items = input.items;
        this.shipDate =
            input.shipDate ??
                new Date().toISOString();
    }
    get itemCount() {
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
