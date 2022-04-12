import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { dateToTemporal } from "../src/dateToTemporal";

test("dateToTemporal", () => {
  const plainDateTime = dateToTemporal(new Date(2022, 2, 31, 15, 30, 45, 600));

  expect(
    plainDateTime.equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 3,
        day: 31,
        hour: 15,
        minute: 30,
        second: 45,
        millisecond: 600,
      })
    )
  ).toBeTruthy();
});
