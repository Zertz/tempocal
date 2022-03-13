import { Temporal } from "@js-temporal/polyfill";
import * as React from "react";
import { Locale, Value } from "./types";
import {
  getCalendarMonthDateRange,
  getMonths,
  getMonthStartDate,
  getWeekdays,
  getYears,
} from "./utils";

export function useCalendarMonthDateRange(value: Value, rollover: boolean) {
  return React.useMemo(
    () => getCalendarMonthDateRange(value, rollover),
    [rollover, value]
  );
}

export function useMonthStartDate(value: Value) {
  return React.useMemo(() => getMonthStartDate(value), [value]);
}

export function useMonths(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  referenceValue: Temporal.PlainDate,
  minValue?: Temporal.PlainDate,
  maxValue?: Temporal.PlainDate
) {
  return React.useMemo(
    () => getMonths(locale, referenceValue, minValue, maxValue),
    [locale, maxValue, minValue, referenceValue]
  );
}

export function useWeekdays(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  return React.useMemo(
    () => getWeekdays(locale, daysInWeek),
    [daysInWeek, locale]
  );
}

export function useYears(
  minValue: Temporal.PlainDate | undefined,
  maxValue: Temporal.PlainDate | undefined
) {
  return React.useMemo(
    () => getYears(minValue, maxValue),
    [maxValue, minValue]
  );
}

type RequiredValue<Mode> = Mode extends "date"
  ? Temporal.PlainDate
  : Mode extends "datetime"
  ? Temporal.PlainDateTime
  : never;

type ChangeValue<Mode> = Mode extends "date"
  ? Temporal.PlainDate | Temporal.PlainDateLike
  : Mode extends "datetime"
  ? Temporal.PlainDateTime | Temporal.PlainDateTimeLike
  : never;

export function useTempocal<Mode extends "date" | "datetime">({
  clampCalendarValue,
  locale,
  maxValue,
  minValue,
  mode,
  setValue,
  value,
}: {
  clampCalendarValue?: boolean;
  locale: Locale;
  maxValue?: Temporal.PlainDate;
  minValue?: Temporal.PlainDate;
  mode: Mode;
  setValue: (value: RequiredValue<Mode>) => void;
  value: RequiredValue<Mode> | undefined;
}) {
  const [calendarValue, setCalendarValue] = React.useState(() => {
    if (value) {
      return Temporal.PlainDate.from(value);
    }

    return Temporal.Now.plainDate("iso8601");
  });

  const months = useMonths(locale, calendarValue, minValue, maxValue);
  const weekdays = useWeekdays(locale, calendarValue.daysInWeek);
  const years = useYears(minValue, maxValue);

  const updateCalendarValue = React.useCallback(
    (nextCalendarValue: Temporal.PlainDate) => {
      if (!clampCalendarValue) {
        setCalendarValue(nextCalendarValue);

        return;
      }

      if (
        minValue &&
        Temporal.PlainDate.compare(nextCalendarValue, minValue) < 0
      ) {
        setCalendarValue(minValue);

        return;
      }

      if (
        maxValue &&
        Temporal.PlainDate.compare(nextCalendarValue, maxValue) > 0
      ) {
        setCalendarValue(maxValue);

        return;
      }

      setCalendarValue(nextCalendarValue);
    },
    [clampCalendarValue, maxValue, minValue]
  );

  const onChangeCalendarValue = React.useCallback(
    (params?: Temporal.PlainDate | Temporal.PlainDateLike) => {
      if (!params) {
        updateCalendarValue(Temporal.Now.plainDate("iso8601"));

        return;
      }

      if (params instanceof Temporal.PlainDate) {
        updateCalendarValue(params);

        return;
      }

      updateCalendarValue(calendarValue.with(params));
    },
    [calendarValue, updateCalendarValue]
  );

  const onChangeSelectedValue = React.useCallback(
    (params: ChangeValue<Mode>) => {
      if (
        params instanceof Temporal.PlainDate ||
        params instanceof Temporal.PlainDateTime
      ) {
        // @ts-expect-error Help.
        setValue(params);

        return;
      }

      if (value) {
        // @ts-expect-error Help.
        setValue(value.with(params));

        return;
      }

      setValue(
        // @ts-expect-error Help.
        mode === "date"
          ? Temporal.Now.plainDate("iso8601").with(params)
          : Temporal.Now.plainDateTime("iso8601").with(params)
      );
    },
    [mode, setValue, value]
  );

  return {
    calendarProps: {
      locale,
      maxValue,
      minValue,
      value: calendarValue,
    },
    calendarValue,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
    weekdays,
    years,
  };
}
