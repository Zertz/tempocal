import { Temporal } from "@js-temporal/polyfill";

export function getYears(
  minValue: Temporal.PlainDate,
  maxValue: Temporal.PlainDate
) {
  const years: number[] = [];

  for (let i = minValue.year; i < maxValue.year + 1; i += 1) {
    years.push(i);
  }

  return years;
}
