import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getMonths } from "../src/getMonths";

test("getMonths (unbounded)", () => {
  const months = getMonths(
    "en-US",
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    })
  );

  expect(months[2].month).equal(3);
  expect(months[2].longName).equal("March");
  expect(months[2].shortName).equal("Mar");
  expect(months[2].narrowName).equal("M");
  expect(months[2].disabled).equal(false);

  expect(months[3].month).equal(4);
  expect(months[3].longName).equal("April");
  expect(months[3].shortName).equal("Apr");
  expect(months[3].narrowName).equal("A");
  expect(months[3].disabled).equal(false);

  expect(months[4].month).equal(5);
  expect(months[4].longName).equal("May");
  expect(months[4].shortName).equal("May");
  expect(months[4].narrowName).equal("M");
  expect(months[4].disabled).equal(false);

  expect(months[5].month).equal(6);
  expect(months[5].longName).equal("June");
  expect(months[5].shortName).equal("Jun");
  expect(months[5].narrowName).equal("J");
  expect(months[5].disabled).equal(false);
});

test("getMonths (with min)", () => {
  const months = getMonths(
    "en-US",
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    })
  );

  expect(months[2].month).equal(3);
  expect(months[2].longName).equal("March");
  expect(months[2].shortName).equal("Mar");
  expect(months[2].narrowName).equal("M");
  expect(months[2].disabled).equal(true);

  expect(months[3].month).equal(4);
  expect(months[3].longName).equal("April");
  expect(months[3].shortName).equal("Apr");
  expect(months[3].narrowName).equal("A");
  expect(months[3].disabled).equal(false);

  expect(months[4].month).equal(5);
  expect(months[4].longName).equal("May");
  expect(months[4].shortName).equal("May");
  expect(months[4].narrowName).equal("M");
  expect(months[4].disabled).equal(false);

  expect(months[5].month).equal(6);
  expect(months[5].longName).equal("June");
  expect(months[5].shortName).equal("Jun");
  expect(months[5].narrowName).equal("J");
  expect(months[5].disabled).equal(false);
});

test("getMonths (with max)", () => {
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

  expect(months[2].month).equal(3);
  expect(months[2].longName).equal("March");
  expect(months[2].shortName).equal("Mar");
  expect(months[2].narrowName).equal("M");
  expect(months[2].disabled).equal(false);

  expect(months[3].month).equal(4);
  expect(months[3].longName).equal("April");
  expect(months[3].shortName).equal("Apr");
  expect(months[3].narrowName).equal("A");
  expect(months[3].disabled).equal(false);

  expect(months[4].month).equal(5);
  expect(months[4].longName).equal("May");
  expect(months[4].shortName).equal("May");
  expect(months[4].narrowName).equal("M");
  expect(months[4].disabled).equal(true);

  expect(months[5].month).equal(6);
  expect(months[5].longName).equal("June");
  expect(months[5].shortName).equal("Jun");
  expect(months[5].narrowName).equal("J");
  expect(months[5].disabled).equal(true);
});

test("getMonths (with min and max)", () => {
  const months = getMonths(
    "en-US",
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    Temporal.PlainDate.from({
      year: 2022,
      month: 4,
      day: 1,
    })
  );

  expect(months[2].month).equal(3);
  expect(months[2].longName).equal("March");
  expect(months[2].shortName).equal("Mar");
  expect(months[2].narrowName).equal("M");
  expect(months[2].disabled).equal(true);

  expect(months[3].month).equal(4);
  expect(months[3].longName).equal("April");
  expect(months[3].shortName).equal("Apr");
  expect(months[3].narrowName).equal("A");
  expect(months[3].disabled).equal(false);

  expect(months[4].month).equal(5);
  expect(months[4].longName).equal("May");
  expect(months[4].shortName).equal("May");
  expect(months[4].narrowName).equal("M");
  expect(months[4].disabled).equal(true);

  expect(months[5].month).equal(6);
  expect(months[5].longName).equal("June");
  expect(months[5].shortName).equal("Jun");
  expect(months[5].narrowName).equal("J");
  expect(months[5].disabled).equal(true);
});
