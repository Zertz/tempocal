import { Temporal } from "@js-temporal/polyfill";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getFirstDayOfWeek(
  value: Value,
  startOfWeek = value.daysInWeek
) {
  let firstDayOfWeek: Value | undefined = undefined;

  do {
    if (value.dayOfWeek === startOfWeek) {
      firstDayOfWeek = value;
    } else {
      value = value.subtract({ days: 1 });
    }
  } while (!firstDayOfWeek);

  return firstDayOfWeek;
}
