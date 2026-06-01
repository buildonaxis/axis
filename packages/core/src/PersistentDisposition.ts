export interface PersistentDispositionInput {
  set?: string[];
  unset?: string[];
}

export class PersistentDisposition {
  readonly set: string[];
  readonly unset: string[];

  constructor(input: PersistentDispositionInput = {}) {
    this.set = input.set ?? [];
    this.unset = input.unset ?? [];
  }

  toJSON() {
    return {
      set: this.set,
      unset: this.unset
    };
  }
}