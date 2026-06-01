export class MasterDataDocument {
    vocabularies;
    constructor(input = {}) {
        this.vocabularies =
            input.vocabularies ?? [];
    }
    addVocabulary(vocabulary) {
        return new MasterDataDocument({
            vocabularies: [
                ...this.vocabularies,
                vocabulary
            ]
        });
    }
    getVocabulary(type) {
        return this.vocabularies.find(v => v.type === type);
    }
    toJSON() {
        return {
            vocabularyList: this.vocabularies.map(v => v.toJSON())
        };
    }
}
