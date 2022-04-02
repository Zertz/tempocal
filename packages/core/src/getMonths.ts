import { Temporal } from "@js-temporal/polyfill";

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
    disabled: boolean;
  }[] = [];

  for (let i = 0; i < referenceValue.monthsInYear; i += 1) {
    const value = referenceValue.with({ month: i + 1 });
    const date = new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0);

    const isBeforeMinValue =
      !!minValue &&
      (value.year < minValue.year ||
        (value.year === minValue.year && value.month < minValue.month));

    const isAfterMaxValue =
      !!maxValue &&
      (value.year > maxValue.year ||
        (value.year === maxValue.year && value.month > maxValue.month));

    months.push({
      month: i + 1,
      longName: longMonthFormatter.format(date),
      shortName: shortMonthFormatter.format(date),
      narrowName: narrowMonthFormatter.format(date),
      disabled: isBeforeMinValue || isAfterMaxValue,
    });
  }

  return months;
}
