import { describe, expect, it } from "vitest";
import { VocabularyElement } from "./VocabularyElement.js";

describe("VocabularyElement", () => {
  it("creates a vocabulary element", () => {
    const element = new VocabularyElement({
      id: "urn:epc:id:sgln:0614141.00001.0"
    });

    expect(element.id).toBe(
      "urn:epc:id:sgln:0614141.00001.0"
    );
  });

  it("stores attributes", () => {
    const element = new VocabularyElement({
      id: "urn:epc:id:sgln:0614141.00001.0",
      attributes: [
        {
          id: "name",
          value: "Warehouse A"
        }
      ]
    });

    expect(
      element.getAttribute("name")
    ).toBe("Warehouse A");
  });

  it("adds attributes immutably", () => {
    const element = new VocabularyElement({
      id: "test"
    });

    const updated =
      element.addAttribute(
        "city",
        "Cleveland"
      );

    expect(
      updated.getAttribute("city")
    ).toBe("Cleveland");

    expect(
      element.getAttribute("city")
    ).toBeUndefined();
  });
});