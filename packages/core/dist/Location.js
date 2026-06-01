export class Location {
    gln;
    name;
    constructor(gln, name) {
        this.gln = gln;
        this.name = name;
    }
    toSgln() {
        return `urn:epc:id:sgln:${this.gln}`;
    }
    toJSON() {
        return {
            gln: this.gln,
            sgln: this.toSgln(),
            name: this.name
        };
    }
}
