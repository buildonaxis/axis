export interface GS1ApplicationIdentifier {
    ai: string;
    name: string;
    fixedLength: boolean;
    length?: number;
}
export declare const GS1_REGISTRY: Record<string, GS1ApplicationIdentifier>;
