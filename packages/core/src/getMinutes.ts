import { Temporal } from "@js-temporal/polyfill";

export function getMinutes(
  value?: Temporal.PlainDateTime,
  minValue?: Temporal.PlainDateTime,
  maxValue?: Temporal.PlainDateTime
) {
  const minutes: {
    minute: number;
    disabled: boolean;
  }[] = [];

  const isBeforeMinValue = (minute: number) => {
    if (!value || !minValue) {
      return false;
    }

    if (Temporal.PlainDate.compare(value, minValue) < 0) {
      return true;
    }

    if (
      Temporal.PlainDateTime.compare(
        value.with({
          minute: 0,
          second: 0,
          millisecond: 0,
          microsecond: 0,
          nanosecond: 0,
        }),
        minValue
      ) <= 0 &&
      (value.hour < minValue.hour || minute < minValue.minute)
    ) {
      return true;
    }

    return false;
  };

  const isAfterMinValue = (minute: number) => {
    if (!value || !maxValue) {
      return false;
    }

    if (Temporal.PlainDate.compare(value, maxValue) > 0) {
      return true;
    }

    if (
      Temporal.PlainDateTime.compare(
        value.with({
          hour: value.hour + 1,
          minute: 0,
          second: 0,
          millisecond: 0,
          microsecond: 0,
          nanosecond: 0,
        }),
        maxValue
      ) >= 0 &&
      (value.hour > maxValue.hour || minute > maxValue.minute)
    ) {
      return true;
    }

    return false;
  };

  for (let i = 0; i < 60; i += 1) {
    minutes.push({
      minute: i,
      disabled: isBeforeMinValue(i) || isAfterMinValue(i),
    });
  }

  return minutes;
}
