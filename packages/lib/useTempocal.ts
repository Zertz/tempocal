import { Temporal } from "@js-temporal/polyfill";
import * as React from "react";
import { Locale, Value } from "./types";
import {
  getCalendarMonthDateRange,
  getMonths,
  getMonthStartDate,
  getWeekdays,
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
  monthsInYear: number
) {
  return React.useMemo(
    () => getMonths(locale, monthsInYear),
    [locale, monthsInYear]
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
  locale,
  mode,
  setValue,
  value,
}: {
  locale: Locale;
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

  const months = useMonths(locale, calendarValue.monthsInYear);
  const weekdays = useWeekdays(locale, calendarValue.daysInWeek);

  const onChangeCalendarValue = React.useCallback(
    (params?: Temporal.PlainDate | Temporal.PlainDateLike) => {
      if (!params) {
        setCalendarValue(Temporal.Now.plainDate("iso8601"));

        return;
      }

      if (params instanceof Temporal.PlainDate) {
        setCalendarValue(params);

        return;
      }

      setCalendarValue(calendarValue.with(params));
    },
    [calendarValue]
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
    calendarValue,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
    weekdays,
  };
}
