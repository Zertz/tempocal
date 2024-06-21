import { Temporal } from "@js-temporal/polyfill";
import { clamp, getNow } from "@tempocal/core";
import { useCallback } from "react";

export function useCalendarValue({
  clampCalendarValue,
  maxValue,
  minValue,
  setCalendarValue,
  calendarValue,
}: {
  clampCalendarValue: boolean;
  maxValue: Temporal.PlainDate | Temporal.PlainDateTime | undefined;
  minValue: Temporal.PlainDate | Temporal.PlainDateTime | undefined;
  setCalendarValue: (value: Temporal.PlainDate) => void;
  calendarValue: Temporal.PlainDate;
}) {
  const updateCalendarValue = useCallback(
    (nextCalendarValue: Temporal.PlainDate) => {
      if (!clampCalendarValue) {
        setCalendarValue(nextCalendarValue);

        return nextCalendarValue;
      }

      const clampedValue = clamp(
        nextCalendarValue,
        minValue instanceof Temporal.PlainDate
          ? minValue
          : minValue?.toPlainDate(),
        maxValue instanceof Temporal.PlainDate
          ? maxValue
          : maxValue?.toPlainDate()
      );

      setCalendarValue(clampedValue);

      return clampedValue;
    },
    [clampCalendarValue, maxValue, minValue, setCalendarValue]
  );

  const onChangeCalendarValue = useCallback(
    (params?: Temporal.PlainDate | Temporal.PlainDateLike) => {
      if (!params) {
        return updateCalendarValue(getNow().toPlainDate());
      }

      if (params instanceof Temporal.PlainDate) {
        return updateCalendarValue(params);
      }

      return updateCalendarValue(calendarValue.with(params));
    },
    [calendarValue, updateCalendarValue]
  );

  return {
    onChangeCalendarValue,
  };
}
