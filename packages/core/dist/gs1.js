function parseExpiration(value) {
    const year = Number(value.slice(0, 2));
    const fullYear = year >= 50 ? 1900 + year : 2000 + year;
    const month = value.slice(2, 4);
    const day = value.slice(4, 6);
    return `${fullYear}-${month}-${day}`;
}
export function isValidGTIN(value) {
    return /^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(value);
}
export function isValidGLN(value) {
    return /^\d{13}$/.test(value);
}
export function isValidSSCC(value) {
    return /^\d{18}$/.test(value);
}
export function parseGS1(raw) {
    const values = [];
    let cursor = 0;
    while (cursor < raw.length) {
        const ai = raw.slice(cursor, cursor + 2);
        cursor += 2;
        if (ai === "01") {
            values.push({
                ai,
                name: "gtin",
                value: raw.slice(cursor, cursor + 14)
            });
            cursor += 14;
            continue;
        }
        if (ai === "17") {
            values.push({
                ai,
                name: "expiration",
                value: parseExpiration(raw.slice(cursor, cursor + 6))
            });
            cursor += 6;
            continue;
        }
        if (ai === "10") {
            const remaining = raw.slice(cursor);
            const nextAiIndex = remaining.search(/(?:17|21)/);
            const value = nextAiIndex >= 0
                ? remaining.slice(0, nextAiIndex)
                : remaining;
            values.push({
                ai,
                name: "lot",
                value
            });
            cursor =
                nextAiIndex >= 0
                    ? cursor + nextAiIndex
                    : raw.length;
            continue;
        }
        if (ai === "21") {
            values.push({
                ai,
                name: "serial",
                value: raw.slice(cursor)
            });
            cursor = raw.length;
            continue;
        }
        break;
    }
    return values;
}
