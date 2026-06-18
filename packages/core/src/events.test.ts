import { describe, expect, it } from "vitest";
import { SerializedItem } from "./SerializedItem.js";

import {
  createReceivingEvent,
  createShippingEvent,
  createPackingEvent,
  createUnpackingEvent,
  createCommissioningEvent,
  createDecommissioningEvent,
  createTransformationEvent,
  createShippingTransactionEvent,
  createReceivingTransactionEvent,
  createReturnEvent,
  createRecallEvent,
  createQualityHoldEvent,
  createReleaseEvent,
  createInventoryCountEvent,
  createInventoryAdjustmentEvent,
} from "./events.js";

describe("event factories", () => {
  it("creates a receiving event", () => {
    const item = SerializedItem.fromBarcode(
      "01000312345678901726123121ABC123"
    );

    const event = createReceivingEvent({
      items: [item],
      location: "urn:epc:id:sgln:0031234.00001.0",
      eventTime: "2026-01-01T00:00:00.000Z"
    });

    expect(event.toJSON().bizStep).toBe("receiving");
    expect(event.toJSON().epcList).toEqual([
      "urn:epc:id:sgtin:00031234567890.ABC123"
    ]);
  });

  it("creates a shipping event", () => {
    const item = SerializedItem.fromBarcode(
      "01000312345678901726123121ABC123"
    );

    const event = createShippingEvent({
      items: [item],
      eventTime: "2026-01-01T00:00:00.000Z"
    });

    expect(event.toJSON().bizStep).toBe("shipping");
  });

  it("creates a packing event", () => {
    const parent = SerializedItem.fromBarcode(
      "01000312345678901726123121CASE123"
    );

    const child = SerializedItem.fromBarcode(
      "01000312345678901726123121BOTTLE123"
    );

    const event = createPackingEvent({
      parent,
      children: [child],
      eventTime: "2026-01-01T00:00:00.000Z"
    });

    expect(event.toJSON().bizStep).toBe("packing");
    expect(event.toJSON().parentId).toBe(
      "urn:epc:id:sgtin:00031234567890.CASE123"
    );
  });

  it("creates an unpacking event", () => {
  const parent = SerializedItem.fromBarcode(
    "01000312345678901726123121CASE123"
  );

  const child = SerializedItem.fromBarcode(
    "01000312345678901726123121BOTTLE123"
  );

  const event = createUnpackingEvent({
    parent,
    children: [child],
    eventTime: "2026-01-01T00:00:00.000Z"
  });

  expect(event.toJSON().action).toBe("DELETE");
  expect(event.toJSON().bizStep).toBe("unpacking");
  });

  it("creates a commissioning event", () => {
  const item = SerializedItem.fromBarcode(
    "01000312345678901726123121ABC123"
  );

  const event = createCommissioningEvent({
    items: [item]
  });

  expect(event.toJSON().action).toBe("ADD");
  expect(event.toJSON().bizStep).toBe("commissioning");
  });

  it("creates a decommissioning event", () => {
  const item = SerializedItem.fromBarcode(
    "01000312345678901726123121ABC123"
  );

 const event = createDecommissioningEvent({
  items: [item]
  });

  expect(event.toJSON().action).toBe("DELETE");
  expect(event.toJSON().bizStep).toBe("commissioning");
  });

  it("creates a transformation event", () => {
  const input = SerializedItem.fromBarcode(
    "01000312345678901726123121INPUT123"
  );

  const output = SerializedItem.fromBarcode(
    "01000312345678901726123121OUTPUT123"
  );

  const event = createTransformationEvent({
    inputItems: [input],
    outputItems: [output]
  });

  expect(event.toJSON().eventType).toBe("TransformationEvent");
  expect(event.toJSON().bizStep).toBe("transforming");
  });

  it("creates a shipping transaction event", () => {
  const item = SerializedItem.fromBarcode(
    "01000312345678901726123121ABC123"
  );

  const event = createShippingTransactionEvent({
    items: [item],
    transactions: [
      {
        type: "po",
        id: "PO-12345"
      }
    ]
  });

  expect(event.toJSON().eventType).toBe("TransactionEvent");
  expect(event.toJSON().bizStep).toBe("shipping");
  });

  it("creates a receiving transaction event", () => {
  const item = SerializedItem.fromBarcode(
    "01000312345678901726123121ABC123"
  );

  const event = createReceivingTransactionEvent({
    items: [item],
    transactions: [
      {
        type: "po",
        id: "PO-12345"
      }
    ]
  });

  expect(event.toJSON().eventType).toBe("TransactionEvent");
  expect(event.toJSON().bizStep).toBe("receiving");
  });

  it("creates a return event", () => {
  const item = SerializedItem.fromBarcode(
    "010003123456789017261231ABC123"
  );

  const event = createReturnEvent({
    items: [item]
  });

  expect(event.toJSON().bizStep).toBe("returning");
  });

  it("creates a recall event", () => {
  const item = SerializedItem.fromBarcode(
    "010003123456789017261231ABC123"
  );

  const event = createRecallEvent({
    items: [item]
  });

  expect(event.toJSON().bizStep).toBe("recalling");
  });

  it("creates a quality hold event", () => {
  const item = SerializedItem.fromBarcode(
    "010003123456789017261231ABC123"
  );

  const event = createQualityHoldEvent({
    items: [item]
  });

  expect(event.toJSON().bizStep).toBe("holding");
  });

  it("creates a release event", () => {
  const item = SerializedItem.fromBarcode(
    "010003123456789017261231ABC123"
  );

  const event = createReleaseEvent({
    items: [item]
  });

  expect(event.toJSON().bizStep).toBe("releasing");
  });

  it("creates an inventory count event", () => {
  const item = SerializedItem.fromBarcode(
    "010003123456789017261231ABC123"
  );

  const event = createInventoryCountEvent({
    items: [item]
  });

  expect(event.toJSON().bizStep).toBe("inventorying");
  });

  it("creates an inventory adjustment event", () => {
  const item = SerializedItem.fromBarcode(
    "010003123456789017261231ABC123"
  );

  const event = createInventoryAdjustmentEvent({
    items: [item]
  });

  expect(event.toJSON().bizStep).toBe("adjusting");
  });


});