export class SensorReport {
    type;
    value;
    uom;
    time;
    constructor(input) {
        this.type = input.type;
        this.value = input.value;
        this.uom = input.uom;
        this.time = input.time;
    }
    toJSON() {
        return {
            type: this.type,
            value: this.value,
            uom: this.uom,
            time: this.time
        };
    }
}
