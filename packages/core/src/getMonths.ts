import { Temporal } from "@js-temporal/polyfill";
import { getNow } from "./getNow";
import { temporalToDate } from "./temporalToDate";

const referenceValue = getNow();

export function getMonths(
  locale: Intl.LocalesArgument,
  minValue?: Temporal.PlainDate | Temporal.PlainDateTime,
  maxValue?: Temporal.PlainDate | Temporal.PlainDateTime
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
    const date = temporalToDate(value);

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
