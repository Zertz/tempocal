import { Temporal } from "@js-temporal/polyfill";

export function getYears(
  minValue: Temporal.PlainDate | undefined,
  maxValue: Temporal.PlainDate | undefined
) {
  const years: number[] = [];

  if (!minValue || !maxValue) {
    return years;
  }

  for (let i = minValue.year; i < maxValue.year + 1; i += 1) {
    years.push(i);
  }

  return years;
}
