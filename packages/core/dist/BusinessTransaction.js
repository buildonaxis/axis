export class BusinessTransaction {
    type;
    identifier;
    constructor(input) {
        this.type = input.type;
        this.identifier = input.identifier;
    }
    toJSON() {
        return {
            type: this.type,
            identifier: this.identifier
        };
    }
}
