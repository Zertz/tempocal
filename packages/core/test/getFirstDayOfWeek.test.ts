import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getFirstDayOfWeek } from "../src/getFirstDayOfWeek";

test("getFirstDayOfWeek (startOfWeek = default)", () => {
  const firstDayOfWeek = getFirstDayOfWeek(
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    })
  );

  expect(firstDayOfWeek.dayOfWeek).toEqual(7);

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

test("getFirstDayOfWeek (startOfWeek = 6)", () => {
  const firstDayOfWeek = getFirstDayOfWeek(
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    6
  );

  expect(firstDayOfWeek.dayOfWeek).toEqual(6);

  expect(
    firstDayOfWeek.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 26,
      })
    )
  ).toBeTruthy();
});
