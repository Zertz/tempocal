import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { temporalToDate } from "../src/temporalToDate";

test("temporalToDate (PlainDate)", () => {
  const date = temporalToDate(
    Temporal.PlainDate.from({
      year: 2022,
      month: 3,
      day: 31,
    })
  );

  expect(date.getFullYear()).toEqual(2022);
  expect(date.getMonth()).toEqual(2);
  expect(date.getDate()).toEqual(31);
  expect(date.getHours()).toEqual(0);
  expect(date.getMinutes()).toEqual(0);
  expect(date.getSeconds()).toEqual(0);
  expect(date.getMilliseconds()).toEqual(0);
});

test("temporalToDate (PlainDateTime)", () => {
  const date = temporalToDate(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 31,
      hour: 15,
      minute: 30,
      second: 45,
      millisecond: 600,
    })
  );

  expect(date.getFullYear()).toEqual(2022);
  expect(date.getMonth()).toEqual(2);
  expect(date.getDate()).toEqual(31);
  expect(date.getHours()).toEqual(15);
  expect(date.getMinutes()).toEqual(30);
  expect(date.getSeconds()).toEqual(45);
  expect(date.getMilliseconds()).toEqual(600);
});
