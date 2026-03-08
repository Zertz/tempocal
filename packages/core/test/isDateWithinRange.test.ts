import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { isDateWithinRange } from "../src/isDateWithinRange";

// helpers
const date = (year: number, month: number, day: number) =>
  Temporal.PlainDate.from({ year, month, day });

const dt = (year: number, month: number, day: number) =>
  Temporal.PlainDateTime.from({ year, month, day, hour: 0 });

// ── closed range (isRangeSelected use case) ──────────────────────────────────

test("isDateWithinRange: false when rangeValue is undefined", () => {
  expect(isDateWithinRange(date(2022, 3, 5), undefined)).toBe(false);
});

test("isDateWithinRange: false when only start is set", () => {
  expect(
    isDateWithinRange(date(2022, 3, 5), [date(2022, 3, 1), undefined])
  ).toBe(false);
});

test("isDateWithinRange: true for date inside range", () => {
  expect(
    isDateWithinRange(date(2022, 3, 5), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: true for date on range start", () => {
  expect(
    isDateWithinRange(date(2022, 3, 1), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: true for date on range end", () => {
  expect(
    isDateWithinRange(date(2022, 3, 10), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: false for date before range start", () => {
  expect(
    isDateWithinRange(date(2022, 2, 28), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(false);
});

test("isDateWithinRange: false for date after range end", () => {
  expect(
    isDateWithinRange(date(2022, 3, 11), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(false);
});

test("isDateWithinRange: works with PlainDateTime range", () => {
  expect(
    isDateWithinRange(date(2022, 3, 5), [dt(2022, 3, 1), dt(2022, 3, 10)])
  ).toBe(true);
});

// ── bidirectional hover interval (isRangeHovered use case) ───────────────────
// In Calendar.tsx: isRangeHovered uses
//   isDateWithinRange(date, [rangeStart, hoverValue]) ||
//   isDateWithinRange(date, [hoverValue, rangeStart])

test("isDateWithinRange: forward hover — date inside [start, hover]", () => {
  // start=Mar 1, hover=Mar 10, date=Mar 5 → in [1, 10]
  expect(
    isDateWithinRange(date(2022, 3, 5), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: backward hover — date inside [hover, start]", () => {
  // start=Mar 10, hover=Mar 1 → check [hover=1, start=10]
  expect(
    isDateWithinRange(date(2022, 3, 5), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: forward hover — date on start boundary", () => {
  expect(
    isDateWithinRange(date(2022, 3, 1), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: forward hover — date on hover boundary", () => {
  expect(
    isDateWithinRange(date(2022, 3, 10), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(true);
});

test("isDateWithinRange: false for date outside forward hover interval", () => {
  expect(
    isDateWithinRange(date(2022, 3, 11), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(false);
});

test("isDateWithinRange: false for date outside backward hover interval", () => {
  // start=Mar 10, hover=Mar 1 → check [hover=1, start=10], date=Mar 11 outside
  expect(
    isDateWithinRange(date(2022, 3, 11), [date(2022, 3, 1), date(2022, 3, 10)])
  ).toBe(false);
});

test("isDateWithinRange: works with PlainDateTime start in hover range", () => {
  // PlainDateTime start converts to PlainDate for comparison
  expect(
    isDateWithinRange(date(2022, 3, 5), [dt(2022, 3, 1), dt(2022, 3, 10)])
  ).toBe(true);
});
