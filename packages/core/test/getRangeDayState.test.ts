import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getRangeDayState } from "../src/getRangeDayState";

// helpers
const date = (year: number, month: number, day: number) =>
  Temporal.PlainDate.from({ year, month, day });

const dt = (year: number, month: number, day: number) =>
  Temporal.PlainDateTime.from({ year, month, day, hour: 0 });

// ── isRangeSelected ──────────────────────────────────────────────────────────

test("getRangeDayState: isRangeSelected false when rangeValue is undefined", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 5), undefined);
  expect(isRangeSelected).toBe(false);
});

test("getRangeDayState: isRangeSelected false when only start is set", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 5), [
    date(2022, 3, 1),
    undefined,
  ]);
  expect(isRangeSelected).toBe(false);
});

test("getRangeDayState: isRangeSelected true for date inside range", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 5), [
    date(2022, 3, 1),
    date(2022, 3, 10),
  ]);
  expect(isRangeSelected).toBe(true);
});

test("getRangeDayState: isRangeSelected true for date on range start", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 1), [
    date(2022, 3, 1),
    date(2022, 3, 10),
  ]);
  expect(isRangeSelected).toBe(true);
});

test("getRangeDayState: isRangeSelected true for date on range end", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 10), [
    date(2022, 3, 1),
    date(2022, 3, 10),
  ]);
  expect(isRangeSelected).toBe(true);
});

test("getRangeDayState: isRangeSelected false for date before range", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 2, 28), [
    date(2022, 3, 1),
    date(2022, 3, 10),
  ]);
  expect(isRangeSelected).toBe(false);
});

test("getRangeDayState: isRangeSelected false for date after range", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 11), [
    date(2022, 3, 1),
    date(2022, 3, 10),
  ]);
  expect(isRangeSelected).toBe(false);
});

test("getRangeDayState: isRangeSelected works with PlainDateTime range", () => {
  const { isRangeSelected } = getRangeDayState(date(2022, 3, 5), [
    dt(2022, 3, 1),
    dt(2022, 3, 10),
  ]);
  expect(isRangeSelected).toBe(true);
});

// ── isRangeHovered ───────────────────────────────────────────────────────────

test("getRangeDayState: isRangeHovered false when rangeValue is undefined", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 5),
    undefined,
    date(2022, 3, 7)
  );
  expect(isRangeHovered).toBe(false);
});

test("getRangeDayState: isRangeHovered false when hoverValue is undefined", () => {
  const { isRangeHovered } = getRangeDayState(date(2022, 3, 5), [
    date(2022, 3, 1),
    undefined,
  ]);
  expect(isRangeHovered).toBe(false);
});

test("getRangeDayState: isRangeHovered false when both start and end are set", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 5),
    [date(2022, 3, 1), date(2022, 3, 10)],
    date(2022, 3, 7)
  );
  expect(isRangeHovered).toBe(false);
});

test("getRangeDayState: isRangeHovered true for date between start and hover (forward)", () => {
  // start=1, hover=10, date=5 → inside [1,10]
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 5),
    [date(2022, 3, 1), undefined],
    date(2022, 3, 10)
  );
  expect(isRangeHovered).toBe(true);
});

test("getRangeDayState: isRangeHovered true for date between hover and start (backward)", () => {
  // start=10, hover=1, date=5 → inside [1,10]
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 5),
    [date(2022, 3, 10), undefined],
    date(2022, 3, 1)
  );
  expect(isRangeHovered).toBe(true);
});

test("getRangeDayState: isRangeHovered true on start date", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 1),
    [date(2022, 3, 1), undefined],
    date(2022, 3, 10)
  );
  expect(isRangeHovered).toBe(true);
});

test("getRangeDayState: isRangeHovered true on hover date", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 10),
    [date(2022, 3, 1), undefined],
    date(2022, 3, 10)
  );
  expect(isRangeHovered).toBe(true);
});

test("getRangeDayState: isRangeHovered false for date outside hover range (forward)", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 11),
    [date(2022, 3, 1), undefined],
    date(2022, 3, 10)
  );
  expect(isRangeHovered).toBe(false);
});

test("getRangeDayState: isRangeHovered false for date outside hover range (backward)", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 11),
    [date(2022, 3, 10), undefined],
    date(2022, 3, 1)
  );
  expect(isRangeHovered).toBe(false);
});

test("getRangeDayState: isRangeHovered works with PlainDateTime range start", () => {
  const { isRangeHovered } = getRangeDayState(
    date(2022, 3, 5),
    [dt(2022, 3, 1), undefined],
    date(2022, 3, 10)
  );
  expect(isRangeHovered).toBe(true);
});
