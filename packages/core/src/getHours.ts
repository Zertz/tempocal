import { Temporal } from "@js-temporal/polyfill";

export function getHours(
  value?: Temporal.PlainDateTime,
  minValue?: Temporal.PlainDateTime,
  maxValue?: Temporal.PlainDateTime
) {
  const hours: {
    hour: number;
    disabled: boolean;
  }[] = [];

  for (let i = 0; i < 24; i += 1) {
    const isBeforeMinValue =
      !!value &&
      !!minValue &&
      (Temporal.PlainDate.compare(value, minValue) < 0 ||
        (value.toPlainDate().equals(minValue.toPlainDate()) &&
          i < minValue.hour));

    const isAfterMaxValue =
      !isBeforeMinValue &&
      !!value &&
      !!maxValue &&
      (Temporal.PlainDate.compare(value, maxValue) > 0 ||
        (value.toPlainDate().equals(maxValue.toPlainDate()) &&
          i > maxValue.hour));

    hours.push({
      hour: i,
      disabled: isBeforeMinValue || isAfterMaxValue,
    });
  }

  return hours;
}
