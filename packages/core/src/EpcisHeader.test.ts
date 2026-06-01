import { describe, expect, it } from "vitest";
import { EpcisHeader } from "./EpcisHeader.js";
import { MasterDataDocument } from "./MasterDataDocument.js";

describe("EpcisHeader", () => {
  it("creates empty header", () => {
    const header =
      new EpcisHeader();

    expect(
      header.masterData
    ).toBeUndefined();
  });

  it("stores master data", () => {
    const masterData =
      new MasterDataDocument();

    const header =
      new EpcisHeader({
        masterData
      });

    expect(
      header.masterData
    ).toBe(masterData);
  });

  it("serializes correctly", () => {
    const header =
      new EpcisHeader({
        masterData:
          new MasterDataDocument()
      });

    expect(
      header.toJSON()
    ).toHaveProperty(
      "epcisMasterData"
    );
  });
});