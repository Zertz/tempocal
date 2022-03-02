import { Temporal } from "@js-temporal/polyfill";
import { Value } from "./types";

export function getFirstDayOfWeek(value: Value) {
  let firstDayOfWeek: Value | undefined = undefined;

  do {
    if (value.dayOfWeek === 1) {
      firstDayOfWeek = value;
    } else {
      value = value.subtract({ days: 1 });
    }
  } while (!firstDayOfWeek);

  return firstDayOfWeek;
}

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
      start.dayOfWeek === 0 ? start : start.subtract({ days: start.dayOfWeek }),
    end:
      end.dayOfWeek === end.daysInWeek
        ? end
        : end.add({ days: end.daysInWeek - end.dayOfWeek - 1 }),
  };
}

export function getMonthStartDate(value: Value) {
  return value.toPlainYearMonth().toPlainDate({ day: 1 });
}

export function getMonthEndDate(value: Value) {
  return getMonthStartDate(value).add({ months: 1 }).subtract({ days: 1 });
}

export function getMonthNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  monthsInYear: number
) {
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
  });

  const monthNames: string[] = [];

  for (let i = 0; i < monthsInYear; i += 1) {
    const date = new Date(
      `2017-${`${i + 1}`.padStart(2, "0")}-01T12:00:00.000Z`
    );

    const month = monthFormatter.format(date);

    monthNames.push(month);
  }

  return monthNames;
}

export function getWeekdayNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  const firstDayOfWeek = getFirstDayOfWeek(Temporal.Now.plainDate("iso8601"));

  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });

  const weekdayNames: string[] = [];

  for (let i = 0; i < daysInWeek; i += 1) {
    const weekday = weekdayFormatter.format(
      new Date(firstDayOfWeek.add({ days: i }).toString())
    );

    weekdayNames.push(weekday);
  }

  return weekdayNames;
}
