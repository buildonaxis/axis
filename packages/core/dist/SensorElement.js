export class SensorElement {
    reports;
    constructor(input) {
        this.reports = input.reports;
    }
    toJSON() {
        return {
            reports: this.reports.map(r => r.toJSON())
        };
    }
}
