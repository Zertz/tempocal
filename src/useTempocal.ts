import { Intl, Temporal } from "@js-temporal/polyfill";
import { useCallback, useMemo } from "react";
import { getMonthNames, getMonthStartDay, getWeekdayNames } from "./utils";

function useMonthStartDay(value: Temporal.PlainDate | Temporal.PlainDateTime) {
  return useMemo(() => getMonthStartDay(value), [value]);
}

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

type Value<Mode> = Mode extends "date"
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
    locale: Parameters<typeof Intl.DateTimeFormat>[0];
    setValue: (value: Value<Mode>) => void;
    value: Value<Mode>;
  }
) {
  const monthStartDay = useMonthStartDay(value);
  const monthNames = useMonthNames(locale, value.monthsInYear);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  const onChange = useCallback(
    (params: Like<Mode>) => {
      const item = value.with(params);

      setValue(
        // @ts-expect-error
        mode === "date"
          ? Temporal.PlainDate.from(item)
          : Temporal.PlainDateTime.from(item)
      );
    },
    [value]
  );

  return {
    monthName: monthNames[value.month - 1],
    monthNames,
    monthStartDay,
    onChange,
    weekdayNames,
  };
}
