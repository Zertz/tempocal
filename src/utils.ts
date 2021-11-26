import { Intl, Temporal } from "@js-temporal/polyfill";

export function getMonthStartDate(
  value: Temporal.PlainDate | Temporal.PlainDateTime
) {
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
  const weekdayNames: string[] = [];

  for (let i = 0; i < daysInWeek; i += 1) {
    const date = new Date(
      `2017-01-${`${i + 1}`.padStart(2, "0")}T12:00:00.000Z`
    );

    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(date);

    weekdayNames.push(weekday);
  }

  return weekdayNames;
}
