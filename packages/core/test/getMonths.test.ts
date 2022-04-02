import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getMonths } from "../src/getMonths";

test("getMonths", () => {
  const months = getMonths(
    "en-US",
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    undefined,
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    })
  );

  expect(months[0].month).equal(1);
  expect(months[0].longName).equal("January");
  expect(months[0].disabled).equal(false);

  expect(months[3].month).equal(4);
  expect(months[3].longName).equal("April");
  expect(months[3].disabled).equal(false);

  expect(months[4].month).equal(5);
  expect(months[4].longName).equal("May");
  expect(months[4].disabled).equal(true);
});
