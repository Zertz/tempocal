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

export function useTempocal({
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
      mode: "date";
      maxValue?: Temporal.PlainDate;
      minValue?: Temporal.PlainDate;
      setValue: (value: Temporal.PlainDate) => void;
      value: Temporal.PlainDate | undefined;
    }
  | {
      mode: "datetime";
      maxValue?: Temporal.PlainDateTime;
      minValue?: Temporal.PlainDateTime;
      setValue: (value: Temporal.PlainDateTime) => void;
      value: Temporal.PlainDateTime | undefined;
    }
)) {
  const [calendarValue, setCalendarValue] = useState(() => {
    if (!value) {
      return getNow().toPlainDate();
    }

    return value instanceof Temporal.PlainDate ? value : value.toPlainDate();
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

  const hours = useMemo(() => {
    if (mode !== "datetime") {
      return;
    }

    return getHours(value, minValue, maxValue);
  }, [maxValue, minValue, mode, value]);

  const minutes = useMemo(() => {
    if (mode !== "datetime") {
      return;
    }

    return getMinutes(value, minValue, maxValue);
  }, [maxValue, minValue, mode, value]);

  const { onChangeCalendarValue } = useCalendarValue({
    clampCalendarValue,
    maxValue,
    minValue,
    setCalendarValue,
    calendarValue,
  });

  const updateSelectedValue = useCallback(
    (nextSelectedValue: Temporal.PlainDate | Temporal.PlainDateTime) => {
      if (nextSelectedValue instanceof Temporal.PlainDate) {
        if (mode !== "date") {
          throw new Error(
            `Received a Temporal.PlainDate but expected a Temporal.PlainDateTime in updateSelectedValue`
          );
        }

        if (clampSelectedValue === "never") {
          setValue(nextSelectedValue);

          return nextSelectedValue;
        }

        const clampedValue = clamp(nextSelectedValue, minValue, maxValue);

        setValue(clampedValue);

        return clampedValue;
      } else if (nextSelectedValue instanceof Temporal.PlainDateTime) {
        if (mode !== "datetime") {
          throw new Error(
            `Received a Temporal.PlainDateTime but expected a Temporal.PlainDate in updateSelectedValue`
          );
        }

        if (clampSelectedValue === "never") {
          setValue(nextSelectedValue);

          return nextSelectedValue;
        }

        const clampedValue = clamp(nextSelectedValue, minValue, maxValue);

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
    ) => {
      const nextValue = (() => {
        if (params instanceof Temporal.PlainDate) {
          return params;
        }

        if (value) {
          return value.with(params);
        }

        return getNow().toPlainDate().with(params);
      })();

      return updateSelectedValue(nextValue);
    },
    [updateSelectedValue, value]
  );

  const previousMaxValue = useRef(maxValue);
  const previousMinValue = useRef(minValue);

  useEffect(() => {
    if (!value) {
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
