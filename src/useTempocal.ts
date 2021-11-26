import { Temporal } from "@js-temporal/polyfill";
import { useCallback, useMemo } from "react";
import { Locale, Value } from "./types";
import { getMonthNames, getMonthStartDate, getWeekdayNames } from "./utils";

export function useMonthStartDate(value: Value) {
  return useMemo(() => getMonthStartDate(value), [value]);
}

export function useMonthNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  monthsInYear: number
) {
  return useMemo(
    () => getMonthNames(locale, monthsInYear),
    [locale, monthsInYear]
  );
}

export function useWeekdayNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  return useMemo(
    () => getWeekdayNames(locale, daysInWeek),
    [daysInWeek, locale]
  );
}

type RequiredValue<Mode> = Mode extends "date"
  ? Temporal.PlainDate
  : Mode extends "datetime"
  ? Temporal.PlainDateTime
  : never;

type Like<Mode> = Mode extends "date"
  ? Temporal.DateLike
  : Mode extends "datetime"
  ? Temporal.DateTimeLike
  : never;

export function useTempocal<Mode extends "date" | "datetime">(
  mode: Mode,
  {
    locale,
    setValue,
    value,
  }: {
    locale: Locale;
    setValue: (value: RequiredValue<Mode>) => void;
    value: RequiredValue<Mode>;
  }
) {
  const monthStartDate = useMonthStartDate(value);
  const monthNames = useMonthNames(locale, value.monthsInYear);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  const onChange = useCallback(
    (params: Like<Mode>) => {
      const item = value.with(params);

      setValue(
        // @ts-expect-error Help.
        mode === "date"
          ? Temporal.PlainDate.from(item)
          : Temporal.PlainDateTime.from(item)
      );
    },
    [mode, setValue, value]
  );

  return {
    monthName: monthNames[value.month - 1],
    monthNames,
    monthStartDate,
    onChange,
    weekdayNames,
  };
}
