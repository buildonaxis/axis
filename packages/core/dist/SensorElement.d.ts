import { SensorReport } from "./SensorReport.js";
export interface SensorElementInput {
    reports: SensorReport[];
}
export declare class SensorElement {
    readonly reports: SensorReport[];
    constructor(input: SensorElementInput);
    toJSON(): {
        reports: {
            type: string;
            value: number;
            uom: string;
            time: string;
        }[];
    };
}
