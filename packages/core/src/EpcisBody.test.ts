import { describe, expect, it } from "vitest";

import { EpcisBody } from "./EpcisBody.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { BusinessStep } from "./BusinessStep.js";
import { Disposition } from "./Disposition.js";

describe("EpcisBody", () => {
  it("creates empty body", () => {
    const body = new EpcisBody();

    expect(body.events).toHaveLength(0);
  });

  it("adds event", () => {
    const body = new EpcisBody();

    const updated = body.addEvent(
      new ObjectEvent({
        action: "ADD",
        bizStep: BusinessStep.Commissioning,
        disposition: Disposition.ACTIVE,
        items: []
      })
    );

    expect(updated.events).toHaveLength(1);
  });

  it("serializes event list", () => {
    const body = new EpcisBody();

    expect(body.toJSON()).toHaveProperty("eventList");
  });

  it("parses a minimal body", () => {
    const body = EpcisBody.parse({
      eventList: []
    });

    expect(body.events).toHaveLength(0);
  });

  it("throws for invalid body input", () => {
    expect(() => EpcisBody.parse(null)).toThrow(
      "Invalid EPCIS body"
    );
  });
});