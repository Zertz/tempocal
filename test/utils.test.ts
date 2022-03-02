import { Temporal } from "@js-temporal/polyfill";
import "@testing-library/jest-dom/extend-expect";
import { getMonthStartDate } from "../packages/lib/utils";

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
});
