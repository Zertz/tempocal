import { Temporal } from "@js-temporal/polyfill";
import {
  clamp,
  getHours,
  getMinutes,
  getMonths,
  getYears,
} from "@tempocal/core";
import * as React from "react";

export type ClampMode = "always" | "value-change" | "never";

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
      | [undefined, undefined]
  : Mode extends "datetime"
  ? Temporal.PlainDateTime | Temporal.PlainDateTimeLike
  : Mode extends "datetimerange"
  ?
      | Temporal.PlainDateTime
      | Temporal.PlainDateTimeLike
      | [Temporal.PlainDateTime, Temporal.PlainDateTime]
      | [undefined, undefined]
  : never;

export type Locale = string;

export function useTempocal<
  Mode extends "date" | "daterange" | "datetime" | "datetimerange"
>({
  clampCalendarValue,
  clampSelectedValue,
  locale,
  maxValue,
  minValue,
  mode,
  setValue,
  value,
}: {
  clampCalendarValue?: boolean;
  clampSelectedValue?: Mode extends "date"
    ? ClampMode
    : Mode extends "datetime"
    ? ClampMode
    : never;
  locale: Locale;
  maxValue?: Temporal.PlainDate | Temporal.PlainDateTime;
  minValue?: Temporal.PlainDate | Temporal.PlainDateTime;
  mode: Mode;
  setValue: (value: RequiredValue<Mode>) => void;
  value: RequiredValue<Mode> | undefined;
}) {
  const [calendarValue, setCalendarValue] = React.useState(() => {
    if (!value || (Array.isArray(value) && !value[0])) {
      return Temporal.Now.plainDateISO();
    }

    if (Array.isArray(value)) {
      return Temporal.PlainDate.from(value[0]);
    }

    return Temporal.PlainDate.from(value);
  });

  const years = React.useMemo(() => {
    if (!minValue || !maxValue) {
      return [];
    }

    return getYears(
      minValue instanceof Temporal.PlainDateTime
        ? minValue.toPlainDate()
        : minValue,
      maxValue instanceof Temporal.PlainDateTime
        ? maxValue.toPlainDate()
        : maxValue
    );
  }, [maxValue, minValue]);

  const months = React.useMemo(() => {
    return getMonths(
      locale,
      calendarValue,
      minValue instanceof Temporal.PlainDateTime
        ? minValue.toPlainDate()
        : minValue,
      maxValue instanceof Temporal.PlainDateTime
        ? maxValue.toPlainDate()
        : maxValue
    );
  }, [calendarValue, locale, maxValue, minValue]);

  const hours = React.useMemo(() => {
    if (
      value instanceof Temporal.PlainDateTime &&
      (!minValue || minValue instanceof Temporal.PlainDateTime) &&
      (!maxValue || maxValue instanceof Temporal.PlainDateTime)
    ) {
      return getHours(value, minValue, maxValue);
    }

    return getHours();
  }, [value, maxValue, minValue]);

  const minutes = React.useMemo(() => {
    if (
      value instanceof Temporal.PlainDateTime &&
      (!minValue || minValue instanceof Temporal.PlainDateTime) &&
      (!maxValue || maxValue instanceof Temporal.PlainDateTime)
    ) {
      return getMinutes(value, minValue, maxValue);
    }

    return getMinutes();
  }, [value, maxValue, minValue]);

  const updateCalendarValue = React.useCallback(
    (nextCalendarValue: Temporal.PlainDate) => {
      if (!clampCalendarValue) {
        setCalendarValue(nextCalendarValue);

        return nextCalendarValue;
      }

      const clampedValue = clamp(
        nextCalendarValue,
        minValue instanceof Temporal.PlainDateTime
          ? minValue.toPlainDate()
          : minValue,
        maxValue instanceof Temporal.PlainDateTime
          ? maxValue.toPlainDate()
          : maxValue
      );

      setCalendarValue(clampedValue);

      return clampedValue;
    },
    [clampCalendarValue, maxValue, minValue]
  );

  const onChangeCalendarValue = React.useCallback(
    (params?: Temporal.PlainDate | Temporal.PlainDateLike) => {
      if (!params) {
        return updateCalendarValue(Temporal.Now.plainDateISO());
      }

      if (params instanceof Temporal.PlainDate) {
        return updateCalendarValue(params);
      }

      return updateCalendarValue(calendarValue.with(params));
    },
    [calendarValue, updateCalendarValue]
  );

  const updateSelectedValue = React.useCallback(
    (
      nextSelectedValue:
        | Temporal.PlainDate
        | Temporal.PlainDateTime
        | DateRange
        | DateTimeRange
    ) => {
      if (
        !clampSelectedValue ||
        clampSelectedValue === "never" ||
        Array.isArray(nextSelectedValue)
      ) {
        // @ts-expect-error Help.
        setValue(nextSelectedValue);

        return nextSelectedValue;
      }

      const clampedValue = clamp(nextSelectedValue, minValue, maxValue);

      // @ts-expect-error Help.
      setValue(clampedValue);

      return clampedValue;
    },
    [clampSelectedValue, maxValue, minValue, setValue]
  );

  const onChangeSelectedValue = React.useCallback(
    (params: ChangeValue<Mode>): RequiredValue<Mode> => {
      if (Array.isArray(params)) {
        if (!["daterange", "datetimerange"].includes(mode)) {
          throw new Error(
            `Received an array in onChangeSelectedValue but mode is ${mode}`
          );
        }

        if (!params[0] && !params[1]) {
          // @ts-expect-error Help.
          setValue(params);
        } else if (
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
        } else {
          throw new Error(
            `Received an array of mixed values in onChangeSelectedValue but expected a pair of ${
              mode === "daterange"
                ? "Temporal.PlainDate"
                : "Temporal.PlainDateTime"
            }`
          );
        }

        return params as RequiredValue<Mode>;
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
          ? Temporal.Now.plainDateISO().with(params)
          : Temporal.Now.plainDateTimeISO().with(params);
      })();

      if (Array.isArray(value)) {
        const range = (
          value[0] && !value[1]
            ? [value[0], nextValue].sort(Temporal.PlainDate.compare)
            : [nextValue, undefined]
        ) as DateRange;

        return updateSelectedValue(range) as RequiredValue<Mode>;
      }

      return updateSelectedValue(nextValue) as RequiredValue<Mode>;
    },
    [mode, setValue, updateSelectedValue, value]
  );

  const previousClampSelectedValue = React.useRef(clampSelectedValue);
  const previousMaxValue = React.useRef(maxValue);
  const previousMinValue = React.useRef(minValue);

  React.useEffect(() => {
    if (!clampSelectedValue || !value) {
      return;
    }

    if (!maxValue && !minValue) {
      return;
    }

    if (clampSelectedValue !== "always") {
      return;
    }

    if (
      clampSelectedValue !== previousClampSelectedValue.current ||
      maxValue !== previousMaxValue.current ||
      minValue !== previousMinValue.current
    ) {
      updateSelectedValue(value);
    }
  });

  React.useEffect(() => {
    previousClampSelectedValue.current = clampSelectedValue;
    previousMaxValue.current = maxValue;
    previousMinValue.current = minValue;
  });

  return {
    calendarProps: {
      locale,
      maxValue:
        maxValue instanceof Temporal.PlainDateTime
          ? maxValue.toPlainDate()
          : maxValue,
      minValue:
        minValue instanceof Temporal.PlainDateTime
          ? minValue.toPlainDate()
          : minValue,
      value: calendarValue,
    },
    years,
    months,
    hours,
    minutes,
    onChangeCalendarValue,
    onChangeSelectedValue,
  };
}
