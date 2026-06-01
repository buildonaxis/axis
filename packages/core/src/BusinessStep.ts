export const BusinessStep = {
  Commissioning: "commissioning",
  Shipping: "shipping",
  Receiving: "receiving",
  Packing: "packing",
  Unpacking: "unpacking",
  Storing: "storing",
  Picking: "picking",
  Transforming: "transforming",
  Disposing: "disposing"
} as const;

export type BusinessStep =
  typeof BusinessStep[keyof typeof BusinessStep];