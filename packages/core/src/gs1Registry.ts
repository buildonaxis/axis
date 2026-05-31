export interface GS1ApplicationIdentifier {
  ai: string;
  name: string;
  fixedLength: boolean;
  length?: number;
}

export const GS1_REGISTRY: Record<
  string,
  GS1ApplicationIdentifier
> = {
  "01": {
    ai: "01",
    name: "gtin",
    fixedLength: true,
    length: 14
  },

  "10": {
    ai: "10",
    name: "lot",
    fixedLength: false
  },

  "17": {
    ai: "17",
    name: "expiration",
    fixedLength: true,
    length: 6
  },

  "21": {
    ai: "21",
    name: "serial",
    fixedLength: false
  }
};