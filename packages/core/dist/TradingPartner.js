export class TradingPartner {
    gln;
    name;
    role;
    constructor(input) {
        this.gln = input.gln;
        this.name = input.name;
        this.role = input.role;
    }
    toJSON() {
        return {
            gln: this.gln,
            name: this.name,
            role: this.role
        };
    }
}
