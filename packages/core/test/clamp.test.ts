import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { clamp } from "../src/clamp";

test("clamp (PlainDate, unbounded)", () => {
  const result = clamp(
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 2,
    })
  );

  expect(result instanceof Temporal.PlainDate).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 2,
        day: 2,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDate, before min)", () => {
  const result = clamp(
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 1,
    }),
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 2,
    })
  );

  expect(result instanceof Temporal.PlainDate).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 2,
        day: 2,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDate, after min)", () => {
  const result = clamp(
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 3,
    }),
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 2,
    })
  );

  expect(result instanceof Temporal.PlainDate).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 2,
        day: 3,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDate, before max)", () => {
  const result = clamp(
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 2,
    }),
    undefined,
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 4,
    })
  );

  expect(result instanceof Temporal.PlainDate).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 2,
        day: 2,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDate, after max)", () => {
  const result = clamp(
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 5,
    }),
    undefined,
    Temporal.PlainDate.from({
      year: 2022,
      month: 2,
      day: 4,
    })
  );

  expect(result instanceof Temporal.PlainDate).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDate.from({
        year: 2022,
        month: 2,
        day: 4,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDateTime, unbounded)", () => {
  const result = clamp(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 2,
    })
  );

  expect(result instanceof Temporal.PlainDateTime).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 2,
        day: 2,
        hour: 2,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDateTime, before min)", () => {
  const result = clamp(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 1,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 2,
    })
  );

  expect(result instanceof Temporal.PlainDateTime).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 2,
        day: 2,
        hour: 2,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDateTime, after min)", () => {
  const result = clamp(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 3,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 2,
    })
  );

  expect(result instanceof Temporal.PlainDateTime).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 2,
        day: 2,
        hour: 3,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDateTime, before max)", () => {
  const result = clamp(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 1,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 2,
    })
  );

  expect(result instanceof Temporal.PlainDateTime).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 2,
        day: 2,
        hour: 1,
      })
    )
  ).toBe(true);
});

test("clamp (PlainDateTime, after max)", () => {
  const result = clamp(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 3,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 2,
      day: 2,
      hour: 2,
    })
  );

  expect(result instanceof Temporal.PlainDateTime).toBe(true);

  expect(
    result.equals(
      Temporal.PlainDateTime.from({
        year: 2022,
        month: 2,
        day: 2,
        hour: 2,
      })
    )
  ).toBe(true);
});
