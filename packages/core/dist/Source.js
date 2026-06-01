export class Source {
    type;
    value;
    constructor(input) {
        this.type = input.type;
        this.value = input.value;
    }
    toJSON() {
        return {
            type: this.type,
            value: this.value
        };
    }
}
