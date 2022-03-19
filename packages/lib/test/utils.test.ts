import { Temporal } from "@js-temporal/polyfill";
import {
  getCalendarMonthDateRange,
  getMonthEndDate,
  getMonthStartDate,
} from "../utils";

test("getMonthStartDate", () => {
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
  ).toBeTruthy();
});

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

test("getCalendarMonthDateRange (without rollover", () => {
  const { start, end } = getCalendarMonthDateRange(
    Temporal.PlainDate.from({
      year: 2022,
      month: 3,
      day: 7,
    }),
    false
  );

  expect(
    start.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 1,
      })
    )
  ).toBeTruthy();

  expect(
    end.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 31,
      })
    )
  ).toBeTruthy();
});

test("getCalendarMonthDateRange (with rollover)", () => {
  const { start, end } = getCalendarMonthDateRange(
    Temporal.PlainDate.from({
      year: 2022,
      month: 7,
      day: 7,
    }),
    true
  );

  expect(
    start.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 6,
        day: 26,
      })
    )
  ).toBeTruthy();

  expect(
    end.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 8,
        day: 6,
      })
    )
  ).toBeTruthy();
});
