// packages/core/src/Validation.ts

import { EpcisDocument } from "./EpcisDocument.js";
import { ObjectEvent } from "./ObjectEvent.js";
import { AggregationEvent } from "./AggregationEvent.js";
import { TransformationEvent } from "./TransformationEvent.js";
import { TransactionEvent } from "./TransactionEvent.js";

export type ValidationProfile = "core";

export interface ValidationOptions {
  profile?: ValidationProfile;
}

export type ValidationSeverity =
  | "error"
  | "warning";

export interface ValidationError {
  code: string;
  severity: ValidationSeverity;
  message: string;
  path?: string;
}

export interface ValidationResult {
  valid: boolean;
  profile: ValidationProfile;
  errors: ValidationError[];
}

export function validateDocument(
  document: EpcisDocument,
  options: ValidationOptions = {}
): ValidationResult {
  const profile = options.profile ?? "core";
  const errors: ValidationError[] = [];

  for (const [eventIndex, event] of document.body.events.entries()) {
    if (event instanceof ObjectEvent) {
      if (!event.bizStep) {
        errors.push({
          code: "OBJECT_EVENT_MISSING_BIZSTEP",
          severity: "error",
          message: "ObjectEvent missing bizStep",
          path: `/body/events/${eventIndex}/bizStep`
        });
      }

      if (event.items.length === 0) {
        errors.push({
          code: "OBJECT_EVENT_NO_EPCS",
          severity: "error",
          message: "ObjectEvent contains no EPCs",
          path: `/body/events/${eventIndex}/items`
        });
      }
    }

    if (event instanceof AggregationEvent) {
      if (!event.parent) {
       errors.push({
          code: "AGGREGATION_EVENT_MISSING_PARENT",
          severity: "error",
          message: "AggregationEvent missing parent",
          path: `/body/events/${eventIndex}/parent`
        });
      }

      if (event.children.length === 0) {
        errors.push({
          code: "AGGREGATION_EVENT_NO_CHILDREN",
          severity: "error",
          message: "AggregationEvent contains no children",
          path: `/body/events/${eventIndex}/children`
        });
      }
    }

    if (event instanceof TransformationEvent) {
      if (event.inputItems.length === 0) {
        errors.push({
          code: "TRANSFORMATION_EVENT_NO_INPUTS",
          severity: "error",
          message: "TransformationEvent contains no inputs",
          path: `/body/events/${eventIndex}/inputItems`
        });
      }

      if (event.outputItems.length === 0) {
        errors.push({
          code: "TRANSFORMATION_EVENT_NO_OUTPUTS",
          severity: "error",
          message: "TransformationEvent contains no outputs",
          path: `/body/events/${eventIndex}/outputItems`
        });
      }
    }

    if (event instanceof TransactionEvent) {
      if (event.transactions.length === 0) {
        errors.push({
          code: "TRANSACTION_EVENT_NO_TRANSACTIONS",
          severity: "error",
          message: "TransactionEvent contains no business transactions",
          path: `/body/events/${eventIndex}/transactions`
        });
      }
    }
  }

  return {
  valid: errors.length === 0,
  profile,
  errors
  };
}