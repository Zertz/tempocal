import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getFirstDayOfWeek } from "../src/getFirstDayOfWeek";

test("getFirstDayOfWeek", () => {
  const firstDayOfWeek = getFirstDayOfWeek(
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    })
  );

  expect(
    firstDayOfWeek.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 27,
      })
    )
  ).toBeTruthy();
});
