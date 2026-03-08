import { Temporal } from "@js-temporal/polyfill";

export function isDateWithinRange(
  date: Temporal.PlainDate,
  rangeValue:
    | [undefined, undefined]
    | [Temporal.PlainDate, undefined]
    | [Temporal.PlainDate, Temporal.PlainDate]
    | [Temporal.PlainDateTime, undefined]
    | [Temporal.PlainDateTime, Temporal.PlainDateTime]
    | undefined
): boolean {
  const rangeStart =
    rangeValue?.[0] instanceof Temporal.PlainDateTime
      ? rangeValue[0].toPlainDate()
      : rangeValue?.[0];

  const rangeEnd =
    rangeValue?.[1] instanceof Temporal.PlainDateTime
      ? rangeValue[1].toPlainDate()
      : rangeValue?.[1];

  return (
    !!rangeStart &&
    !!rangeEnd &&
    Temporal.PlainDate.compare(date, rangeStart) >= 0 &&
    Temporal.PlainDate.compare(date, rangeEnd) <= 0
  );
}
