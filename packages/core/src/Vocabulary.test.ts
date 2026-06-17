import { describe, expect, it } from "vitest";
import { Vocabulary } from "./Vocabulary.js";
import { VocabularyElement } from "./VocabularyElement.js";

describe("Vocabulary", () => {
  it("creates vocabulary", () => {
    const vocabulary =
      new Vocabulary({
        type: "urn:epcglobal:epcis:vtype:Location"
      });

    expect(
      vocabulary.type
    ).toBe(
      "urn:epcglobal:epcis:vtype:Location"
    );
  });

  it("adds elements", () => {
    const vocabulary =
      new Vocabulary({
        type: "Location"
      });

    const updated =
      vocabulary.add(
        new VocabularyElement({
          id: "loc-1"
        })
      );

    expect(
      updated.elements
    ).toHaveLength(1);
  });

  it("finds elements", () => {
    const vocabulary =
      new Vocabulary({
        type: "Location",
        elements: [
          new VocabularyElement({
            id: "loc-1"
          })
        ]
      });

    expect(
      vocabulary.find("loc-1")
    ).toBeDefined();
  });
  
});