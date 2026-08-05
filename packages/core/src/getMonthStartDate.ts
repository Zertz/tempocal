import { Temporal } from "./temporal.js";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getMonthStartDate(value: Value) {
  if (value instanceof Temporal.PlainDateTime) {
    return value.with({ day: 1 }).toPlainDate();
  }

  return value.with({ day: 1 });
}
