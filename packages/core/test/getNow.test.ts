import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getNow } from "../src/getNow";

test("getNow (PlainDate, unbounded)", () => {
  const result = getNow();

  expect(result instanceof Temporal.PlainDate).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDate.from({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      })
    )
  ).toBe(true);
});
