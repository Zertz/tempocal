import { Temporal } from "@js-temporal/polyfill";

export function clamp<
  Value extends Temporal.PlainDate | Temporal.PlainDateTime
>(value: Value, minValue?: Value, maxValue?: Value) {
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
