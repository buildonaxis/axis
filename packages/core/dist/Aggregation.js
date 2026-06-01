export class Aggregation {
    parent;
    children;
    constructor(parent, children) {
        this.parent = parent;
        this.children = children;
    }
    get childCount() {
        return this.children.length;
    }
    contains(epc) {
        return this.children.some(child => child.toEpcUri() === epc);
    }
    addChild(item) {
        return new Aggregation(this.parent, [...this.children, item]);
    }
    removeChild(epc) {
        return new Aggregation(this.parent, this.children.filter(child => child.toEpcUri() !== epc));
    }
    toJSON() {
        return {
            parent: this.parent.toEpcUri(),
            children: this.children.map(child => child.toEpcUri())
        };
    }
}
