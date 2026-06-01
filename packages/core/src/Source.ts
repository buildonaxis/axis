export interface SourceInput {
  type: string;
  value: string;
}

export class Source {
  readonly type: string;
  readonly value: string;

  constructor(input: SourceInput) {
    this.type = input.type;
    this.value = input.value;
  }

  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
}