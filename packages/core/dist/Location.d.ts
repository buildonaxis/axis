export declare class Location {
    readonly gln: string;
    readonly name?: string | undefined;
    constructor(gln: string, name?: string | undefined);
    toSgln(): string;
    toJSON(): {
        gln: string;
        sgln: string;
        name: string | undefined;
    };
}
