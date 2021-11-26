import { Temporal } from "@js-temporal/polyfill";
import { Value } from "./types";

export function getFirstDayOfWeek(value: Value) {
  let firstDayOfWeek: Value;

  do {
    if (value.dayOfWeek === 1) {
      firstDayOfWeek = value;
    } else {
      value = value.subtract({ days: 1 });
    }
  } while (!firstDayOfWeek);

  return firstDayOfWeek;
}

export function getMonthStartDate(value: Value) {
  return value.toPlainYearMonth().toPlainDate({ day: 1 });
}

export function getMonthNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  monthsInYear: number
) {
  const monthNames: string[] = [];

  for (let i = 0; i < monthsInYear; i += 1) {
    const date = new Date(
      `2017-${`${i + 1}`.padStart(2, "0")}-01T12:00:00.000Z`
    );

    const month = new Intl.DateTimeFormat(locale, {
      month: "long",
    }).format(date);

    monthNames.push(month);
  }

  return monthNames;
}

export function getWeekdayNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  let firstDayOfWeek = getFirstDayOfWeek(Temporal.Now.plainDate("iso8601"));

  const weekdayNames: string[] = [];

  for (let i = 0; i < daysInWeek; i += 1) {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(new Date(firstDayOfWeek.add({ days: i }).toLocaleString()));

    weekdayNames.push(weekday);
  }

  return weekdayNames;
}
