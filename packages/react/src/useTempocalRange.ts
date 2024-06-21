import { Temporal } from "@js-temporal/polyfill";
import {
  clamp,
  getHours,
  getMinutes,
  getMonths,
  getNow,
  getYears,
} from "@tempocal/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ClampMode, Locale } from "./types";
import { useCalendarValue } from "./useCalendarValue";

type EmptyRange = { start: undefined; end: undefined };

type Range<T extends Temporal.PlainDate | Temporal.PlainDateTime> =
  | { start: T; end: T }
  | { start: T; end: undefined }
  | EmptyRange;

export type DateRange = Range<Temporal.PlainDate>;
export type DateTimeRange = Range<Temporal.PlainDateTime>;

function isDateRange(value: unknown): value is DateRange {
  return Boolean(
    value &&
      typeof value === "object" &&
      "start" in value &&
      "end" in value &&
      value.start instanceof Temporal.PlainDate &&
      value.end instanceof Temporal.PlainDate
  );
}

function isDateTimeRange(value: unknown): value is DateTimeRange {
  return Boolean(
    value &&
      typeof value === "object" &&
      "start" in value &&
      "end" in value &&
      value.start instanceof Temporal.PlainDateTime &&
      value.end instanceof Temporal.PlainDateTime
  );
}

function isEmptyRange(value: unknown): value is EmptyRange {
  return Boolean(
    value &&
      typeof value === "object" &&
      "start" in value &&
      "end" in value &&
      !value.start &&
      !value.end
  );
}

export function useTempocalRange({
  clampCalendarValue = false,
  clampSelectedValue = "never",
  locale,
  maxValue,
  minValue,
  mode,
  setValue,
  value,
}: {
  clampCalendarValue?: boolean;
  clampSelectedValue?: ClampMode;
  locale: Locale;
} & (
  | {
      mode: "daterange";
      maxValue?: Temporal.PlainDate;
      minValue?: Temporal.PlainDate;
      setValue: (value: DateRange) => void;
      value: DateRange;
    }
  | {
      mode: "datetimerange";
      maxValue?: Temporal.PlainDateTime;
      minValue?: Temporal.PlainDateTime;
      setValue: (value: DateTimeRange) => void;
      value: DateTimeRange;
    }
)) {
  const [calendarValue, setCalendarValue] = useState(() => {
    if (!value.start) {
      return getNow().toPlainDate();
    }

    return value.start instanceof Temporal.PlainDate
      ? value.start
      : value.start.toPlainDate();
  });

  const years = useMemo(() => {
    if (!minValue || !maxValue) {
      return;
    }

    return getYears(minValue, maxValue);
  }, [maxValue, minValue]);

  const months = useMemo(
    () => getMonths(locale, minValue, maxValue),
    [locale, maxValue, minValue]
  );

  const hours = useMemo<
    [ReturnType<typeof getHours>, ReturnType<typeof getHours>] | undefined
  >(() => {
    if (mode !== "datetimerange") {
      return;
    }

    return [
      getHours(value.start, minValue, maxValue),
      getHours(value.end, minValue, maxValue),
    ];
  }, [maxValue, minValue, mode, value]);

  const minutes = useMemo<
    [ReturnType<typeof getMinutes>, ReturnType<typeof getMinutes>] | undefined
  >(() => {
    if (mode !== "datetimerange") {
      return;
    }

    return [
      getMinutes(value.start, minValue, maxValue),
      getMinutes(value.end, minValue, maxValue),
    ];
  }, [maxValue, minValue, mode, value]);

  const { onChangeCalendarValue } = useCalendarValue({
    clampCalendarValue,
    maxValue,
    minValue,
    setCalendarValue,
    calendarValue,
  });

  const updateSelectedValue = useCallback(
    (nextSelectedValue: DateRange | DateTimeRange) => {
      if (isEmptyRange(nextSelectedValue)) {
        setValue(nextSelectedValue);

        return nextSelectedValue;
      }

      if (isDateRange(nextSelectedValue)) {
        if (mode !== "daterange") {
          throw new Error(
            `Received a Temporal.PlainDate but expected a Temporal.PlainDateTime in updateSelectedValue`
          );
        }

        if (clampSelectedValue === "never") {
          setValue(nextSelectedValue);

          return nextSelectedValue;
        }

        const clampedValue = {
          start: clamp(nextSelectedValue.start, minValue, maxValue),
          end: nextSelectedValue.end
            ? clamp(nextSelectedValue.end, minValue, maxValue)
            : undefined,
        };

        setValue(clampedValue);

        return clampedValue;
      } else if (isDateTimeRange(nextSelectedValue)) {
        if (mode !== "datetimerange") {
          throw new Error(
            `Received a Temporal.PlainDateTime but expected a Temporal.PlainDate in updateSelectedValue`
          );
        }

        if (clampSelectedValue === "never") {
          setValue(nextSelectedValue);

          return nextSelectedValue;
        }

        const clampedValue = {
          start: clamp(nextSelectedValue.start, minValue, maxValue),
          end: nextSelectedValue.end
            ? clamp(nextSelectedValue.end, minValue, maxValue)
            : undefined,
        };

        setValue(clampedValue);

        return clampedValue;
      }
    },
    [clampSelectedValue, maxValue, minValue, mode, setValue]
  );

  const onChangeSelectedValue = useCallback(
    (
      params:
        | Temporal.PlainDate
        | Temporal.PlainDateLike
        | Temporal.PlainDateTime
        | Temporal.PlainDateTimeLike
        | DateRange
        | DateTimeRange
        | { start: undefined; end: undefined }
    ) => {
      if (
        isDateRange(params) ||
        isDateTimeRange(params) ||
        isEmptyRange(params)
      ) {
        return updateSelectedValue(params);
      }

      const nextValue = (() => {
        if (
          params instanceof Temporal.PlainDate ||
          params instanceof Temporal.PlainDateTime
        ) {
          return params;
        }

        if (value.start) {
          return value.start.with(params);
        }

        return mode === "daterange"
          ? getNow().toPlainDate().with(params)
          : getNow().with(params);
      })();

      if (value.start && !value.end) {
        const sortedRange = [value.start, nextValue].sort(
          Temporal.PlainDate.compare
        ) as [Temporal.PlainDate, Temporal.PlainDate];

        return updateSelectedValue({
          start: sortedRange[0],
          end: sortedRange[1],
        });
      }

      if (nextValue instanceof Temporal.PlainDate) {
        return updateSelectedValue({
          start: nextValue,
          end: undefined,
        });
      } else {
        return updateSelectedValue({
          start: nextValue,
          end: undefined,
        });
      }
    },
    [mode, updateSelectedValue, value.end, value.start]
  );

  const previousMaxValue = useRef(maxValue);
  const previousMinValue = useRef(minValue);

  useEffect(() => {
    if (isEmptyRange(value)) {
      return;
    }

    if (!maxValue && !minValue) {
      return;
    }

    if (clampSelectedValue !== "always") {
      return;
    }

    if (
      maxValue !== previousMaxValue.current ||
      minValue !== previousMinValue.current
    ) {
      updateSelectedValue(value);
    }
  }, [clampSelectedValue, maxValue, minValue, updateSelectedValue, value]);

  useEffect(() => {
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
