import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getMonthStartDate } from "../src/getMonthStartDate";

test("getMonthStartDate (PlainDate)", () => {
  const date = getMonthStartDate(
    Temporal.PlainDate.from({
      year: 2022,
      month: 3,
      day: 7,
    })
  );

  expect(
    date.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 1,
      })
    )
  ).toBe(true);
});

test("getMonthStartDate (PlainDateTime)", () => {
  const date = getMonthStartDate(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 7,
      hour: 2,
    })
  );

  expect(
    date.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 1,
      })
    )
  ).toBe(true);
});
