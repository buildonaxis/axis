export interface ProductInput {
    gtin: string;
    name: string;
    manufacturer?: string;
    brand?: string;
}
export declare class Product {
    readonly gtin: string;
    readonly name: string;
    readonly manufacturer?: string;
    readonly brand?: string;
    constructor(input: ProductInput);
    toJSON(): {
        gtin: string;
        name: string;
        manufacturer: string | undefined;
        brand: string | undefined;
    };
}
