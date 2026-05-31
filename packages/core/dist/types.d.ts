export interface ParsedIdentity {
    raw: string;
    gtin?: string;
    serial?: string;
    lot?: string;
    expiration?: string;
    identifierType: "serialized" | "lot-tracked" | "unknown";
}
