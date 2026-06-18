export const BusinessStep = {
  Commissioning: "commissioning",
  Decommissioning: "decommissioning",
  Shipping: "shipping",
  Receiving: "receiving",
  Packing: "packing",
  Unpacking: "unpacking",
  Repacking: "repacking",
  Storing: "storing",
  Picking: "picking",
  Inspecting: "inspecting",
  Sampling: "sampling",
  Destroying: "destroying",
  Returning: "returning",
  Recalling: "recalling",
  Holding: "holding",
  Releasing: "releasing",
  Inventorying: "inventorying",
  Adjusting: "adjusting",
  Transforming: "transforming",
  Disposing: "disposing"
} as const;

export type BusinessStep =
  typeof BusinessStep[keyof typeof BusinessStep];