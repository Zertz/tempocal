import { getMonthStartDate } from "./getMonthStartDate";
import { Temporal } from "./temporal.js";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getMonthEndDate(value: Value) {
  return getMonthStartDate(value).add({ months: 1 }).subtract({ days: 1 });
}
