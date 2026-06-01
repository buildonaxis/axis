export interface SensorReportInput {
  type: string;
  value: number;
  uom: string;
  time: string;
}

export class SensorReport {
  readonly type: string;
  readonly value: number;
  readonly uom: string;
  readonly time: string;

  constructor(input: SensorReportInput) {
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