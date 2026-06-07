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

  ancestors(epc: string): TraceNode[] {
    return this.node(epc)?.ancestors() ?? [];
  }

  descendants(epc: string): TraceNode[] {
    return this.node(epc)?.descendants() ?? [];
  }

  path(fromEpc: string, toEpc: string): TraceNode[] {
    const start = this.node(fromEpc);
    const target = this.node(toEpc);

    if (!start || !target) {
      return [];
    }

    const queue: TraceNode[][] = [[start]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const currentPath = queue.shift();

      if (!currentPath) {
        continue;
      }

      const current = currentPath[currentPath.length - 1];

      if (!current) {
        continue;
      }

      if (current.epc === target.epc) {
        return currentPath;
      }

      if (visited.has(current.epc)) {
        continue;
      }

      visited.add(current.epc);

      const neighbors = [
        ...current.parents,
        ...current.children
      ];

      for (const neighbor of neighbors) {
        queue.push([...currentPath, neighbor]);
      }
    }

    return [];
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

    if (!child.parents.includes(parent)) {
      child.parents.push(parent);
    }

    if (!parent.children.includes(child)) {
      parent.children.push(child);
    }
  }

  roots(): TraceNode[] {
    return this.all().filter(
      (node) => node.parents.length === 0
    );
  }

  leaves(): TraceNode[] {
    return this.all().filter(
      (node) => node.children.length === 0
    );
  }

  count(): number {
    return this.nodes.size;
  }

  all(): TraceNode[] {
    return [...this.nodes.values()];
  }
}