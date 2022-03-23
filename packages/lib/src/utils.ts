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
    start: [0, start.daysInWeek].includes(start.dayOfWeek)
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

export function getMonthStartDate(value: Value) {
  return value.toPlainYearMonth().toPlainDate({ day: 1 });
}

export function getMonthEndDate(value: Value) {
  return getMonthStartDate(value).add({ months: 1 }).subtract({ days: 1 });
}

export function getMonths(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  referenceValue: Temporal.PlainDate,
  minValue?: Temporal.PlainDate,
  maxValue?: Temporal.PlainDate
) {
  const longMonthFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
  });

  const shortMonthFormatter = new Intl.DateTimeFormat(locale, {
    month: "short",
  });

  const narrowMonthFormatter = new Intl.DateTimeFormat(locale, {
    month: "narrow",
  });

  const months: {
    month: number;
    longName: string;
    shortName: string;
    narrowName: string;
    available: boolean;
  }[] = [];

  for (let i = 0; i < referenceValue.monthsInYear; i += 1) {
    const value = referenceValue.with({ month: i + 1 });
    const date = new Date(value.toString());

    const isBeforeMinValue =
      minValue &&
      (value.year < minValue.year ||
        (value.year === minValue.year && value.month < minValue.month));

    const isAfterMaxValue =
      maxValue &&
      (value.year > maxValue.year ||
        (value.year === maxValue.year && value.month > maxValue.month));

    months.push({
      month: i + 1,
      longName: longMonthFormatter.format(date),
      shortName: shortMonthFormatter.format(date),
      narrowName: narrowMonthFormatter.format(date),
      available: !isBeforeMinValue && !isAfterMaxValue,
    });
  }

  return months;
}

export function getWeekdays(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  const firstDayOfWeek = getFirstDayOfWeek(Temporal.Now.plainDate("iso8601"));

  const longWeekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  const shortWeekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });

  const narrowWeekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "narrow",
  });

  const weekdays: {
    weekday: number;
    longName: string;
    shortName: string;
    narrowName: string;
  }[] = [];

  for (let i = 0; i < daysInWeek; i += 1) {
    const date = new Date(firstDayOfWeek.add({ days: i }).toString());

    weekdays.push({
      weekday: i + 1,
      longName: longWeekdayFormatter.format(date),
      shortName: shortWeekdayFormatter.format(date),
      narrowName: narrowWeekdayFormatter.format(date),
    });
  }

  return weekdays;
}

export function getYears(
  minValue: Temporal.PlainDate | undefined,
  maxValue: Temporal.PlainDate | undefined
) {
  const years: number[] = [];

  if (!minValue || !maxValue) {
    return years;
  }

  for (let i = minValue.year; i < maxValue.year + 1; i += 1) {
    years.push(i);
  }

  return years;
}
