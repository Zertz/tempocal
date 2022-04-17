import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getCalendarMonthDateRange } from "../src/getCalendarMonthDateRange";

test("getCalendarMonthDateRange (without rollover)", () => {
  const { start, end } = getCalendarMonthDateRange(
    Temporal.PlainDate.from({
      year: 2022,
      month: 3,
      day: 7,
    }),
    false,
    7
  );

  expect(
    start.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 1,
      })
    )
  ).toBe(true);

  expect(
    end.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 31,
      })
    )
  ).toBe(true);
});

test("getCalendarMonthDateRange (with rollover)", () => {
  const { start, end } = getCalendarMonthDateRange(
    Temporal.PlainDate.from({
      year: 2022,
      month: 7,
      day: 7,
    }),
    true,
    7
  );

  expect(
    start.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 6,
        day: 26,
      })
    )
  ).toBe(true);

  expect(
    end.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 8,
        day: 6,
      })
    )
  ).toBe(true);
});
