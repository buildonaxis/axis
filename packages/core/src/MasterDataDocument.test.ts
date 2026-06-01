import { describe, expect, it } from "vitest";
import { MasterDataDocument } from "./MasterDataDocument.js";
import { Vocabulary } from "./Vocabulary.js";

describe("MasterDataDocument", () => {
  it("creates empty document", () => {
    const document =
      new MasterDataDocument();

    expect(
      document.vocabularies
    ).toHaveLength(0);
  });

  it("adds vocabulary", () => {
    const document =
      new MasterDataDocument();

    const updated =
      document.addVocabulary(
        new Vocabulary({
          type: "Location"
        })
      );

    expect(
      updated.vocabularies
    ).toHaveLength(1);
  });

  it("finds vocabulary", () => {
    const document =
      new MasterDataDocument({
        vocabularies: [
          new Vocabulary({
            type: "Location"
          })
        ]
      });

    expect(
      document.getVocabulary(
        "Location"
      )
    ).toBeDefined();
  });
});