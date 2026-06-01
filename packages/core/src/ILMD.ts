export interface ILMDInput {
  lotNumber?: string;
  expirationDate?: string;
  productionDate?: string;
  bestBeforeDate?: string;

  [key: string]: unknown;
}

export class ILMD {
  readonly attributes: Record<string, unknown>;

  constructor(input: ILMDInput = {}) {
    this.attributes = { ...input };
  }

  get(key: string): unknown {
    return this.attributes[key];
  }

  has(key: string): boolean {
    return key in this.attributes;
  }

  toJSON() {
    return this.attributes;
  }
}