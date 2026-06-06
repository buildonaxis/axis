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

  count(): number {
    return this.nodes.size;
  }

  all(): TraceNode[] {
    return [...this.nodes.values()];
  }
}