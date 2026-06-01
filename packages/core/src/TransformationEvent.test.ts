import { describe, expect, it } from "vitest";

import { SerializedItem } from "./SerializedItem.js";
import { TransformationEvent } from "./TransformationEvent.js";

describe("TransformationEvent", () => {
  it("creates transformation events", () => {
    const input = SerializedItem.fromBarcode(
      "010031234567890121INPUT1"
    );

    const output = SerializedItem.fromBarcode(
      "010031234567890121OUTPUT1"
    );

    const event = new TransformationEvent({
      bizStep: "commissioning",
      disposition: "active",

      inputItems: [input],
      outputItems: [output]
    });

    expect(event.inputEpcs.length).toBe(1);
    expect(event.outputEpcs.length).toBe(1);

    expect(event.toJSON().eventType)
      .toBe("TransformationEvent");
  });
});