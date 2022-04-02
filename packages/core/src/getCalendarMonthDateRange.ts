import { Temporal } from "@js-temporal/polyfill";
import { getMonthEndDate } from "./getMonthEndDate";
import { getMonthStartDate } from "./getMonthStartDate";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getCalendarMonthDateRange(value: Value, rollover: boolean) {
  const start = getMonthStartDate(value);
  const end = getMonthEndDate(value);

  if (!rollover) {
    return {
      start,
      end,
    };
  }

  return {
    start:
      start.dayOfWeek === start.daysInWeek
        ? start.subtract({ days: start.daysInWeek })
        : start.subtract({ days: start.dayOfWeek }),
    end: end.add({
      days:
        end.dayOfWeek === end.daysInWeek
          ? end.daysInWeek - 1
          : end.daysInWeek - end.dayOfWeek - 1 || end.daysInWeek,
    }),
  };
}
