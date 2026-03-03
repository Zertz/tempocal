import { Temporal } from "@js-temporal/polyfill";
import { act, renderHook } from "@testing-library/react-hooks";
import { expect, test } from "vitest";
import { useTemporalState } from "../tempocal-react";

test("useTemporalState (date, with Date)", () => {
  const { result } = renderHook(() =>
    useTemporalState("date", new Date(2022, 3, 16))
  );

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 16,
      })
    )
  ).toBe(true);

  // Update with Temporal.PlainDate
  act(() => {
    result.current[1](
      Temporal.PlainDate.from({
        year: 2021,
        month: 2,
        day: 8,
      })
    );
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2021,
        month: 2,
        day: 8,
      })
    )
  ).toBe(true);

  // Update with PlainDateLike
  act(() => {
    result.current[1]({
      year: 2020,
      month: 1,
      day: 4,
    });
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2020,
        month: 1,
        day: 4,
      })
    )
  ).toBe(true);
});

test("useTemporalState (date, with PlainDate)", () => {
  const { result } = renderHook(() =>
    useTemporalState(
      "date",
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 16,
      })
    )
  );

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 16,
      })
    )
  ).toBe(true);

  // Update with Temporal.PlainDate
  act(() => {
    result.current[1](
      Temporal.PlainDate.from({
        year: 2021,
        month: 2,
        day: 8,
      })
    );
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2021,
        month: 2,
        day: 8,
      })
    )
  ).toBe(true);

  // Update with PlainDateLike
  act(() => {
    result.current[1]({
      year: 2020,
      month: 1,
      day: 4,
    });
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2020,
        month: 1,
        day: 4,
      })
    )
  ).toBe(true);
});

test("useTemporalState (date, with PlainDateLike)", () => {
  const { result } = renderHook(() =>
    useTemporalState("date", {
      year: 2022,
      month: 4,
      day: 16,
    })
  );

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 4,
        day: 16,
      })
    )
  ).toBe(true);

  // Update with Temporal.PlainDate
  act(() => {
    result.current[1](
      Temporal.PlainDate.from({
        year: 2021,
        month: 2,
        day: 8,
      })
    );
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2021,
        month: 2,
        day: 8,
      })
    )
  ).toBe(true);

  // Update with PlainDateLike
  act(() => {
    result.current[1]({
      year: 2020,
      month: 1,
      day: 4,
    });
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDate.from({
        year: 2020,
        month: 1,
        day: 4,
      })
    )
  ).toBe(true);
});

test("useTemporalState (datetime, with Date)", () => {
  const { result } = renderHook(() =>
    useTemporalState("datetime", new Date(2022, 3, 16, 15, 30, 45))
  );

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 4,
        day: 16,
        hour: 15,
        minute: 30,
        second: 45,
      })
    )
  ).toBe(true);

  // Update with Temporal.PlainDateTime
  act(() => {
    result.current[1](
      Temporal.PlainDateTime.from({
        year: 2021,
        month: 2,
        day: 8,
        hour: 10,
        minute: 20,
        second: 40,
      })
    );
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2021,
        month: 2,
        day: 8,
        hour: 10,
        minute: 20,
        second: 40,
      })
    )
  ).toBe(true);

  // Update with PlainDateTimeLike
  act(() => {
    result.current[1]({
      year: 2020,
      month: 1,
      day: 4,
      hour: 5,
      minute: 10,
      second: 20,
    });
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2020,
        month: 1,
        day: 4,
        hour: 5,
        minute: 10,
        second: 20,
      })
    )
  ).toBe(true);
});

test("useTemporalState (datetime, with PlainDateTime)", () => {
  const { result } = renderHook(() =>
    useTemporalState(
      "datetime",
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 4,
        day: 16,
        hour: 15,
        minute: 30,
        second: 45,
      })
    )
  );

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 4,
        day: 16,
        hour: 15,
        minute: 30,
        second: 45,
      })
    )
  ).toBe(true);

  // Update with Temporal.PlainDateTime
  act(() => {
    result.current[1](
      Temporal.PlainDateTime.from({
        year: 2021,
        month: 2,
        day: 8,
        hour: 10,
        minute: 20,
        second: 40,
      })
    );
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2021,
        month: 2,
        day: 8,
        hour: 10,
        minute: 20,
        second: 40,
      })
    )
  ).toBe(true);

  // Update with PlainDateTimeLike
  act(() => {
    result.current[1]({
      year: 2020,
      month: 1,
      day: 4,
      hour: 5,
      minute: 10,
      second: 20,
    });
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2020,
        month: 1,
        day: 4,
        hour: 5,
        minute: 10,
        second: 20,
      })
    )
  ).toBe(true);
});

test("useTemporalState (datetime, with PlainDateTimeLike)", () => {
  const { result } = renderHook(() =>
    useTemporalState("datetime", {
      year: 2022,
      month: 4,
      day: 16,
      hour: 15,
      minute: 30,
      second: 45,
    })
  );

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 4,
        day: 16,
        hour: 15,
        minute: 30,
        second: 45,
      })
    )
  ).toBe(true);

  // Update with Temporal.PlainDateTime
  act(() => {
    result.current[1](
      Temporal.PlainDateTime.from({
        year: 2021,
        month: 2,
        day: 8,
        hour: 10,
        minute: 20,
        second: 40,
      })
    );
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2021,
        month: 2,
        day: 8,
        hour: 10,
        minute: 20,
        second: 40,
      })
    )
  ).toBe(true);

  // Update with PlainDateTimeLike
  act(() => {
    result.current[1]({
      year: 2020,
      month: 1,
      day: 4,
      hour: 5,
      minute: 10,
      second: 20,
    });
  });

  expect(
    result.current[0].equals(
      Temporal.PlainDateTime.from({
        year: 2020,
        month: 1,
        day: 4,
        hour: 5,
        minute: 10,
        second: 20,
      })
    )
  ).toBe(true);
});
