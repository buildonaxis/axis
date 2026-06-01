export class PersistentDisposition {
    set;
    unset;
    constructor(input = {}) {
        this.set = input.set ?? [];
        this.unset = input.unset ?? [];
    }
    toJSON() {
        return {
            set: this.set,
            unset: this.unset
        };
    }
}
