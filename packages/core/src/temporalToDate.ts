import { Temporal } from "@js-temporal/polyfill";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function temporalToDate(value: Value) {
  if (value instanceof Temporal.PlainDate) {
    return new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0);
  }

  return new Date(
    value.year,
    value.month - 1,
    value.day,
    value.hour,
    value.minute,
    value.second,
    value.millisecond
  );
}
