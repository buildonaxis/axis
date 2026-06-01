export class ILMD {
    attributes;
    constructor(input = {}) {
        this.attributes = { ...input };
    }
    get(key) {
        return this.attributes[key];
    }
    has(key) {
        return key in this.attributes;
    }
    toJSON() {
        return this.attributes;
    }
}
