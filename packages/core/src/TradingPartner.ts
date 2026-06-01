export interface TradingPartnerInput {
  gln: string;
  name: string;
  role?: string;
}

export class TradingPartner {
  readonly gln: string;
  readonly name: string;
  readonly role?: string;

  constructor(input: TradingPartnerInput) {
    this.gln = input.gln;
    this.name = input.name;
    this.role = input.role;
  }

  toJSON() {
    return {
      gln: this.gln,
      name: this.name,
      role: this.role
    };
  }
}