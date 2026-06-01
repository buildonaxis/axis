export interface DestinationInput {
  type: string;
  value: string;
}

export class Destination {
  readonly type: string;
  readonly value: string;

  constructor(input: DestinationInput) {
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