export interface BusinessTransactionInput {
  type: string;
  identifier: string;
}

export class BusinessTransaction {
  readonly type: string;
  readonly identifier: string;

  constructor(input: BusinessTransactionInput) {
    this.type = input.type;
    this.identifier = input.identifier;
  }

  toJSON() {
    return {
      type: this.type,
      identifier: this.identifier
    };
  }
}