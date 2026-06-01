import { Location } from "./Location.js";
import { SerializedItem } from "./SerializedItem.js";
export interface ShipmentInput {
    from: Location;
    to: Location;
    items: SerializedItem[];
    shipDate?: string;
}
export declare class Shipment {
    readonly from: Location;
    readonly to: Location;
    readonly items: SerializedItem[];
    readonly shipDate: string;
    constructor(input: ShipmentInput);
    get itemCount(): number;
    toJSON(): {
        from: {
            gln: string;
            sgln: string;
            name: string | undefined;
        };
        to: {
            gln: string;
            sgln: string;
            name: string | undefined;
        };
        shipDate: string;
        itemCount: number;
        epcs: (string | undefined)[];
    };
}
