import { MasterDataDocument } from "./MasterDataDocument.js";

export interface EpcisHeaderInput {
  masterData?: MasterDataDocument;
}

export class EpcisHeader {
  readonly masterData?: MasterDataDocument;

  constructor(
    input: EpcisHeaderInput = {}
  ) {
    this.masterData = input.masterData;
  }

  toJSON() {
    return {
      epcisMasterData:
        this.masterData?.toJSON()
    };
  }
}