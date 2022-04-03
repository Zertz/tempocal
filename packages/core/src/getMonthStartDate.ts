import { Temporal } from "@js-temporal/polyfill";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getMonthStartDate(value: Value) {
  return value.toPlainYearMonth().toPlainDate({ day: 1 });
}
