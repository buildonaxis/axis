export interface SensorReportInput {
    type: string;
    value: number;
    uom: string;
    time: string;
}
export declare class SensorReport {
    readonly type: string;
    readonly value: number;
    readonly uom: string;
    readonly time: string;
    constructor(input: SensorReportInput);
    toJSON(): {
        type: string;
        value: number;
        uom: string;
        time: string;
    };
}
