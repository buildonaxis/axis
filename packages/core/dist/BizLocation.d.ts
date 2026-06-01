import { Location } from "./Location.js";
export declare class BizLocation {
    readonly location: Location;
    constructor(location: Location);
    get id(): string;
    toJSON(): {
        id: string;
    };
}
