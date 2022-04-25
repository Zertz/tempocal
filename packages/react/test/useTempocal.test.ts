import { Temporal } from "@js-temporal/polyfill";
import { act, renderHook } from "@testing-library/react-hooks";
import { expect, test } from "vitest";
import { useTempocal } from "../tempocal-react";

test("useTempocal", () => {
  let value = Temporal.PlainDate.from({
    year: 2022,
    month: 4,
    day: 15,
  });

  const { result } = renderHook(() =>
    useTempocal({
      locale: "en-US",
      mode: "date",
      setValue: (v: Temporal.PlainDate) => (value = v),
      value,
    })
  );

  expect(Object.keys(result.current).length).toBe(8);
  expect(Object.keys(result.current.calendarProps).length).toBe(4);

  expect(result.current.calendarProps.locale).toBe("en-US");
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
  ).toBe(true);

  expect(
    result.current.calendarProps.value.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 15,
      })
    )
  ).toBe(true);

  expect(result.current.years).deep.equal([]);
  expect(result.current.months).toHaveLength(12);
  expect(result.current.hours).toHaveLength(24);
  expect(result.current.minutes).toHaveLength(60);

  // onChangeCalendarValue
  act(() => {
    const calendarValue = result.current.onChangeCalendarValue({
      year: 2023,
      month: 7,
    });

    expect(
      calendarValue.equals(
        Temporal.PlainDate.from({
          year: 2023,
          month: 7,
          day: 15,
        })
      )
    ).toBe(true);
  });

  expect(
    result.current.calendarProps.value.equals(
      Temporal.PlainDate.from({
        year: 2023,
        month: 7,
        day: 15,
      })
    )
  ).toBe(true);

  // onChangeSelectedValue
  act(() => {
    const selectedValue = result.current.onChangeSelectedValue({
      year: 2021,
      month: 1,
      day: 1,
    });

    expect(
      selectedValue instanceof Temporal.PlainDate &&
        selectedValue.equals(
          Temporal.PlainDate.from({
            year: 2021,
            month: 1,
            day: 1,
          })
        )
    ).toBe(true);
  });

  expect(
    value.equals(
      Temporal.PlainDate.from({
        year: 2021,
        month: 1,
        day: 1,
      })
    )
  ).toBe(true);
});
