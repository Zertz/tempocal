import { Temporal } from "@js-temporal/polyfill";
import { getMonthStartDate } from "./getMonthStartDate";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getMonthEndDate(value: Value) {
  return getMonthStartDate(value).add({ months: 1 }).subtract({ days: 1 });
}
