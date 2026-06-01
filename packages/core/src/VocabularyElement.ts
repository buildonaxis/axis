export interface VocabularyAttribute {
  id: string;
  value: unknown;
}

export interface VocabularyElementInput {
  id: string;
  attributes?: VocabularyAttribute[];
}

export class VocabularyElement {
  readonly id: string;
  readonly attributes: VocabularyAttribute[];

  constructor(input: VocabularyElementInput) {
    this.id = input.id;
    this.attributes = input.attributes ?? [];
  }

  addAttribute(
    id: string,
    value: unknown
  ): VocabularyElement {
    return new VocabularyElement({
      id: this.id,
      attributes: [
        ...this.attributes,
        { id, value }
      ]
    });
  }

  getAttribute(id: string): unknown {
    return this.attributes.find(
      a => a.id === id
    )?.value;
  }

  toJSON() {
    return {
      id: this.id,
      attributes: this.attributes
    };
  }
}