import { EpcisHeader } from "./EpcisHeader.js";
import { EpcisBody } from "./EpcisBody.js";

export interface EpcisDocumentInput {
  header?: EpcisHeader;
  body?: EpcisBody;
  schemaVersion?: string;
  creationDate?: string;
}

export class EpcisDocument {
  readonly header?: EpcisHeader;
  readonly body: EpcisBody;
  readonly schemaVersion: string;
  readonly creationDate: string;

  constructor(input: EpcisDocumentInput = {}) {
    this.header = input.header;
    this.body = input.body ?? new EpcisBody();
    this.schemaVersion = input.schemaVersion ?? "2.0";
    this.creationDate =
      input.creationDate ?? new Date().toISOString();
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

  static parse(input: unknown): EpcisDocument {
    if (
      typeof input !== "object" ||
      input === null
    ) {
      throw new Error("Invalid EPCIS document");
    }

    const document = input as {
      schemaVersion?: string;
      creationDate?: string;
      epcisBody?: unknown;
    };

    return new EpcisDocument({
      schemaVersion: document.schemaVersion,
      creationDate: document.creationDate,
      body: EpcisBody.parse(
        document.epcisBody ?? { eventList: [] }
      )
    });
  }
}