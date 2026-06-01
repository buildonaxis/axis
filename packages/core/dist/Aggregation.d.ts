import { SerializedItem } from "./SerializedItem.js";
export declare class Aggregation {
    readonly parent: SerializedItem;
    readonly children: SerializedItem[];
    constructor(parent: SerializedItem, children: SerializedItem[]);
    get childCount(): number;
    contains(epc: string): boolean;
    addChild(item: SerializedItem): Aggregation;
    removeChild(epc: string): Aggregation;
    toJSON(): {
        parent: string | undefined;
        children: (string | undefined)[];
    };
}
