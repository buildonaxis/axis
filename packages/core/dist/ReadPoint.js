export class ReadPoint {
    location;
    constructor(location) {
        this.location = location;
    }
    get id() {
        return this.location.toSgln();
    }
    toJSON() {
        return {
            id: this.id
        };
    }
}
