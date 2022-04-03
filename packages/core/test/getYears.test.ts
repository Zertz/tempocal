import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getYears } from "../src/getYears";

test("getYears", () => {
  const years = getYears(
    Temporal.PlainDate.from({
      year: 2020,
      month: 4,
      day: 1,
    }),
    Temporal.PlainDate.from({
      year: 2024,
      month: 4,
      day: 1,
    })
  );

  expect(years).toEqual([2020, 2021, 2022, 2023, 2024]);
});
