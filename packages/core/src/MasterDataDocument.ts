import { Vocabulary } from "./Vocabulary.js";

export interface MasterDataDocumentInput {
  vocabularies?: Vocabulary[];
}

export class MasterDataDocument {
  readonly vocabularies: Vocabulary[];

  constructor(
    input: MasterDataDocumentInput = {}
  ) {
    this.vocabularies =
      input.vocabularies ?? [];
  }

  addVocabulary(
    vocabulary: Vocabulary
  ): MasterDataDocument {
    return new MasterDataDocument({
      vocabularies: [
        ...this.vocabularies,
        vocabulary
      ]
    });
  }

  getVocabulary(
    type: string
  ): Vocabulary | undefined {
    return this.vocabularies.find(
      v => v.type === type
    );
  }

  toJSON() {
    return {
      vocabularyList:
        this.vocabularies.map(v =>
          v.toJSON()
        )
    };
  }
}