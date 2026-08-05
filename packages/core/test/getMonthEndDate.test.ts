import { expect, test } from "vitest";
import { getMonthEndDate } from "../src/getMonthEndDate";
import { Temporal } from "../src/temporal.js";

test("getMonthEndDate", () => {
  const date = getMonthEndDate(
    Temporal.PlainDate.from({
      year: 2022,
      month: 3,
      day: 7,
    }),
  );

  expect(
    date.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 31,
      }),
    ),
  ).toBe(true);
});
