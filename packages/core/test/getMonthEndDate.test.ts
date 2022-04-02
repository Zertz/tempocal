import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getMonthEndDate } from "../src/getMonthEndDate";

test("getMonthEndDate", () => {
  const date = getMonthEndDate(
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
        day: 31,
      })
    )
  ).toBeTruthy();
});
