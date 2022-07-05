import { Temporal } from "@js-temporal/polyfill";
import { dateToTemporal } from "@tempocal/core";
import * as React from "react";

export function useTemporalState<Mode extends "date" | "datetime">(
  mode: Mode,
  initialState: Date | Temporal.PlainDateTime | Temporal.PlainDateTimeLike
): readonly [
  Mode extends "date" ? Temporal.PlainDate : Temporal.PlainDateTime,
  (
    value: Mode extends "date"
      ? Temporal.PlainDate | Temporal.PlainDateLike
      : Temporal.PlainDateTime | Temporal.PlainDateTimeLike
  ) => void
] {
  const [temporalValue, setTemporalValue] = React.useState(() => {
    if (mode === "date") {
      return initialState instanceof Date
        ? dateToTemporal(initialState).toPlainDate()
        : initialState instanceof Temporal.PlainDate
        ? initialState
        : Temporal.PlainDate.from(initialState);
    }

    return initialState instanceof Date
      ? dateToTemporal(initialState)
      : initialState instanceof Temporal.PlainDateTime
      ? initialState
      : Temporal.PlainDateTime.from(initialState);
  });

  const updateTemporalValue = React.useCallback(
    (
      value: Mode extends "date"
        ? Temporal.PlainDate | Temporal.PlainDateLike
        : Temporal.PlainDateTime | Temporal.PlainDateTimeLike
    ) => {
      if (
        value instanceof Temporal.PlainDate ||
        value instanceof Temporal.PlainDateTime
      ) {
        setTemporalValue(value);

        return;
      }

      setTemporalValue(temporalValue.with(value));
    },
    [temporalValue]
  );

  // @ts-expect-error Help.
  return [temporalValue, updateTemporalValue];
}
