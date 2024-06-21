import { Temporal } from "@js-temporal/polyfill";

export function clamp(
  value: Temporal.PlainDate,
  minValue?: Temporal.PlainDate,
  maxValue?: Temporal.PlainDate
): Temporal.PlainDate;
export function clamp(
  value: Temporal.PlainDateTime,
  minValue?: Temporal.PlainDateTime,
  maxValue?: Temporal.PlainDateTime
): Temporal.PlainDateTime;

export function clamp(
  value: Temporal.PlainDate | Temporal.PlainDateTime,
  minValue?: Temporal.PlainDate | Temporal.PlainDateTime,
  maxValue?: Temporal.PlainDate | Temporal.PlainDateTime
): Temporal.PlainDate | Temporal.PlainDateTime {
  if (
    minValue &&
    Temporal[
      value instanceof Temporal.PlainDate ? "PlainDate" : "PlainDateTime"
    ].compare(value, minValue) < 0
  ) {
    return minValue;
  }

  if (
    maxValue &&
    Temporal[
      value instanceof Temporal.PlainDate ? "PlainDate" : "PlainDateTime"
    ].compare(value, maxValue) > 0
  ) {
    return maxValue;
  }

  return value;
}
