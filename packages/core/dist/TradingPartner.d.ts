export interface TradingPartnerInput {
    gln: string;
    name: string;
    role?: string;
}
export declare class TradingPartner {
    readonly gln: string;
    readonly name: string;
    readonly role?: string;
    constructor(input: TradingPartnerInput);
    toJSON(): {
        gln: string;
        name: string;
        role: string | undefined;
    };
}
