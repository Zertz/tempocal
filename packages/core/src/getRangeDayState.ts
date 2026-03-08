import { Temporal } from "@js-temporal/polyfill";

export function getRangeDayState(
  date: Temporal.PlainDate,
  rangeValue:
    | [undefined, undefined]
    | [Temporal.PlainDate, undefined]
    | [Temporal.PlainDate, Temporal.PlainDate]
    | [Temporal.PlainDateTime, undefined]
    | [Temporal.PlainDateTime, Temporal.PlainDateTime]
    | undefined,
  hoverValue?: Temporal.PlainDate
): { isRangeSelected: boolean; isRangeHovered: boolean } {
  const rangeStart =
    rangeValue?.[0] instanceof Temporal.PlainDateTime
      ? rangeValue[0].toPlainDate()
      : rangeValue?.[0];

  const rangeEnd =
    rangeValue?.[1] instanceof Temporal.PlainDateTime
      ? rangeValue[1].toPlainDate()
      : rangeValue?.[1];

  const isRangeSelected =
    !!rangeStart &&
    !!rangeEnd &&
    Temporal.PlainDate.compare(rangeStart, date) <= 0 &&
    Temporal.PlainDate.compare(rangeEnd, date) >= 0;

  const isRangeHovered =
    !!rangeStart &&
    !rangeEnd &&
    !!hoverValue &&
    ((Temporal.PlainDate.compare(rangeStart, date) <= 0 &&
      Temporal.PlainDate.compare(hoverValue, date) >= 0) ||
      (Temporal.PlainDate.compare(hoverValue, date) <= 0 &&
        Temporal.PlainDate.compare(rangeStart, date) >= 0));

  return { isRangeSelected, isRangeHovered };
}
