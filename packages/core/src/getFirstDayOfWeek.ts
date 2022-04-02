import { Temporal } from "@js-temporal/polyfill";

type Value = Temporal.PlainDate | Temporal.PlainDateTime;

export function getFirstDayOfWeek(value: Value) {
  let firstDayOfWeek: Value | undefined = undefined;

  do {
    if (value.dayOfWeek === 7) {
      firstDayOfWeek = value;
    } else {
      value = value.subtract({ days: 1 });
    }
  } while (!firstDayOfWeek);

  return firstDayOfWeek;
}
