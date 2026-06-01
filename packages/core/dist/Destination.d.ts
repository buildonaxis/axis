export interface DestinationInput {
    type: string;
    value: string;
}
export declare class Destination {
    readonly type: string;
    readonly value: string;
    constructor(input: DestinationInput);
    toJSON(): {
        type: string;
        value: string;
    };
}
