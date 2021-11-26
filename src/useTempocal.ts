import { Intl, Temporal } from "@js-temporal/polyfill";
import { useCallback, useMemo } from "react";
import { getMonthNames, getWeekdayNames } from "./utils";

function useMonthNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  monthsInYear: number
) {
  return useMemo(
    () => getMonthNames(locale, monthsInYear),
    [locale, monthsInYear]
  );
}

function useWeekdayNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  return useMemo(
    () => getWeekdayNames(locale, daysInWeek),
    [daysInWeek, locale]
  );
}

export function useTempocal({
  locale,
  setValue,
  value,
}: {
  locale: Parameters<typeof Intl.DateTimeFormat>[0];
  setValue: (value: Temporal.PlainDate) => void;
  value: Temporal.PlainDate;
}) {
  const monthStartDay = value
    .toPlainYearMonth()
    .toPlainDate({ day: 1 }).dayOfWeek;

  const monthNames = useMonthNames(locale, value.monthsInYear);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  const onChange = useCallback(
    ({
      day = value.day,
      month = value.month,
      year = value.year,
    }: {
      day?: number;
      month?: number;
      year?: number;
    }) => {
      setValue(
        Temporal.PlainDate.from({
          day,
          month,
          year,
        })
      );
    },
    [value]
  );

  return {
    daysInWeek: value.daysInWeek,
    daysInMonth: value.daysInMonth,
    daysInYear: value.daysInYear,
    month: value.month,
    monthName: monthNames[value.month - 1],
    monthNames,
    monthStartDay,
    onChange,
    weekdayNames,
  };
}
