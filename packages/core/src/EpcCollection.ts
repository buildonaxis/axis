export class EpcCollection {
  readonly epcs: string[];

  constructor(epcs: string[]) {
    this.epcs = [...new Set(epcs)];
  }

  count(): number {
    return this.epcs.length;
  }

  first(): string | undefined {
    return this.epcs[0];
  }

  toArray(): string[] {
    return [...this.epcs];
  }

  contains(epc: string): boolean {
    return this.epcs.includes(epc);
  }
}