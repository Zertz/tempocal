import { expect, test } from "vitest";
import { isDateWithinRange } from "../src/isDateWithinRange";

test("getRangeDayState re-exports isDateWithinRange", () => {
  expect(typeof isDateWithinRange).toBe("function");
});
