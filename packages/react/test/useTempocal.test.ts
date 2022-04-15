import { Temporal } from "@tempocal/core/node_modules/@js-temporal/polyfill";
import { renderHook } from "@testing-library/react-hooks";
import { expect, test } from "vitest";
import { useTempocal } from "../tempocal-react";

test("useTempocal", () => {
  const value = Temporal.PlainDate.from({
    year: 2022,
    month: 4,
    day: 15,
  });

  const setValue = () => undefined;

  const { result } = renderHook(() =>
    useTempocal({
      locale: "en-US",
      mode: "date",
      setValue,
      value,
    })
  );

  expect(Object.keys(result.current).length).toEqual(6);
  expect(Object.keys(result.current.calendarProps).length).toEqual(4);

  expect(result.current.calendarProps.locale).toEqual("en-US");
  expect(result.current.calendarProps.maxValue).toBeUndefined();
  expect(result.current.calendarProps.minValue).toBeUndefined();

  expect(
    result.current.calendarProps.value.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 15,
      })
    )
  ).toEqual(true);

  expect(
    result.current.calendarValue.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 15,
      })
    )
  ).toEqual(true);

  expect(result.current.months).toHaveLength(12);
  expect(result.current.years).deep.equal([]);
  expect(result.current.onChangeCalendarValue).toBeTruthy();
  expect(result.current.onChangeSelectedValue).toBeTruthy();
});
