import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";
import { TransactionEvent } from "./TransactionEvent.js";

describe("TransactionEvent", () => {
  it("creates a transaction event", () => {
    const item = SerializedItem.fromBarcode(
      "010003123456789021ABC123"
    );

    const event = new TransactionEvent({
      action: "OBSERVE",
      bizStep: "shipping",
      disposition: "in_transit",
      location: "urn:epc:id:sgln:0614141.12345.0",
      eventTime: "2026-01-01T00:00:00.000Z",
      items: [item],
      transactions: [
        {
          type: "po",
          id: "PO-12345"
        }
      ]
    });

    expect(event.toJSON()).toEqual({
      eventType: "TransactionEvent",
      action: "OBSERVE",
      bizStep: "shipping",
      disposition: "in_transit",
      location: "urn:epc:id:sgln:0614141.12345.0",
      eventTime: "2026-01-01T00:00:00.000Z",
      epcList: [
        "urn:epc:id:sgtin:00031234567890.ABC123"
      ],
      bizTransactionList: [
        {
          type: "po",
          id: "PO-12345"
        }
      ]
    });
  });
});