export declare const BusinessStep: {
    readonly Commissioning: "commissioning";
    readonly Shipping: "shipping";
    readonly Receiving: "receiving";
    readonly Packing: "packing";
    readonly Unpacking: "unpacking";
    readonly Storing: "storing";
    readonly Picking: "picking";
    readonly Transforming: "transforming";
    readonly Disposing: "disposing";
};
export type BusinessStep = typeof BusinessStep[keyof typeof BusinessStep];
