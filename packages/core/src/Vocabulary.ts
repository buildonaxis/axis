import { VocabularyElement } from "./VocabularyElement.js";

export interface VocabularyInput {
  type: string;
  elements?: VocabularyElement[];
}

export class Vocabulary {
  readonly type: string;
  readonly elements: VocabularyElement[];

  constructor(input: VocabularyInput) {
    this.type = input.type;
    this.elements = input.elements ?? [];
  }

  add(
    element: VocabularyElement
  ): Vocabulary {
    return new Vocabulary({
      type: this.type,
      elements: [
        ...this.elements,
        element
      ]
    });
  }

  find(
    id: string
  ): VocabularyElement | undefined {
    return this.elements.find(
      e => e.id === id
    );
  }

  toJSON() {
    return {
      type: this.type,
      vocabularyElementList:
        this.elements.map(e => e.toJSON())
    };
  }
}