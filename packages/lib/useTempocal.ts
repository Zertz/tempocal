import { Temporal } from "@js-temporal/polyfill";
import { useCallback, useMemo } from "react";
import { Locale, Value } from "./types";
import {
  getCalendarMonthDateRange,
  getMonthNames,
  getMonthStartDate,
  getWeekdayNames,
} from "./utils";

export function useCalendarMonthDateRange(value: Value, rollover: boolean) {
  return useMemo(
    () => getCalendarMonthDateRange(value, rollover),
    [rollover, value]
  );
}

export function useDates(from: Value, to: Value) {
  return useMemo(() => console.info({ from, to }), [from, to]);
}

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

type ChangeValue<Mode> = Mode extends "date"
  ? Temporal.PlainDate | Temporal.DateLike
  : Mode extends "datetime"
  ? Temporal.PlainDateTime | Temporal.DateTimeLike
  : never;

export function useTempocal<Mode extends "date" | "datetime">({
  locale,
  mode,
  setValue,
  value,
}: {
  locale: Locale;
  mode: Mode;
  setValue: (value: RequiredValue<Mode>) => void;
  value: RequiredValue<Mode>;
}) {
  const monthNames = useMonthNames(locale, value.monthsInYear);
  const weekdayNames = useWeekdayNames(locale, value.daysInWeek);

  const onSelect = useCallback(
    // @ts-expect-error You're not wrong.
    (nextValue: Temporal.PlainDate) => setValue(nextValue),
    [setValue]
  );

  const onChange = useCallback(
    (params: ChangeValue<Mode>) => {
      if (
        params instanceof Temporal.PlainDate ||
        params instanceof Temporal.PlainDateTime
      ) {
        // @ts-expect-error Help.
        setValue(params);

        return;
      }
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
    monthNames,
    onChange,
    onSelect,
    weekdayNames,
  };
}
