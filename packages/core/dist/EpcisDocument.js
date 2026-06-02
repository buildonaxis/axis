import { EpcisBody } from "./EpcisBody.js";
export class EpcisDocument {
    header;
    body;
    schemaVersion;
    creationDate;
    constructor(input = {}) {
        this.header = input.header;
        this.body = input.body ?? new EpcisBody();
        this.schemaVersion = input.schemaVersion ?? "2.0";
        this.creationDate = input.creationDate ?? new Date().toISOString();
    }
    toJSON() {
        return {
            type: "EPCISDocument",
            schemaVersion: this.schemaVersion,
            creationDate: this.creationDate,
            epcisHeader: this.header?.toJSON(),
            epcisBody: this.body.toJSON()
        };
    }
    static parse(input) {
        if (typeof input !== "object" ||
            input === null) {
            throw new Error("Invalid EPCIS document");
        }
        const document = input;
        return new EpcisDocument({
            schemaVersion: document.schemaVersion,
            creationDate: document.creationDate
        });
    }
}
