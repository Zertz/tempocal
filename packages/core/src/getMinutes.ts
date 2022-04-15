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

  for (let i = 0; i < 60; i += 1) {
    const isBeforeMinValue =
      !!value &&
      !!minValue &&
      (Temporal.PlainDate.compare(value, minValue) < 0 ||
        (value.toPlainDate().equals(minValue.toPlainDate()) &&
          value.hour < minValue.hour) ||
        (value.hour === minValue.hour && i < minValue.minute));

    const isAfterMaxValue =
      !!value &&
      !!maxValue &&
      (Temporal.PlainDate.compare(value, maxValue) > 0 ||
        (value.toPlainDate().equals(maxValue.toPlainDate()) &&
          value.hour > maxValue.hour) ||
        (value.hour === maxValue.hour && i > maxValue.minute));

    minutes.push({
      minute: i,
      disabled: isBeforeMinValue || isAfterMaxValue,
    });
  }

  return minutes;
}
