import { expect, test } from "vitest";
import { getWeekdays } from "../src/getWeekdays";

test("getWeekdays", () => {
  const weekdays = getWeekdays("en-US", 7);

  expect(weekdays.map(({ dayOfWeek }) => dayOfWeek)).toEqual([
    7, 1, 2, 3, 4, 5, 6,
  ]);

  expect(weekdays.map(({ longName }) => longName)).toEqual([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
});
