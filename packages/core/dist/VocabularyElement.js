export class VocabularyElement {
    id;
    attributes;
    constructor(input) {
        this.id = input.id;
        this.attributes = input.attributes ?? [];
    }
    addAttribute(id, value) {
        return new VocabularyElement({
            id: this.id,
            attributes: [
                ...this.attributes,
                { id, value }
            ]
        });
    }
    getAttribute(id) {
        return this.attributes.find(a => a.id === id)?.value;
    }
    toJSON() {
        return {
            id: this.id,
            attributes: this.attributes
        };
    }
}
