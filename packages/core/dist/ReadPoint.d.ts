import { Location } from "./Location.js";
export declare class ReadPoint {
    readonly location: Location;
    constructor(location: Location);
    get id(): string;
    toJSON(): {
        id: string;
    };
}
