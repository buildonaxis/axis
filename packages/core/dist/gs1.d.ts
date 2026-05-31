export type GS1Value = {
    ai: "01";
    name: "gtin";
    value: string;
} | {
    ai: "10";
    name: "lot";
    value: string;
} | {
    ai: "17";
    name: "expiration";
    value: string;
} | {
    ai: "21";
    name: "serial";
    value: string;
};
export declare function parseGS1(raw: string): GS1Value[];
