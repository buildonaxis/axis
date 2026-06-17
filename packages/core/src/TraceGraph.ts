import { TraceNode } from "./TraceNode.js";
import type { EpcisDocument } from "./EpcisDocument.js";

export class TraceGraph {
  readonly nodes: Map<string, TraceNode>;

  constructor() {
    this.nodes = new Map();
  }

  static fromDocument(
  document: EpcisDocument
): TraceGraph {
  return document.buildTraceGraph();
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

    pathToRoot(epc: string): TraceNode[] {
    const paths = this.pathsToRoots(epc);

    return paths[0] ?? [];
  }

  pathsToRoots(epc: string): TraceNode[][] {
    const node = this.node(epc);

    if (!node) {
      return [];
    }

    if (node.parents.length === 0) {
      return [[node]];
    }

    const paths: TraceNode[][] = [];

    for (const parent of node.parents) {
      const parentPaths = this.pathsToRoots(parent.epc);

      for (const parentPath of parentPaths) {
        paths.push([...parentPath, node]);
      }
    }

    return paths;
  }

  commonAncestor(
  epcA: string,
  epcB: string
): TraceNode | undefined {
  const pathA = this.pathToRoot(epcA);
  const pathB = this.pathToRoot(epcB);

  let ancestor: TraceNode | undefined;

  const length = Math.min(
    pathA.length,
    pathB.length
  );

  for (let i = 0; i < length; i++) {
    if (pathA[i]?.epc === pathB[i]?.epc) {
      ancestor = pathA[i];
    } else {
      break;
    }
  }

  return ancestor;
}

subgraph(epc: string): TraceGraph {
  const center = this.node(epc);
  const graph = new TraceGraph();

  if (!center) {
    return graph;
  }

  const related = [
    center,
    ...center.ancestors(),
    ...center.descendants()
  ];

  for (const node of related) {
    graph.addNode(
      new TraceNode({
        epc: node.epc,
        events: node.events
      })
    );
  }

  for (const node of related) {
    for (const child of node.children) {
      if (graph.node(node.epc) && graph.node(child.epc)) {
        graph.connect(node.epc, child.epc);
      }
    }
  }

  return graph;
}

toDot(): string {
  const lines = [
    "digraph TraceGraph {"
  ];

  for (const node of this.all()) {
    if (node.children.length === 0) {
      lines.push(`  "${node.epc}";`);
      continue;
    }

    for (const child of node.children) {
      lines.push(
        `  "${node.epc}" -> "${child.epc}";`
      );
    }
  }

  lines.push("}");

  return lines.join("\n");
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