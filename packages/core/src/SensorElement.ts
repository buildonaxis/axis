import { SensorReport } from "./SensorReport.js";

export interface SensorElementInput {
  reports: SensorReport[];
}

export class SensorElement {
  readonly reports: SensorReport[];

  constructor(input: SensorElementInput) {
    this.reports = input.reports;
  }

  toJSON() {
    return {
      reports: this.reports.map(r => r.toJSON())
    };
  }
}