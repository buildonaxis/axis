import { TraceNode } from "./TraceNode.js";

export class TraceGraph {
  readonly nodes: Map<string, TraceNode>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(node: TraceNode): void {
    this.nodes.set(node.epc, node);
  }

  node(epc: string): TraceNode | undefined {
    return this.nodes.get(epc);
  }

  getNode(epc: string): TraceNode | undefined {
    return this.node(epc);
  }

  connect(parentEpc: string, childEpc: string): void {
    const parent = this.node(parentEpc);
    const child = this.node(childEpc);

    if (!parent || !child) {
      return;
    }

    child.parent = parent;

    if (!parent.children.includes(child)) {
      parent.children.push(child);
    }
  }

  count(): number {
    return this.nodes.size;
  }

  all(): TraceNode[] {
    return [...this.nodes.values()];
  }
}