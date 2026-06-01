export class Location {
  constructor(
    readonly gln: string,
    readonly name?: string
  ) {}

  toSgln(): string {
    return `urn:epc:id:sgln:${this.gln}`;
  }

  toJSON() {
    return {
      gln: this.gln,
      sgln: this.toSgln(),
      name: this.name
    };
  }
}