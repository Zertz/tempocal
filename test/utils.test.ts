import { Temporal } from "@js-temporal/polyfill";
import "@testing-library/jest-dom/extend-expect";
import {
  getCalendarMonthDateRange,
  getMonthEndDate,
  getMonthStartDate,
} from "../packages/lib/utils";

describe("utils", () => {
  it("getMonthStartDate", () => {
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

  it("getMonthEndDate", () => {
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

  it("getCalendarMonthDateRange (without rollover", () => {
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

  it("getCalendarMonthDateRange (with rollover)", () => {
    const { start, end } = getCalendarMonthDateRange(
      Temporal.PlainDate.from({
        year: 2022,
        month: 3,
        day: 7,
      }),
      true
    );

    expect(
      start.equals(
        Temporal.PlainDate.from({
          year: 2022,
          month: 2,
          day: 27,
        })
      )
    ).toBeTruthy();

    expect(
      end.equals(
        Temporal.PlainDate.from({
          year: 2022,
          month: 4,
          day: 2,
        })
      )
    ).toBeTruthy();
  });
});
