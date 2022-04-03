import { Temporal } from "@js-temporal/polyfill";
import { getMonthEndDate } from "./getMonthEndDate";
import { getMonthStartDate } from "./getMonthStartDate";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getCalendarMonthDateRange(
  value: Value,
  rollover: boolean,
  startOfWeek: number
) {
  const start = getMonthStartDate(value);
  const end = getMonthEndDate(value);

  if (!rollover) {
    return {
      start,
      end,
    };
  }

  return {
    start: start.subtract({
      days:
        start.dayOfWeek > startOfWeek
          ? start.dayOfWeek - startOfWeek
          : start.daysInWeek - Math.abs(start.dayOfWeek - startOfWeek),
    }),
    end: end.add({
      days:
        startOfWeek > end.dayOfWeek
          ? Math.abs(end.dayOfWeek - startOfWeek) - 1 || end.daysInWeek
          : end.daysInWeek - Math.abs(end.dayOfWeek - startOfWeek) - 1,
    }),
  };
}
