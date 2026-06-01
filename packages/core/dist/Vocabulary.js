export class Vocabulary {
    type;
    elements;
    constructor(input) {
        this.type = input.type;
        this.elements = input.elements ?? [];
    }
    add(element) {
        return new Vocabulary({
            type: this.type,
            elements: [
                ...this.elements,
                element
            ]
        });
    }
    find(id) {
        return this.elements.find(e => e.id === id);
    }
    toJSON() {
        return {
            type: this.type,
            vocabularyElementList: this.elements.map(e => e.toJSON())
        };
    }
}
