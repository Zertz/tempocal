import { Temporal } from "@js-temporal/polyfill";
import { getMonths, getYears } from "@tempocal/core";
import * as React from "react";

function useMonths(
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

function useYears(
  minValue: Temporal.PlainDate | undefined,
  maxValue: Temporal.PlainDate | undefined
) {
  return React.useMemo(
    () => getYears(minValue, maxValue),
    [maxValue, minValue]
  );
}

export type DateRange =
  | [undefined, undefined]
  | [Temporal.PlainDate, undefined]
  | [Temporal.PlainDate, Temporal.PlainDate];

export type DateTimeRange =
  | [undefined, undefined]
  | [Temporal.PlainDateTime, undefined]
  | [Temporal.PlainDateTime, Temporal.PlainDateTime];

type RequiredValue<Mode> = Mode extends "date"
  ? Temporal.PlainDate
  : Mode extends "daterange"
  ? DateRange
  : Mode extends "datetime"
  ? Temporal.PlainDateTime
  : Mode extends "datetimerange"
  ? DateTimeRange
  : never;

type ChangeValue<Mode> = Mode extends "date"
  ? Temporal.PlainDate | Temporal.PlainDateLike
  : Mode extends "daterange"
  ?
      | Temporal.PlainDate
      | Temporal.PlainDateLike
      | [Temporal.PlainDate, Temporal.PlainDate]
  : Mode extends "datetime"
  ? Temporal.PlainDateTime | Temporal.PlainDateTimeLike
  : Mode extends "datetimerange"
  ?
      | Temporal.PlainDateTime
      | Temporal.PlainDateTimeLike
      | [Temporal.PlainDateTime, Temporal.PlainDateTime]
  : never;

export type Locale = Exclude<
  Parameters<typeof Intl.DateTimeFormat>[0],
  undefined
>;

export function useTempocal<
  Mode extends "date" | "daterange" | "datetime" | "datetimerange"
>({
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
    if (!value || (Array.isArray(value) && !value[0])) {
      return Temporal.Now.plainDate("iso8601");
    }

    if (Array.isArray(value)) {
      return Temporal.PlainDate.from(value[0]);
    }

    return Temporal.PlainDate.from(value);
  });

  const months = useMonths(locale, calendarValue, minValue, maxValue);
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
      if (Array.isArray(params)) {
        if (
          params[0] instanceof Temporal.PlainDate &&
          params[1] instanceof Temporal.PlainDate &&
          mode === "daterange"
        ) {
          // @ts-expect-error Help.
          setValue(params);
        } else if (
          params[0] instanceof Temporal.PlainDateTime &&
          params[1] instanceof Temporal.PlainDateTime &&
          mode === "datetimerange"
        ) {
          // @ts-expect-error Help.
          setValue(params);
        }

        return;
      }

      const nextValue = (() => {
        if (
          params instanceof Temporal.PlainDate ||
          params instanceof Temporal.PlainDateTime
        ) {
          return params;
        }

        if (Array.isArray(value) && value[0]) {
          return value[0].with(params);
        }

        if (!Array.isArray(value) && value) {
          return value.with(params);
        }

        return mode === "date"
          ? Temporal.Now.plainDate("iso8601").with(params)
          : Temporal.Now.plainDateTime("iso8601").with(params);
      })();

      if (Array.isArray(value)) {
        if (value[0] && !value[1]) {
          setValue(
            // @ts-expect-error Help.
            [value[0], nextValue].sort(Temporal.PlainDate.compare) as DateRange
          );
        } else {
          // @ts-expect-error Help.
          setValue([nextValue, undefined] as DateRange);
        }

        return;
      }

      // @ts-expect-error Help.
      setValue(nextValue);
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
    years,
  };
}
