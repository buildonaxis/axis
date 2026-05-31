export function parseIdentity(raw) {
    const result = {
        raw,
        identifierType: "unknown"
    };
    const gtinMatch = raw.match(/01(\d{14})/);
    if (gtinMatch) {
        result.gtin = gtinMatch[1];
    }
    const serialMatch = raw.match(/21([A-Za-z0-9]+)/);
    if (serialMatch) {
        result.serial = serialMatch[1];
    }
    const lotMatch = raw.match(/10([A-Za-z0-9]+)/);
    if (lotMatch) {
        result.lot = lotMatch[1];
    }
    const expirationMatch = raw.match(/17(\d{6})/);
    if (expirationMatch) {
        result.expiration =
            expirationMatch[1];
    }
    if (result.serial) {
        result.identifierType =
            "serialized";
    }
    else if (result.lot) {
        result.identifierType =
            "lot-tracked";
    }
    return result;
}
