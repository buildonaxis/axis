import { describe, expect, it } from "vitest";

import { validateDocument } from "./Validation.js";
import { EpcisDocument } from "./EpcisDocument.js";
import { EpcisBody } from "./EpcisBody.js";
import { SerializedItem } from "./SerializedItem.js";
import {
  createShippingEvent,
  createPackingEvent
} from "./events.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";

describe("Validation", () => {
  it("returns valid for a well formed object event", () => {
    const item =
      SerializedItem.fromBarcode(
        "010003123456789017261231ABC123"
      );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({
            items: [item]
          })
        ]
      })
    });

    const result =
      validateDocument(document);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("detects object event with no EPCs", () => {
    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createShippingEvent({
            items: []
          })
        ]
      })
    });

    const result =
      validateDocument(document);

    expect(result.valid).toBe(false);

    expect(
      result.errors.some(
        e =>
          e.message ===
          "ObjectEvent contains no EPCs"
      )
    ).toBe(true);
  });

  it("detects aggregation event with no children", () => {
    const parent =
      SerializedItem.fromBarcode(
        "010003123456789017261231CASE123"
      );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          createPackingEvent({
            parent,
            children: []
          })
        ]
      })
    });

    const result =
      validateDocument(document);

    expect(result.valid).toBe(false);

    expect(
      result.errors.some(
        e =>
          e.message ===
          "AggregationEvent contains no children"
      )
    ).toBe(true);
  });

  it("detects transformation event with no outputs", () => {
    const input =
      SerializedItem.fromBarcode(
        "010003123456789017261231INPUT123"
      );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          new TransformationEvent({
            bizStep: "commissioning",
            disposition: "active",
            inputItems: [input],
            outputItems: []
          })
        ]
      })
    });

    const result =
      validateDocument(document);

    expect(result.valid).toBe(false);

    expect(
      result.errors.some(
        e =>
          e.message ===
          "TransformationEvent contains no outputs"
      )
    ).toBe(true);
  });

  it("detects transaction event with no business transactions", () => {
    const item =
      SerializedItem.fromBarcode(
        "010003123456789017261231ITEM123"
      );

    const document = new EpcisDocument({
      body: new EpcisBody({
        events: [
          new TransactionEvent({
            action: "OBSERVE",
            bizStep: "shipping",
            disposition: "in_transit",
            location: "warehouse",
            items: [item],
            transactions: []
          })
        ]
      })
    });

    const result =
      validateDocument(document);

    expect(result.valid).toBe(false);

    expect(
      result.errors.some(
        e =>
          e.message ===
          "TransactionEvent contains no business transactions"
      )
    ).toBe(true);
  });

  it("uses the core validation profile by default", () => {
  const document = new EpcisDocument();

  const result = validateDocument(document);

  expect(result.profile).toBe("core");
  });

  it("accepts an explicit core validation profile", () => {
  const document = new EpcisDocument();

  const result = validateDocument(document, {
    profile: "core"
  });

  expect(result.profile).toBe("core");
  });

  it("returns validation error codes", () => {
  const document = new EpcisDocument({
    body: new EpcisBody({
      events: [
        createShippingEvent({
          items: []
        })
      ]
    })
  });

  const result = validateDocument(document);

  expect(result.valid).toBe(false);

  expect(result.errors[0]).toEqual({
    code: "OBJECT_EVENT_NO_EPCS",
    severity: "error",
    message: "ObjectEvent contains no EPCs"
  });
  });

  
});